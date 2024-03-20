import { UserRole } from '@/enums/user-role.enum';
import { IsString, IsEmail, IsEnum, IsDate } from 'class-validator';


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

  constructor(fullName: string, dateOfBirth: Date, email: string, password: string, role: UserRole) {
    this.fullName = fullName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
