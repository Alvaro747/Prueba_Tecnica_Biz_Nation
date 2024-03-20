"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LessonModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Many-to-one relationship with CourseModel
      this.belongsTo(models.CourseModel, {
        foreignKey: "courseId",
        as: "course", // Optional name for the association
      });

      // One-to-many relationship with LessonProgressModel
      this.hasMany(models.LessonProgressModel, {
        foreignKey: "lessonId",
        as: "lessonProgresses", // Optional name for the association
      });
    }
  }
  LessonModel.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      video: DataTypes.STRING,
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "LessonModel",
    }
  );
  return LessonModel;
};
