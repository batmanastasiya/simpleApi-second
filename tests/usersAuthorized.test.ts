import { describe, test, expect, beforeAll } from '@jest/globals';
import { Services } from '../api/services';
import { defaultUser } from '../users';

const services = Services.getInstance();
const authService = services.getAuthService();
const usersService = services.getUsersService();

beforeAll(async () => {
  await authService.loginAs(defaultUser);
});

describe('[Authorized user] SimpleApi/auth', () => {
  test('Should get data about current user', async () => {
    const user = await usersService.getCurrentUser();

    expect(user.status).toBe(200);
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
});
