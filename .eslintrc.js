module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'standard',
    'standard-react',
    'plugin:eslint-comments/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native'],
  rules: {
    'no-unused-vars': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
}
