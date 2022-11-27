module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'generator-star-spacing': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    'vue/multi-word-component-names': 'off',
    'no-tabs': 'off',
    'no-underscore-dangle': 'off',
    'import/no-cycle': 'off',
    'import/no-import-module-exports': 'off',
    'new-cap': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-param-reassign': 0,
  },
};
