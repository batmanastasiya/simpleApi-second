import { describe, test, expect } from '@jest/globals';
import { Services } from '../api/services';
import { defaultUser } from '../users';

const services = Services.getInstance('default');

const authService = services.getAuthService();

describe('SimpleApi/auth [#auth]', () => {
  test('Should be able to register with valid data [#smoke]', async () => {
    const user = await authService.register({
      name: `test${new Date().getTime()}`,
      username: `test${new Date().getTime()}`,
      password1: 'password',
      password2: 'password',
    });

    expect(user.status).toBe(200);
    expect(user.data).toBeDefined();
  });

  test('Should not be able to register with taken username', async () => {
    try {
      await authService.register({
        name: `test${new Date().getTime()}`,
        username: 'qapybara',
        password1: 'password',
        password2: 'password',
      });
    } catch (e: any) {
      expect(e.response.status).toBe(409);
    }
  });

  test('Should not be able to register with non mathed passwords', async () => {
    try {
      await authService.register({
        name: `test${new Date().getTime()}`,
        username: `test${new Date().getTime()}`,
        password1: 'password',
        password2: 'password2',
      });
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
