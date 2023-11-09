import { ApiClient } from '../apiClient';
import { IApiResponce, IUser, IUserLogin } from '../IResponces.interface';
import { ICreateUserRequest, ILoginRequest } from '../IRequests.interface';

export class AuthService {
  constructor(private readonly client: ApiClient) {
    this.client = client;
  }

  async register(
    credentials: ICreateUserRequest,
  ): Promise<IApiResponce<IUserLogin>> {
    const response = await this.client.post('/auth/registration', credentials);
    const { data }: IApiResponce<IUserLogin> = response;
    this.client.setToken(data.accessToken);

    return response;
  }

  async loginAs(credentials: ILoginRequest): Promise<IApiResponce<IUser>> {
    const response = await this.client.post('/auth/login', credentials);
    const { data }: IApiResponce<IUserLogin> = response;
    this.client.setToken(data.accessToken);

    return response;
  }

  unauthorized() {
    this.client.deleteToken();
  }
}
