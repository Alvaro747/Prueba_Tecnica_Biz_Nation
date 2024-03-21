import {IsString, IsNotEmpty} from "class-validator";

import { ILessonCreate } from "../../interfaces/index";

export default class LessonCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  video: string;

  @IsNotEmpty()
  courseId: number;

  constructor(lessonData: ILessonCreate) {
    const {title, description, video, courseId} = lessonData;

    this.title = title;
    this.description = description;
    this.video = video;
    this.courseId = courseId;
  }
}
