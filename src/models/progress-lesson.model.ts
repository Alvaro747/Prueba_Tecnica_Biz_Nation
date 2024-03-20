import { DataTypes, Model } from "sequelize";

import Database from "@/config/Database";
import UserModel from "./user.model";
import LessonModel from "./lesson.model";

// Get sequelize from singleton instance from Database
const sequelize = Database.getInstance().getSequelize();

// Define the LessonProgressModel model
class LessonProgressModel extends Model {}

LessonProgressModel.init(
  {
    status: DataTypes.ENUM("pending", "in_progress", "completed"),
  },
  { sequelize, modelName: "lesson_progress" }
);

// Define relationships
LessonProgressModel.belongsTo(UserModel);
LessonProgressModel.belongsTo(LessonModel);

export default LessonProgressModel;
