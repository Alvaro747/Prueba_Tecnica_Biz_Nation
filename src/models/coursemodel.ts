import { ICourseModel } from "../interfaces/index";
import { Model, Sequelize } from "sequelize";

export default (sequelize: Sequelize, DataTypes: any) => {
  class CourseModel extends Model<ICourseModel> implements ICourseModel {
    public logo!: string;
    public title!: string;
    public description!: string;
    public publicationDate!: Date;
    public introductoryVideo!: string;

    static associate(models: any): void {
      // One-to-many relationship with LessonModel
      this.hasMany(models.LessonModel, {
        foreignKey: "courseId",
        as: "lessons", // Optional name for the association
      });

      // One-to-many relationship with CourseProgressModel
      this.hasMany(models.CourseProgressModel, {
        foreignKey: "courseId",
        as: "courseProgresses", // Optional name for the association
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
      paranoid: true,
    }
  );

  return CourseModel;
};