import { DataTypes, Model } from "sequelize";

import Database from "@/config/Database";
import LessonProgressModel from "./progress-lesson.model";

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
  { sequelize, modelName: "lesson" }
);

// Define relationships
LessonModel.hasMany(LessonProgressModel);

export default LessonModel;
