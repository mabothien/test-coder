
module.exports = {
  root: true,
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
    'no-console': 'off'
  }
}
