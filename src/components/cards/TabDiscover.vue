<template>
  <v-card>
    <div class="card">
      <v-img
        height="250"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      />
    </div>
    <v-card-actions class="justify-center">
      <v-btn icon />
      <v-btn
        fab
        @click="onDisLike()"
      >
        <v-icon color="red">
          mdi-close
        </v-icon>
      </v-btn>
      <v-btn
        fab
        @click="onLike()"
      >
        <v-icon color="green">
          mdi-heart
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>

export default {
  props: {
    matches: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      list: [],
      text: '',
      timeout: 2000
    }
  },
  mounted () {
    this.list = this.matches
  },
  methods: {
    onDisLike () {
      this.$store.dispatch('snackbar/setSnackbar', {
        showing: true,
        color: 'info',
        text: '<span>Not feeling it?</span><p>Keep discovering</p>'
      })
    },
    onLike () {
      this.$store.dispatch('snackbar/setSnackbar', {
        showing: true,
        color: 'success',
        text: '<span>New match!!!</span><p>Send her a message now!</p>'
      })
    }
  }
}
</script>
