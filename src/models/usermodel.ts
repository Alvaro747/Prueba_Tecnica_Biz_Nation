import {Model, Sequelize} from "sequelize";

import { UserRole } from "../enums/user-role.enum";
import { IUserRegister } from "../interfaces/index";


export default (sequelize: Sequelize, DataTypes: any) => {
  class UserModel
    extends Model<IUserRegister>
    implements IUserRegister
  {
    public fullName!: string;
    public dateOfBirth!: Date;
    public email!: string;
    public password!: string;
    public role!: UserRole;

    static associate(models: any): void {
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
