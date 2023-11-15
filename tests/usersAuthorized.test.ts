import { describe, test, expect, beforeAll } from '@jest/globals';
import { Services } from '../api/services';
import { defaultUser } from '../users';
import { generateUserData } from '../fixtures/userDataGeneration';

const services = Services.getInstance();
const authService = services.getAuthService();
const usersService = services.getUsersService();

beforeAll(async () => {
  await authService.loginAs(defaultUser);
});

describe('SimpleApi/auth [#Authorized-user][#users]', () => {
  test('Should get data about current user [#smoke]', async () => {
    const user = await usersService.getCurrentUser();

    expect(user.status).toBe(200);
    expect(user.data).toBeDefined();
    expect(user.data.username).toBe(defaultUser.username);
  });

  test('Should delete own user [#smoke]', async () => {
    const userData = generateUserData();
    await authService.register(userData);
    const deletedUser = await usersService.deleteUser();
    const users = await usersService.getUsers();

    expect(deletedUser.status).toBe(200);
    expect(users.data).not.toContainEqual(deletedUser.data);
  });
});
