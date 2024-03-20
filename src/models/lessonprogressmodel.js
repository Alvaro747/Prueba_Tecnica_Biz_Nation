"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LessonProgressModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Many-to-one relationship with UserModel
      this.belongsTo(models.UserModel, {
        foreignKey: "userId",
        as: "user", // Optional name for the association
      });

      // Many-to-one relationship with LessonModel
      this.belongsTo(models.LessonModel, {
        foreignKey: "lessonId",
        as: "lesson", // Optional name for the association
      });
    }
  }
  LessonProgressModel.init(
    {
      status: DataTypes.ENUM("pending", "in_progress", "completed"),
      userId: DataTypes.INTEGER,
      lessonId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "LessonProgressModel",
    }
  );
  return LessonProgressModel;
};
