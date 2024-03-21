import IExpress from "./server/server.interface";
import IDatabase from "./database/database.interface";
import IResponseHttp from "./responses/response-http.interface";
import IUserLogin from "./auth/login-user.interface";
import IUserRegister from "./auth/register-user.interface";
import IRegistrationResponse from "./auth/response-register.interface";
import ILoginResponse from "./auth/response-login.interface";

import ICourseModel from "./entities/course-model.interface";
import ICourseProgressModel from "./entities/course-progress-model.interface";
import ILessonProgressModel from "./entities/lesson-progress-model.interface";
import ILessonModel from "./entities/lesson-model.interface";

export {
  IExpress,
  IDatabase,
  IResponseHttp,
  IUserLogin,
  IUserRegister,
  IRegistrationResponse,
  ILoginResponse,

  ICourseModel,
  ICourseProgressModel,
  ILessonProgressModel,
  ILessonModel
};
