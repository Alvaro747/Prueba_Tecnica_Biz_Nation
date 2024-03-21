import jwt, {Secret} from "jsonwebtoken";

import Repository from "../../models";
import {
  ILoginResponse,
  IRegistrationResponse,
  IResponseHttp,
  IUserLogin,
  IUserRegister,
} from "../../interfaces/index";
import {comparePasswords, encryptPassword} from "../../utils/generator.util";
import {createResponseHttp} from "../../utils/create-response-http";
import {LoginResponseDto, RegistrationResponseDto} from "../../dtos/index";
import {PayloadTokenType} from "../../types/payload-token.type";

/**
 * Service class for handling auth operations such as register and login
 */
export default class AuthService {
  static async login(data: IUserLogin) {
    try {
      const validateUser = await Repository.UserModel.findOne({
        where: {email: data.email},
      });
      if (!validateUser) {
        return createResponseHttp<null>(404, "User not found", false, null);
      }

      const user = validateUser?.dataValues;

      const isPasswordValid = await comparePasswords(
        data.password,
        user.password
      );

      if (!isPasswordValid) {
        return createResponseHttp<null>(401, "Invalid password", false, null);
      }

      const payload: PayloadTokenType = {
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      };

      const token = this.getTocken(payload);

      const response = new LoginResponseDto({
        ...user,
        token,
      } as ILoginResponse).getAtributes();

      return createResponseHttp<ILoginResponse>(
        200,
        "User logged in successfully",
        true,
        response
      );
    } catch (error: any) {
      return createResponseHttp<null>(500, error.message, false, null);
    }
  }

  static async register(
    data: IUserRegister
  ): Promise<IResponseHttp<IRegistrationResponse>> {
    const encryptedPassword = await encryptPassword(data.password);
    data.password = encryptedPassword;

    try {
      const response = await Repository.UserModel.create(data);
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

  private static getTocken(payload: PayloadTokenType): string {
    const secretKey: Secret = process.env.JWT_SECRET || "";
    const token = jwt.sign(payload, secretKey, {
      expiresIn: process.env.EXPIRES_IN,
    });
    return token;
  }
}
