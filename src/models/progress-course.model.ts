import {DataTypes, Model} from "sequelize";

import Database from "@/config/Database";
import {CourseModel, UserModel} from "./index";

// Get sequelize from singleton instance from Database
const sequelize = Database.getInstance().getSequelize();

// Define the CourseProgressModel model
class CourseProgressModel extends Model {}

CourseProgressModel.init(
  {
    status: DataTypes.ENUM("pending", "in_progress", "completed"),
    approvalDate: DataTypes.DATE,
  },
  {sequelize, modelName: "course_progress", paranoid: true}
);

// Define relationships
CourseProgressModel.belongsTo(UserModel);
CourseProgressModel.belongsTo(CourseModel);

export default CourseProgressModel;
