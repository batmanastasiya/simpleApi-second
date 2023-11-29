import { expect, test } from '@jest/globals';
import { defaultUser } from '../users';
import { Services } from '../api/services';

const services = Services.getInstance('default');
const authService = services.getAuthService();

const tests = [
  {
    username: defaultUser.username,
    password: defaultUser.password,
    status: 200,
  },
  {
    username: 'fjglkdhfglhdflkgj',
    password: defaultUser.password,
    status: 404,
  },
  {
    username: defaultUser.username,
    password: 'password2bitlonger',
    status: 404,
  },
];

test.each(tests)(
  'login cases all in array [#combined]',
  async ({ username, password, status }) => {
    try {
      const user = await authService.loginAs({
        username,
        password,
      });
      expect(user.status).toBe(status);
    } catch (e: any) {
      expect(e.response.status).toBe(status);
    }
  },
);
