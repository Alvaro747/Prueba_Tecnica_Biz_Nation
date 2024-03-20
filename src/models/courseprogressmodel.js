"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourseProgressModel extends Model {
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

      // Many-to-one relationship with CourseModel
      this.belongsTo(models.CourseModel, {
        foreignKey: "courseId",
        as: "course", // Optional name for the association
      });
    }
  }
  CourseProgressModel.init(
    {
      status: DataTypes.ENUM("pending", "in_progress", "completed"),
      approvalDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      userId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CourseProgressModel",
    }
  );

  // Hook to update the "Approved Date" when the status changes to "approved".
  CourseProgressModel.beforeUpdate(async (courseProgress, options) => {
    const previousCourseProgress = await CourseProgressModel.findByPk(
      courseProgress.id
    );
    if (
      courseProgress.status === "completed" &&
      previousCourseProgress.status !== "completed"
    ) {
      courseProgress.approvalDate = new Date();
    }
  });

  return CourseProgressModel;
};
