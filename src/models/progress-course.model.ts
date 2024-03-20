import { DataTypes, Model } from "sequelize";

import Database from "@/config/Database";
import UserModel from "./user.model";
import CourseModel from "./course.model";

// Get sequelize from singleton instance from Database
const sequelize = Database.getInstance().getSequelize();

// Define the CourseProgressModel model
class CourseProgressModel extends Model {}

CourseProgressModel.init(
  {
    status: DataTypes.ENUM("pending", "in_progress", "completed"),
    approvalDate: DataTypes.DATE,
  },
  { sequelize, modelName: "course_progress" }
);

// Define relationships
CourseProgressModel.belongsTo(UserModel);
CourseProgressModel.belongsTo(CourseModel);

export default CourseProgressModel;
