import repository from "../../models";

import {
  IRegistrationResponse,
  IResponseHttp,
  IUserRegister,
} from "../../interfaces/index";
import {encryptPassword} from "../../utils/generator.util";
import {createResponseHttp} from "../../utils/create-response-http";
import {RegistrationResponseDto} from "../../dtos/index";
/**
 * Service class for handling auth operations such as register and login
 */
export default class AuthService {
  static async login(data: any) {
    return {status: 200, message: "Login successful"};
  }

  static async register(
    data: IUserRegister
  ): Promise<IResponseHttp<IRegistrationResponse>> {
    const encryptedPassword = await encryptPassword(data.password);
    data.password = encryptedPassword;

    try {
      const response = await repository.UserModel.create(data);
      const user: IRegistrationResponse = new RegistrationResponseDto(
        response?.dataValues
      )?.getAtributes();

      return createResponseHttp<IRegistrationResponse>(
        201,
        "User registered successfully",
        true,
        user
      );
    } catch (error: any) {
      const messagesError = error.errors.map((err: any) => err.message);
      return createResponseHttp<IRegistrationResponse>(
        500,
        error.message,
        false,
        messagesError
      );
    }
  }
}
