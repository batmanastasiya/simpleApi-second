import { ApiClient } from '../apiClient';

export class AuthService {
  constructor(private readonly client: ApiClient) {
    this.client = client;
  }

  async register(credentials: unknown) {
    const response = await this.client.post('/auth/registration', credentials);
    this.client.setToken(response.data.accessToken);

    return response;
  }

  async loginAs(credentials: { password: string; username: string }) {
    const response = await this.client.post('/auth/login', credentials);
    this.client.setToken(response.data.accessToken);

    return response;
  }

  unauthorized() {
    this.client.deleteToken();
  }
}
