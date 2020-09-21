module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/node_modules',
    '/dist'
  ],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.jest.json'
    }
  },
  setupFiles: [
    './jest.init.js'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.html?$': 'html-loader-jest'
  },
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/$1',
    '@commands/(.*)': '<rootDir>/src/commands/$1'
  }
};
