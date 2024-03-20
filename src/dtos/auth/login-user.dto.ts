import { IsEmail, IsString } from 'class-validator';

export default class UserLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}