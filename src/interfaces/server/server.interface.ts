export default interface IExpress <E> {
    getExpress(): E;
    listen(): void;
  }