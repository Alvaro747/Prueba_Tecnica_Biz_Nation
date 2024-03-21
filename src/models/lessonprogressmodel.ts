import {Model, Sequelize} from "sequelize";

import {LessonProgressStatus} from "../enums/lesson-progress-status.enum";
import {ILessonProgressModel} from "../interfaces/index";

export default (sequelize: Sequelize, DataTypes: any) => {
  class LessonProgressModel
    extends Model<ILessonProgressModel>
    implements ILessonProgressModel
  {
    public status!: LessonProgressStatus;
    public userId!: number;
    public lessonId!: number;

    static associate(models: any): void {
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
