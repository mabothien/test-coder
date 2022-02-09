module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },

  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  rules: {
    'no-console': 'off',
    'vue/no-v-html': 'off',
    'vue/require-v-for-key': 'off',
  },
}
