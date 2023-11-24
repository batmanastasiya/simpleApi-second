import { describe, test, expect } from '@jest/globals';
import { Services } from '../api/services';
import { defaultUser } from '../users';
import { generateUserData } from '../fixtures/userDataGeneration';

const services = Services.getInstance('default');
const authService = services.getAuthService();
const usersService = services.getUsersService();

describe('SimpleApi/auth [#authorization]', () => {
  test('Should be able to register with valid data [#smoke]', async () => {
    const user = await authService.register(generateUserData());

    expect(user.status).toBe(200);
    expect(user.data).toBeDefined();

    await usersService.deleteUser();
  });

  test('Should not be able to register with taken username', async () => {
    try {
      await authService.register(
        generateUserData({ username: defaultUser.username }),
      );
    } catch (e: any) {
      expect(e.response.status).toBe(409);
    }
  });

  test('Should not be able to register with non mathed passwords', async () => {
    try {
      await authService.register(generateUserData({ password2: 'password2' }));
    } catch (e: any) {
      expect(e.response.status).toBe(401);
    }
  });

  test('Should be able to login with valid credentials [#smoke]', async () => {
    const user = await authService.loginAs(defaultUser);

    expect(user.status).toBe(200);
    expect(user.data).toBeDefined();
  });

  test('Should not be able to login with inorrect username', async () => {
    try {
      await authService.loginAs({
        username: 'fjglkdhfglhdflkgj',
        password: defaultUser.password,
      });
    } catch (e: any) {
      expect(e.response.status).toBe(404);
    }
  });

  test('Should not be able to login with incorrect password', async () => {
    try {
      await authService.loginAs({
        username: defaultUser.username,
        password: 'password2',
      });
    } catch (e: any) {
      expect(e.response.status).toBe(404);
    }
  });
});
