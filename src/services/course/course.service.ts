import Repository from "../../models";
import {ICourseCreate, ILessonCreate} from "../../interfaces/index";
import {createResponseHttp} from "../../utils/create-response-http";
import LessonService from "../lesson/lesson.service";

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

        const lessonResponse: ILessonCreate[] = (await LessonService.create(
          addCourseIdToLessons
        )) as ILessonCreate[];

        const response: ICourseCreate = {
          ...course,
          lessonsAssociated: lessonResponse,
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

  static async read() {
    try {
      const response = await Repository.UserModel.find();
      return response; // Puedes retornar lo que necesites aquí
    } catch (error: any) {
      throw error; // Maneja el error según sea necesario
    }
  }

  static async update(id: string, data: Partial<ICourseCreate>) {
    try {
      const response = await Repository.UserModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return response; // Puedes retornar lo que necesites aquí
    } catch (error: any) {
      throw error; // Maneja el error según sea necesario
    }
  }

  static async delete(id: string) {
    try {
      const response = await Repository.UserModel.findByIdAndDelete(id);
      return response; // Puedes retornar lo que necesites aquí
    } catch (error: any) {
      throw error; // Maneja el error según sea necesario
    }
  }
}
