module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts', '**/e2e/**/*.test.ts'],
  verbose: true,
  testTimeout: 30000,
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
        includeFailureMsg: true,
        includeSuiteFailure: true,
      },
    ],
    // [
    //   '@reportportal/agent-js-jest',
    //   {
    //     apiKey:
    // eslint-disable-next-line max-len
    //       'key-for-jest-simple-api_UWWHKy7xTjqFcgJW7kzlpVJ6qZffKtjV7nf3EZ_4HX-kPhlox6t8cbUk0ltoDFZc',
    //     endpoint: 'http://localhost:8080/api/v1',
    //     project: 'default_personal',
    //     launch: 'Launch name',
    //     attributes: [
    //       {
    //         key: 'key',
    //         value: 'value',
    //       },
    //       {
    //         value: 'value',
    //       },
    //     ],
    //     description: 'Your launch description',
    //   },
    // ],
  ],
};
