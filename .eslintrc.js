module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:prettier/recommended',
    'prettier/react',
    'plugin:react-native/all',
  ],
  plugins: [
    'prettier',
    'eslint-comments',
    'react',
    'react-native',
    'react-hooks',
    'jest',
  ],
  settings: {
    'react-native/style-sheet-object-names': [
      'EStyleSheet',
      'OtherStyleSheet',
      'PStyleSheet',
    ],
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react-native/no-inline-styles': 0,
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-color-literals': 0,
    'react-native/no-raw-text': 0,
    'react-native/no-single-element-style-arrays': 2,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
