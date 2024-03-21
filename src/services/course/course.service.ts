import {Sequelize, Op} from "sequelize";
import Repository from "../../models";
import {
  IAddLessons,
  ICourseCreate,
  ILessonCreate,
  IResponseHttp,
} from "../../interfaces/index";
import {createResponseHttp} from "../../utils/create-response-http";
import LessonService from "../lesson/lesson.service";
import isValidateResponse from "../../utils/validate.responses";
import CourseProgressService from "../course-progress/course-progress.service";
import {UserRole} from "../../enums/user-role.enum";

export default class CourseService {
  static async create(data: ICourseCreate) {
    try {
      const response = await Repository.CourseModel.create(data);
      if (!response) {
        return createResponseHttp<null>(
          400,
          "Error creating course",
          false,
          null
        );
      }

      const course: ICourseCreate = response?.dataValues;

      if (data.lessonsAssociated) {
        const lessonsAssociated = data.lessonsAssociated as ILessonCreate[];

        const addCourseIdToLessons: ILessonCreate[] = lessonsAssociated.map(
          (lesson: ILessonCreate) => {
            return {
              ...lesson,
              courseId: course.id,
            };
          }
        ) as ILessonCreate[];

        const lessonResponse = (await LessonService.create(
          addCourseIdToLessons
        )) as IResponseHttp<ILessonCreate[] | null>;

        if (!isValidateResponse(lessonResponse)) {
          return lessonResponse;
        }

        const response: ICourseCreate = {
          ...course,
          lessonsAssociated: lessonResponse.result as ILessonCreate[],
        };

        return createResponseHttp<ICourseCreate>(
          201,
          "course and lessons created successfully",
          true,
          response
        );
      }

      return createResponseHttp<ICourseCreate>(
        201,
        "course created successfully",
        true,
        course
      );
    } catch (error: any) {
      return createResponseHttp<null>(500, error.message, false, null);
    }
  }

  static async getCoursesList({
    limit,
    page,
    title,
    startDate,
    endDate,
    status,
    userData,
  }: any) {
    try {
      const offset = (page - 1) * limit;

      let whereClause = {} as any;
      if (title) {
        whereClause.title = {[Op.like]: `%${title}%`};
      }
      if (startDate && endDate) {
        whereClause.publicationDate = {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        };
      }

      let courseProgressWhereClause = {};
      if (userData.role === "student" && status) {
        courseProgressWhereClause = {
          userId: userData.id,
          status: status,
        };
      }

      const courses = await Repository.CourseModel.findAll({
        where: whereClause,
        include: [
          {
            model: Repository.LessonModel,
            as: "lessons",
          },
          {
            model: Repository.CourseProgressModel,
            as: "courseProgresses",
            where: courseProgressWhereClause,
            required: false,
          },
        ],
        limit: parseInt(limit),
        offset: offset,
      });

      return createResponseHttp<ICourseCreate[]>(
        201,
        "courses found",
        true,
        courses
      );
    } catch (error) {
      console.error("Error getting courses list:", error);
      throw error;
    }
  }

  static async detail(id: number, role: UserRole) {
    try {
      const course = await Repository.CourseModel.findOne({
        where: {id},
        paranoid: role === "admin" ? false : true,
        include: [
          {
            model: Repository.LessonModel,
            as: "lessons",
            paranoid: false,
          },
        ],
      });

      if (!course) {
        return createResponseHttp<null>(404, "course not found", false, null);
      }

      return createResponseHttp<ICourseCreate>(
        200,
        "course found",
        true,
        course
      );
    } catch (error: any) {
      return createResponseHttp<null>(500, error.message, false, null);
    }
  }

  static async update(id: number, data: Partial<ICourseCreate>) {
    try {
      let updatedCourse = {
        dataValues: {},
      };
      const lessonUpdated: ILessonCreate[] = [];
      const lessonsAssociated = data.lessonsAssociated as ILessonCreate[];

      if (data.lessonsAssociated) {
        const validationId = this.IsvalidationIdLesson(lessonsAssociated);
        if (!validationId) {
          return createResponseHttp<null>(
            400,
            "Error updating course, lesson id is required",
            false,
            null
          );
        }

        for (const lesson of lessonsAssociated) {
          const lessonResponse = await LessonService.update(
            lesson.id as number,
            lesson
          );
          if (!isValidateResponse(lessonResponse)) {
            return lessonResponse;
          }
          lessonUpdated.push(lessonResponse.result as ILessonCreate);
        }
      }
      const [numberOfAffectedRows] = await Repository.CourseModel.update(data, {
        where: {
          id,
        },
      });

      if (!numberOfAffectedRows) {
        return createResponseHttp<null>(
          400,
          "Error updating course",
          false,
          null
        );
      }

      if (numberOfAffectedRows > 0) {
        updatedCourse = await Repository.CourseModel.findOne({
          where: {id},
        });
      }
      const response: Partial<ICourseCreate> = {
        ...updatedCourse.dataValues,
        lessonsAssociated: lessonUpdated,
      };
      return createResponseHttp<ICourseCreate>(
        201,
        "course updated successfully",
        true,
        response
      );
    } catch (error: any) {
      return createResponseHttp<null>(500, error.message, false, null);
    }
  }

  static async addLessons(data: IAddLessons) {
    try {
      let lessonsCreated: ILessonCreate[] = [] as ILessonCreate[];
      for (const lesson of data.addLessons) {
        const id = lesson.courseId as number;
        delete lesson.id;

        if (!id) {
          return createResponseHttp<null>(
            400,
            "Error adding lessons, courseId is required",
            false,
            null
          );
        }
      }

      const lessonResponse = (await LessonService.create(
        data.addLessons
      )) as IResponseHttp<ILessonCreate[] | null>;

      if (!isValidateResponse(lessonResponse)) {
        return lessonResponse;
      }

      lessonsCreated = lessonResponse.result as ILessonCreate[];

      const response: Partial<ICourseCreate> = {
        lessonsAssociated: lessonsCreated,
      };

      return createResponseHttp<Partial<ICourseCreate>>(
        201,
        "course and lessons created successfully",
        true,
        response
      );
    } catch (error: any) {
      throw error;
    }
  }

  static async delete(id: number) {
    try {
      const findCourseProgress =
        await CourseProgressService.findProgressCourseByCourseId(id);

      if (isValidateResponse(findCourseProgress)) {
        return createResponseHttp<null>(
          400,
          "Error deleting course, course has progress",
          false,
          null
        );
      }
      await Repository.CourseModel.destroy({
        where: {id},
      });

      return createResponseHttp<null>(
        201,
        "course deleted successfully",
        true,
        null
      );
    } catch (error: any) {
      return createResponseHttp<null>(500, error.message, false, null);
    }
  }

  private static IsvalidationIdLesson(
    lessonsAssociated: ILessonCreate[]
  ): boolean {
    let isValid: boolean = true;
    for (const lesson of lessonsAssociated) {
      if (!lesson.id) {
        isValid = false;
        return isValid;
      }
    }

    return isValid;
  }
}
