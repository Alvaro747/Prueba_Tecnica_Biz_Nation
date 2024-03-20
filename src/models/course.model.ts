import {DataTypes, Model} from "sequelize";

import Database from "@/config/Database";
import CourseProgressModel from "./progress-course.model";

// Get sequelize from singleton instance from Database
const sequelize = Database.getInstance().getSequelize();

// Define the CourseModel model
class CourseModel extends Model {}

CourseModel.init(
  {
    logo: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    publicationDate: DataTypes.DATE,
    introductoryVideo: DataTypes.STRING,
  },
  {sequelize, modelName: "course"}
);

// Define relationships
CourseModel.hasMany(CourseProgressModel);

export default CourseModel;
