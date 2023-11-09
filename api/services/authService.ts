import { ApiClient } from '../apiClient';
import { IApiResponse, IUser, IUserLogin } from '../IResponses.interface';
import { ICreateUserRequest, ILoginRequest } from '../IRequests.interface';

export class AuthService {
  constructor(private readonly client: ApiClient) {
    this.client = client;
  }

  async register(
    credentials: ICreateUserRequest,
  ): Promise<IApiResponse<IUserLogin>> {
    const response = await this.client.post('/auth/registration', credentials);
    const { data }: IApiResponse<IUserLogin> = response;
    this.client.setToken(data.accessToken);

    return response;
  }

  async loginAs(credentials: ILoginRequest): Promise<IApiResponse<IUser>> {
    const response = await this.client.post('/auth/login', credentials);
    const { data }: IApiResponse<IUserLogin> = response;
    this.client.setToken(data.accessToken);

    return response;
  }

  unauthorized() {
    this.client.deleteToken();
  }
}
