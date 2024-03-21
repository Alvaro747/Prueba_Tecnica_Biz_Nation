import {IResponseHttp} from "../../interfaces/index";
import {validate} from "class-validator";
/**
 * Service class for handling auth operations such as register and login
 */
export default class AuthService {
  static async login(data: any) {
    return {status: 200, message: "Login successful"};
  }

  static async register(data: any) {
    return {status: 201, message: "User created"};
  }

  private static async validateDto(dto: any): Promise<IResponseHttp<any>> {
    const validationErrors = await validate(dto);
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors.map((error) => {
        return {
          property: error.property,
          constraints: error.constraints,
        };
      }) as any;
      return {
        success: false,
        status: 400,
        result: errorMessages,
      };
    }
    return {
      success: true,
      status: 200,
      result: dto,
    };
  }
}
