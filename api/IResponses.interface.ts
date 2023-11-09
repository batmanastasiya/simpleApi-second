export interface IUser {
  id: string;
  name: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserLogin {
  user: IUser;
  accessToken: string;
}

export interface INote {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface IApiResponse<T = unknown> {
  status: number;
  data: T;
}
