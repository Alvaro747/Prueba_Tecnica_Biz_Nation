import {UserRole} from "../../enums/user-role.enum";

export default interface IRegistrationResponse {
  fullName: string;
  email: string;
  role: UserRole;
}
