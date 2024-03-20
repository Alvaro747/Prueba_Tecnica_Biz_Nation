import {DataTypes, Model} from "sequelize";

import Database from "@/config/Database";
import {LessonProgressModel, CourseModel} from "./index";

/* import LessonProgress from './LessonProgress'; */

// Get sequelize from singleton instance from Database
const sequelize = Database.getInstance().getSequelize();

// Define the LessonModel model
class LessonModel extends Model {}

LessonModel.init(
  {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    video: DataTypes.STRING,
  },
  {sequelize, modelName: "lesson", paranoid: true}
);

// Define relationships
LessonModel.belongsTo(CourseModel);
LessonModel.hasMany(LessonProgressModel);

export default LessonModel;
