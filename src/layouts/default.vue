<template>
  <div>
    <div>My blog navigation bar here</div>
    <v-app id="inspire">
      <nuxt />
    </v-app>
  </div>
</template>
<script>
export default {
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css'
      }
    ]
  }
}
</script>
