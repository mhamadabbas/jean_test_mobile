module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/ui': './src/ui',
          '@/screens': './src/screens',
          '@/navigation': './src/navigation',
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.ios.js', '.android.js'],
      },
    ],
  ],
};
