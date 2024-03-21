import Repository from "../../models";
import {ICourseCreate} from "../../interfaces/index";
import {createResponseHttp} from "../../utils/create-response-http";

export default class CourseProgressService {
  static async findProgressCourseByCourseId(courseId: number) {
    try {
      const response = await Repository.CourseProgressModel.findAll({
        where: {courseId},
      });

      if (!response || response.length === 0) {
        return createResponseHttp<null>(
          400,
          "Error finding progress course",
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
      throw error;
    }
  }
}
