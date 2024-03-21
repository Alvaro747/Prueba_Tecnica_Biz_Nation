import {ILessonModel} from "@/interfaces";
import {Model, Sequelize} from "sequelize";

export default (sequelize: Sequelize, DataTypes: any) => {
  class LessonModel extends Model<ILessonModel> implements ILessonModel {
    public title!: string;
    public description!: string;
    public video!: string;
    public courseId!: number;

    static associate(models: any): void {
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
      paranoid: true,
    }
  );

  return LessonModel;
};
