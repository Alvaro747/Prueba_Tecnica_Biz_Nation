import Repository from "../../models";
import {ICourseCreate} from "../../interfaces/index";
import {createResponseHttp} from "../../utils/create-response-http";

export default class LessonProgressService {
  static async findLessonProgressByLessonId(lessonId: number) {
    try {
      const response = await Repository.CourseProgressModel.findAll({
        where: {id: lessonId},
      });

      if (!response || response.length === 0) {
        return createResponseHttp<null>(
          400,
          "Error finding progress lesson",
          false,
          null
        );
      }
      return createResponseHttp<ICourseCreate>(
        201,
        "Progres course find successfully",
        true,
        response
      );
    } catch (error: any) {
      throw error; // Maneja el error según sea necesario
    }
  }
}
