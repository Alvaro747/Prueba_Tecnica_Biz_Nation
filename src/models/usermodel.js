"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // One-to-many relationship with CourseProgressModel
      this.hasMany(models.CourseProgressModel, {
        foreignKey: "userId",
        as: "courseProgresses", // Optional name for the association
      });

      // One-to-many relationship with LessonProgressModel
      this.hasMany(models.LessonProgressModel, {
        foreignKey: "userId",
        as: "lessonProgresses", // Optional name for the association
      });
    }
  }
  UserModel.init(
    {
      fullName: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM("admin", "student"),
    },
    {
      sequelize,
      modelName: "UserModel",
      paranoid: true,
    }
  );
  return UserModel;
};
