module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '.git', '/dist/', '/old/'],
  automock: false,
  collectCoverageFrom: ['dist/*.js'],
};
