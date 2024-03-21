import ILessonCreate from "../lesson/create-lesson.interface";

export default interface ICourseCreate {
  id?: number;
  logo: string;
  title: string;
  description: string;
  publicationDate: Date;
  introductoryVideo: string;
  lessonsAssociated?: ILessonCreate[];
}
