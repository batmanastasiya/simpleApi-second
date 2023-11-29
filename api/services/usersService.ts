import { AxiosResponse, AxiosPromise } from 'axios';
import { ApiClient } from '../apiClient';
import { IUser } from '../IResponses.interface';

export class UsersService {
  constructor(private readonly client: ApiClient) {
    this.client = client;
  }

  async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return this.client.get('/users');
  }

  async getCurrentUser(): Promise<AxiosResponse<IUser>> {
    return this.client.get('/users/me');
  }

  async getUserById(id: string): Promise<AxiosResponse<IUser>> {
    return this.client.get(`/users/${id}`);
  }

  async deleteUser(): AxiosPromise<AxiosResponse> {
    return this.client.delete('/users');
  }
}
