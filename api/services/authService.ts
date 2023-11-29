import { AxiosResponse } from 'axios';
import { ApiClient } from '../apiClient';
import { IUser, IUserLogin } from '../IResponses.interface';
import { ICreateUserRequest, ILoginRequest } from '../IRequests.interface';

export class AuthService {
  constructor(private readonly client: ApiClient) {
    this.client = client;
  }

  async register(
    credentials: ICreateUserRequest,
  ): Promise<AxiosResponse<IUserLogin>> {
    const response = await this.client.post('/auth/registration', credentials);
    const { data }: AxiosResponse<IUserLogin> = response;
    this.setToken(data.accessToken);

    return response;
  }

  async loginAs(credentials: ILoginRequest): Promise<AxiosResponse<IUser>> {
    const response = await this.client.post('/auth/login', credentials);
    const { data }: AxiosResponse<IUserLogin> = response;
    this.setToken(data.accessToken);

    return response;
  }

  unauthorized() {
    this.client.deleteToken();
  }

  setToken(token: string) {
    this.client.setToken(token);
  }
}
