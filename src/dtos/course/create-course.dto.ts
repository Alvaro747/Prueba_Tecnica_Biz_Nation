import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsArray,
  IsOptional,
} from "class-validator";

import {ICourseCreate, ILessonCreate} from "../../interfaces/index";

export default class CourseCreateDto {
  @IsNotEmpty()
  @IsString()
  logo: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsDate()
  publicationDate: Date;

  @IsNotEmpty()
  @IsString()
  introductoryVideo: string;

  @IsOptional()
  @IsArray()
  lessonsAssociated?: ILessonCreate[];

  constructor(courseData: ICourseCreate) {
    const {logo, title, description, introductoryVideo, lessonsAssociated} =
      courseData;

    this.logo = logo;
    this.title = title;
    this.description = description;
    this.publicationDate = new Date();
    this.introductoryVideo = introductoryVideo;
    this.lessonsAssociated = lessonsAssociated;
  }
}
