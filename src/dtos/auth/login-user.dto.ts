import { IUserLogin } from "../../interfaces/index";
import {IsEmail, IsString} from "class-validator";



export default class UserLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  constructor(userLoginData: IUserLogin) {

    const {email, password} = userLoginData;

    this.email = email;
    this.password = password;
  }
}
