import {UserRole} from "../../enums/user-role.enum";
import {ILoginResponse} from "../../interfaces/index";

export default class LoginResponseDto {
  fullName: string;
  email: string;
  role: UserRole;
  token: string;

  constructor(responseUserData: ILoginResponse) {
    const {fullName, email, role, token} = responseUserData;

    this.fullName = fullName;
    this.email = email;
    this.role = role;
    this.token = token;
  }

  public getAtributes(): ILoginResponse {
    return {
      fullName: this.fullName,
      email: this.email,
      role: this.role,
      token: this.token,
    };
  }
}
