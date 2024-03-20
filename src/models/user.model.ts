import {DataTypes, Model} from "sequelize";

import Database from "@/config/Database";
import CourseProgressModel from "./progress-course.model";
import LessonProgressModel from "./progress-lesson.model";

// Get sequelize from singleton instance from Database
const sequelize = Database.getInstance().getSequelize();

// Define the UserModel
class UserModel extends Model {}

UserModel.init(
  {
    fullName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM("admin", "student"),
  },
  {sequelize, modelName: "user"}
);

// Define relationships
UserModel.hasMany(CourseProgressModel);
UserModel.hasMany(LessonProgressModel);

export default UserModel;
