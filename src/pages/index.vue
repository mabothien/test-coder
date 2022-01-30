<template>
  <div>
    <v-app>
      <Home />
    </v-app>
    <v-snackbar
      v-model="snackbar.showing"
      :color="snackbar.color"
      right
      top
    >
      <div v-html="snackbar.text" />
    </v-snackbar>
  </div>
</template>
<script>

export default {
  name: 'TinderApp',
  layout: 'default',
  data () {
    return {
      snackText: ''
    }
  },
  computed: {
    snackbar () {
      return this.$store.state.snackbar.snackbar
    }
  }
}
</script>
