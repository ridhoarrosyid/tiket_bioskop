export type BaseResponst<T> = {
  message: string;
  data: T;
  status: string;
};
