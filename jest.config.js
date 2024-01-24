// jest.config.js
module.exports = {
    // jest.config.js

    testEnvironment: 'jsdom',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',

    setupFilesAfterEnv: ['./jest.setup.js'],
  };
  