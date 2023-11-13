import { ApiClient } from '../apiClient';
import { IApiResponse, IUser } from '../IResponses.interface';

export class UsersService {
  constructor(private readonly client: ApiClient) {
    this.client = client;
  }

  async getUsers(): Promise<IApiResponse<IUser[]>> {
    return this.client.get('/users');
  }

  async getCurrentUser(): Promise<IApiResponse<IUser>> {
    return this.client.get('/users/me');
  }

  async getUserById(id: string): Promise<IApiResponse<IUser>> {
    return this.client.get(`/users/${id}`);
  }

  async deleteUser(): Promise<IApiResponse> {
    return this.client.delete('/users');
  }
}
