
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  rules: {
    'vue/no-v-html': 'off',
    'vue/require-v-for-key': 'off',
    'no-console': 'off',
    'nuxt/no-cjs-in-config': 'off',
    'vue/valid-v-for': 'off',
    'no-console': 'off',
    camelcase: 'off',
  }
}
