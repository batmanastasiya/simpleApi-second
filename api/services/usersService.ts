import { ApiClient } from '../apiClient';

export class UsersService {
  constructor(private readonly client: ApiClient) {
    this.client = client;
  }

  async getUsers() {
    return await this.client.get('/users');
  }

  async getCurrentUser() {
    return await this.client.get('/users/me');
  }

  async getUserById(id: string) {
    return await this.client.get(`/users/${id}`);
  }

  async deleteUser() {
    return await this.client.delete(`/users`);
  }
}
