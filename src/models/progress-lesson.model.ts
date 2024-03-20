import {DataTypes, Model} from "sequelize";

import Database from "@/config/Database";
import {UserModel, LessonModel} from "./index";

// Get sequelize from singleton instance from Database
const sequelize = Database.getInstance().getSequelize();

// Define the LessonProgressModel model
class LessonProgressModel extends Model {}

LessonProgressModel.init(
  {
    status: DataTypes.ENUM("pending", "in_progress", "completed"),
  },
  {sequelize, modelName: "lesson_progress", paranoid: true}
);

// Define relationships
LessonProgressModel.belongsTo(UserModel);
LessonProgressModel.belongsTo(LessonModel);

export default LessonProgressModel;
