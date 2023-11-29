import { describe, test, expect, beforeAll } from '@jest/globals';
import { AxiosResponse } from 'axios';
import { Services } from '../api/services';
import { IUser } from '../api/IResponses.interface';

const services = Services.getInstance();
const authService = services.getAuthService();
const usersService = services.getUsersService();
let users: AxiosResponse<IUser[]>;

beforeAll(async () => {
  await authService.unauthorized();
  users = await usersService.getUsers();
});

describe('SimpleApi/users [#Not-authorized-user][#users]', () => {
  test('Should get list of all users [#smoke]', async () => {
    expect(users.status).toBe(200);
    expect(users.data.length).toBeGreaterThan(0);
  });

  test('Should get data about user by id [#smoke]', async () => {
    const searchedId = users.data[0].id;
    const user = await usersService.getUserById(searchedId);

    expect(users.status).toBe(200);
    expect(user.data).toBeDefined();
    expect(user.data.id).toBe(searchedId);
  });

  test('Should not get data about current user without access token', async () => {
    try {
      await usersService.getCurrentUser();
      fail('User data was received without access token');
    } catch (e: any) {
      expect(e.response.status).toBe(401);
    }
  });

  test('Should not get users data by invalid id', async () => {
    try {
      await usersService.getUserById('invalidId');
      fail('User data was received by invalid id');
    } catch (e: any) {
      expect(e.response.status).toBe(400);
    }
  });
});
