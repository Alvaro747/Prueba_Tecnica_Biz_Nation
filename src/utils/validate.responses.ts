import IResponseHttp from "@/interfaces/responses/response-http.interface";

const isValidateResponse = (response: IResponseHttp<any>) => {
   return response.success ? true : false;
}

export default isValidateResponse;
