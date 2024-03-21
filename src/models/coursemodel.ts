import { ICourseModel } from "../interfaces/index";
import {Model, Sequelize} from "sequelize";


export default (sequelize: Sequelize, DataTypes: any) => {
  class CourseModel
    extends Model<ICourseModel>
    implements ICourseModel
  {
    public logo!: string;
    public title!: string;
    public description!: string;
    public publicationDate!: Date;
    public introductoryVideo!: string;

    static associate(models: any): void {
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
      paranoid: true,
    }
  );

  return CourseModel;
};
