import {UserRole} from "../../enums/user-role.enum";

export default interface ILoginResponse {
  fullName: string;
  email: string;
  role: UserRole;
  token: string;
}
