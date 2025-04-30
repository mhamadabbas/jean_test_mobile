module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/ui': './src/ui',
          '@/api': './src/api',
          '@/types': './src/types',
          '@/hooks': './src/hooks',
          '@/screens': './src/screens',
          '@/constants': './src/constants',
          '@/components': './src/components',
          '@/navigation': './src/navigation',
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.ios.js', '.android.js'],
      },
    ],
  ],
};
