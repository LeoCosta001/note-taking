module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'max-len': ['error', { ignoreUrls: true, ignoreStrings: true, code: 1000 }],
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
