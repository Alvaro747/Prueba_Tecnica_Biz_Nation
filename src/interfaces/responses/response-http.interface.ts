export default interface IResponseHttp<R> {
  success: boolean;
  status: number;
  message?: string;
  result: R;
}
