import {UserRole} from "../../enums/user-role.enum";
import {IRegistrationResponse} from "../../interfaces/index";

export default class RegistrationResponseDto {
  fullName: string;
  email: string;
  role: UserRole;

  constructor(responseUserData: IRegistrationResponse) {
    const {fullName, email, role} = responseUserData;

    this.fullName = fullName;
    this.email = email;
    this.role = role;
  }

  public getAtributes(): IRegistrationResponse {
    return {
      fullName: this.fullName,
      email: this.email,
      role: this.role,
    };
  }
}
