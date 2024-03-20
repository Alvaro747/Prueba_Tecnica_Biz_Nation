import {DataTypes, Model} from "sequelize";
import Database from "@/config/Database";

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
/* User.hasMany(CourseProgress);
User.hasMany(LessonProgress); */

module.exports = UserModel;
