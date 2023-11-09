import { describe, test, expect } from '@jest/globals';
import { Services } from '../api/services';

const services = Services.getInstance();
const authService = services.getAuthService();
const usersService = services.getUsersService();

describe('SimpleApi/users', () => {
  test('Should get list of all users', async () => {
    const users = await usersService.getUsers();

    expect(users.status).toBe(200);
    expect(users.data).toBeDefined();
  });

  test('Should get data about current user', async () => {
    await authService.loginAs({
      username: 'qapybara',
      password: 'password',
    });
    const user = await usersService.getCurrentUser();

    expect(user.status).toBe(200);
    expect(user.data).toBeDefined();
  });

  test('Should get data about user by id', async () => {
    const users = await usersService.getUsers();
    const searchedId = users.data[0].id;
    const user = await usersService.getUserById(searchedId);

    expect(users.status).toBe(200);
    expect(user.data).toBeDefined();
  });

  test('Should delete own user', async () => {
    await authService.register({
      name: `test${new Date().getTime()}`,
      username: `test${new Date().getTime()}`,
      password1: 'password',
      password2: 'password',
    });
    const deletedUser = await usersService.deleteUser();

    expect(deletedUser.status).toBe(200);
  });

  test('Should not get data about current user without access token', async () => {
    await authService.unauthorized();
    const user = await usersService.getCurrentUser();

    expect(user.status).toBe(401);
  });

  test('Should not get users data by invalid id', async () => {
    const user = await usersService.getUserById('invalidId');

    expect(user.status).toBe(400);
  });
});
