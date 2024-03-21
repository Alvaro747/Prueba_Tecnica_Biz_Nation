import {Request, Response} from "express";
import {CourseService, LessonService} from "../../services/index";
import isValidateResponse from "../../utils/validate.responses";
import {IRequestUserData} from "../../interfaces/index";
import {UserRole} from "../../enums/user-role.enum";

export default class CourseController {
  static async create(req: Request, res: Response) {
    const response = await CourseService.create(req.body);
    res.status(response?.status || 201).json(response);
  }

  static async read(req: Request, res: Response) {
    const response = await CourseService.create(req.body);
    res.status(response?.status || 201).json(response);
  }

  static async addLessons(req: Request, res: Response) {
    const response = await CourseService.addLessons(req.body);
    res.status(response?.status || 201).json(response);
  }

  static async update(req: Request, res: Response) {
    const {id} = req.params;
    const idNumber = parseInt(id as string);
    const response = await CourseService.update(idNumber, req.body);
    res.status(response?.status || 201).json(response);
  }

  static async delete(req: Request, res: Response) {
    const {courseId, lessonId} = req.query;

    if (!courseId && !lessonId) {
      res.status(400).json({
        error: "Debe proporcionar un courseId o un lessonId",
        result: null,
        success: false,
      });
    }
    if (courseId) {
      const idNumber = parseInt(courseId as string);
      const responseCourse = await CourseService.delete(idNumber);

      if (!isValidateResponse(responseCourse)) {
        return res.status(responseCourse?.status || 201).json(responseCourse);
      }
    }

    if (lessonId) {
      const idNumber = parseInt(lessonId as string);
      const responseLesson = await LessonService.delete(idNumber);

      if (!isValidateResponse(responseLesson)) {
        return res.status(responseLesson?.status || 201).json(responseLesson);
      }
    }

    return res
      .status(201)
      .json({response: null, message: "Deleted successfully.", success: true});
  }

  static async detail(req: IRequestUserData, res: Response) {
    const {id} = req.params;
    const idNumber = parseInt(id as string);
    const response = await CourseService.detail(
      idNumber,
      req?.userData?.role as UserRole
    );
    res.status(response?.status || 201).json(response);
  }
}
