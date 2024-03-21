import Repository from "../../models";
import {createResponseHttp} from "../../utils/create-response-http";
import {ILessonCreate} from "../../interfaces/index";

export default class LessonService {
  static async create(data: ILessonCreate | ILessonCreate[]) {
    try {
      // validate if courseId exists
      const course = await Repository.CourseModel.findByPk(
        data instanceof Array ? data[0].courseId : data.courseId
      );

      if (!course) {
        return createResponseHttp<null>(404, "Course not exist", false, null);
      }

      // convert to array if it's not
      const dataArray = data instanceof Array ? data : [data];

      const lessons = [];
      for (const lessonData of dataArray) {
        const lesson = await Repository.LessonModel.create(lessonData);

        if (!lesson) {
          return createResponseHttp<null>(
            400,
            "Error creating lesson",
            false,
            null
          );
        }
        lessons.push(lesson.dataValues);
      }

      return createResponseHttp<ILessonCreate[]>(
        201,
        "Lesson created",
        true,
        lessons
      );
    } catch (error: any) {
      throw error;
    }
  }

  static async update(lessonId: number, lessonData: Partial<ILessonCreate>) {
    try {
      let updatedLesson = {
        dataValues: {},
      };

      const [numberOfAffectedRows] = await Repository.LessonModel.update(
        lessonData,
        {
          where: {id: lessonId},
        }
      );

      if (!numberOfAffectedRows) {
        return createResponseHttp<null>(
          400,
          "Error updating lesson",
          false,
          null
        );
      }

      if (numberOfAffectedRows > 0) {
        // Si la actualización tuvo éxito, obtener el registro actualizado
        updatedLesson = await Repository.LessonModel.findOne({
          where: {id: lessonId},
        });
      }

      return createResponseHttp<ILessonCreate>(
        201,
        "Lesson updated successfully",
        true,
        updatedLesson.dataValues
      );
    } catch (error: any) {
      return createResponseHttp<null>(500, error.message, false, null);
    }
  }

  static async delete(lessonId: string) {
    try {
      // Verificar si la lección tiene progreso
      const hasProgress = await Repository.ProgressModel.exists({lessonId});
      if (hasProgress) {
        throw new Error(
          "No se puede eliminar la lección porque tiene progreso asociado."
        );
      }

      // Eliminación "soft" de la lección
      await Repository.LessonModel.destroy({where: {id: lessonId}});

      return {message: "Lección eliminada exitosamente"};
    } catch (error: any) {
      throw error;
    }
  }
}
