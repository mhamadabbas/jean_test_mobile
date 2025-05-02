module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest-setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/__tests__/__mocks__'],
};
