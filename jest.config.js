module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts', '**/e2e/**/*.test.ts'],
  verbose: true,
  testTimeout: 30000,
};
