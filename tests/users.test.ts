import { describe, test, expect, beforeAll } from '@jest/globals';
import { Services } from '../api/services';

const services = Services.getInstance();
const authService = services.getAuthService();
const usersService = services.getUsersService();

beforeAll(async () => {
  await authService.unauthorized();
});

describe('[Not authorized user] SimpleApi/users', () => {
  test('Should get list of all users', async () => {
    const users = await usersService.getUsers();

    expect(users.status).toBe(200);
    expect(users.data).toBeDefined();
  });

  test('Should get data about user by id', async () => {
    const users = await usersService.getUsers();
    const searchedId = users.data[0].id;
    const user = await usersService.getUserById(searchedId);

    expect(users.status).toBe(200);
    expect(user.data).toBeDefined();
  });

  test('Should not get data about current user without access token', async () => {
    try {
      await usersService.getCurrentUser();
    } catch (e: any) {
      expect(e.response.status).toBe(401);
    }
  });

  test('Should not get users data by invalid id', async () => {
    try {
      await usersService.getUserById('invalidId');
    } catch (e: any) {
      expect(e.response.status).toBe(400);
    }
  });
});
