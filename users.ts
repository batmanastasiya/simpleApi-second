import { ILoginRequest } from './api/IRequests.interface';

export const defaultUser: ILoginRequest = {
  username: process.env.DEFAULT_USER_USERNAME,
  password: process.env.DEFAULT_USER_PASSWORD,
};

export const anotherUser: ILoginRequest = {
  username: process.env.ANOTHER_USER_USERNAME,
  password: process.env.ANOTHER_USER_PASSWORD,
};
