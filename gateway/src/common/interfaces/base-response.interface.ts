export interface IBaseResponse<T = any> {
  status: number;
  message: string;
  data?: T;
  errors?: { [key: string]: string };
}
