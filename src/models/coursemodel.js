"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourseModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación uno a muchos con LessonModel
      this.hasMany(models.LessonModel, {
        foreignKey: "courseId",
        as: "lessons", // Nombre opcional para la asociación
      });

      // Relación uno a muchos con CourseProgressModel
      this.hasMany(models.CourseProgressModel, {
        foreignKey: "courseId",
        as: "courseProgresses", // Nombre opcional para la asociación
      });
    }
  }
  CourseModel.init(
    {
      logo: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      publicationDate: DataTypes.DATE,
      introductoryVideo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CourseModel",
    }
  );
  return CourseModel;
};
