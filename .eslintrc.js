module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': [2, 'never'],
    'no-unused-vars': ['warn', { 'vars': 'all', 'ignoreRestSiblings': false }],
    'vue/no-unused-components': ['warn'],
    'max-len': ["error", { "code": 140 }],
    'no-unused-expressions': ["error", { "allowTernary": true }]
  },
};
