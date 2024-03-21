import { LessonProgressStatus } from "../../enums/lesson-progress-status.enum";

export default interface ILessonProgressModel {
    status:LessonProgressStatus;
    userId: number;
    lessonId: number;
  }