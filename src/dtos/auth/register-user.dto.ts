import {IsString, IsEmail, IsEnum, IsDate} from "class-validator";

import {UserRole} from "../../enums/user-role.enum";
import { IUserRegister } from "../../interfaces/index";


export default class UserRegisterDto {
  @IsString()
  fullName: string;

  @IsDate()
  dateOfBirth: Date;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  constructor(userCreateData: IUserRegister) {

    const {fullName, dateOfBirth, email, password, role} = userCreateData;

    this.fullName = fullName;
    this.dateOfBirth = new Date(dateOfBirth);
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
