import { describe, test } from '@jest/globals';
import { Services } from '../api/services';

const services = Services.getInstance();
const authService = services.getAuthService();

describe.skip('E2E', () => {
  test('Scenario 1', async () => {
    await authService.register({
      name: `test${new Date().getTime()}`,
      username: `test${new Date().getTime()}`,
      password1: 'password',
      password2: 'password',
    });
  });
});
