import {UserRole} from "@/enums/user-role.enum";

export default interface ILoginResponseDto {
  fullName: string;
  email: string;
  role: UserRole;
  token: string;
}
