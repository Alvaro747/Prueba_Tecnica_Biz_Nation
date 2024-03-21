import ILoginResponse from "../interfaces/auth/response-login.interface";

export type PayloadTokenType = Omit<ILoginResponse, 'token'>;