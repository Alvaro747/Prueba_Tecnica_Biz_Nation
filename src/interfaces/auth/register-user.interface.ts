import {UserRole} from "../../enums/user-role.enum";

export default interface IUserRegister {
  fullName: string;
  dateOfBirth: Date;
  email: string;
  password: string;
  role: UserRole;
}
