module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  ignorePatterns: [
    'node_modules/',
    'reports/',
  ],
  rules: {
    'max-len': ['error', { code: 200, ignoreComments: true }],
    'linebreak-style': 0,
    'class-methods-use-this': 'off',
    'no-undef': 'off',
  },
};
