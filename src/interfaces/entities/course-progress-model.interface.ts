import {CourseProgressStatus} from "../../enums/course-progress-status.enum";

export default interface ICourseProgressModel {
  status: CourseProgressStatus;
  approvalDate: Date | null;
  userId: number;
  courseId: number;
}
