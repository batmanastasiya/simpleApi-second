import { ApiClient } from '../apiClient';
import { IApiResponce, IUser } from '../IResponces.interface';

export class UsersService {
  constructor(private readonly client: ApiClient) {
    this.client = client;
  }

  async getUsers(): Promise<IApiResponce<IUser[]>> {
    return this.client.get('/users');
  }

  async getCurrentUser(): Promise<IApiResponce<IUser>> {
    return this.client.get('/users/me');
  }

  async getUserById(id: string): Promise<IApiResponce<IUser>> {
    return this.client.get(`/users/${id}`);
  }

  async deleteUser(): Promise<IApiResponce> {
    return this.client.delete('/users');
  }
}
