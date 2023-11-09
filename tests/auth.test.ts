import { describe, test, expect } from '@jest/globals';
import { Services } from '../api/services';

const services = Services.getInstance('default');

const authService = services.getAuthService();

describe('SimpleApi/auth', () => {
  test('Should be able to register with valid data', async () => {
    const user = await authService.register({
      name: `test${new Date().getTime()}`,
      username: `test${new Date().getTime()}`,
      password1: 'password',
      password2: 'password',
    });

    expect(user.status).toBe(200);
    expect(user.data).toBeDefined();
  });

  test('Should be able to login with valid credentials', async () => {
    const user = await authService.loginAs({
      username: 'qapybara',
      password: 'password',
    });

    expect(user.status).toBe(200);
    expect(user.data).toBeDefined();
  });

  test('Should not be able to register with taken username', async () => {
    const user = await authService.register({
      name: `test${new Date().getTime()}`,
      username: 'qapybara',
      password1: 'password',
      password2: 'password',
    });

    expect(user.status).toBe(409);
  });

  test('Should not be able to register with non mathed passwords', async () => {
    const user = await authService.register({
      name: `test${new Date().getTime()}`,
      username: `test${new Date().getTime()}`,
      password1: 'password',
      password2: 'password2',
    });

    expect(user.status).toBe(401);
  });

  test('Should not be able to login with inorrect username', async () => {
    const user = await authService.loginAs({
      username: 'fjglkdhfglhdflkgj',
      password: 'password',
    });

    expect(user.status).toBe(404);
  });

  test('Should not be able to login with incorrect password', async () => {
    const user = await authService.loginAs({
      username: 'qapybara',
      password: 'password2',
    });

    expect(user.status).toBe(404);
  });
});
