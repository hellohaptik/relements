// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/.jest/styleMock.js',
    '\\.(mdx|md)$': '<rootDir>/.jest/docsMock.js',
    '\\.(svg)$': '<rootDir>/.jest/svgMock.js',
  },
  setupFilesAfterEnv: ['jest-expect-message', '<rootDir>/.jest/setup.js'],
};
