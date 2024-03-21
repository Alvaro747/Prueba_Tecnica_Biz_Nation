import {IResponseHttp} from "@/interfaces";

export function createResponseHttp<T>(
  status: number,
  message: string,
  isSuccess: boolean,
  result: any
): IResponseHttp<T> {
  return {
    status,
    message,
    success: isSuccess,
    result,
  };
}
