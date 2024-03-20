import {UserRole} from "@/enums/user-role.enum";

export default interface IRegistrationResponseDto {
  fullName: string;
  email: string;
  role: UserRole;
}
