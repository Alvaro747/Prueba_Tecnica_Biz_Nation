import IExpress from "./server/server.interface";
import IDatabase from "./database/database.interface";
import IResponseHttp from "./responses/response-http.interface";
import IUserLogin from "./auth/login-user.interface";
import IUserRegister from "./auth/register-user.interface";
import IRegistrationResponse from "./auth/response-register.interface";
import ILoginResponse from "./auth/response-login.interface";

import IRequestUserData from "./auth/request-user-data.interface";

import ICourseModel from "./entities/course-model.interface";
import ICourseProgressModel from "./entities/course-progress-model.interface";
import ILessonProgressModel from "./entities/lesson-progress-model.interface";
import ILessonModel from "./entities/lesson-model.interface";

import IDecodedToken from "./auth/decode-token.interface";

import ICourseCreate from "./course/create-course.interface";
import ILessonCreate from "./lesson/create-lesson.interface"
import IAddLessons from "./lesson/add-lessons.interface"

export {
  IExpress,
  IDatabase,
  IResponseHttp,
  IUserLogin,
  IUserRegister,
  IRegistrationResponse,
  ILoginResponse,

  IRequestUserData,

  ICourseModel,
  ICourseProgressModel,
  ILessonProgressModel,
  ILessonModel,

  IDecodedToken,

  ICourseCreate,
  ILessonCreate,
  IAddLessons
};
