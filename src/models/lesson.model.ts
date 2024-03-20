import Database from "@/config/Database";
import { DataTypes, Model } from "sequelize";

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
/* LessonModel.hasMany(LessonProgress); */

module.exports = LessonModel;
