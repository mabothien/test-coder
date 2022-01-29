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
    discoverList: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      shouldFetch: false,
      list: []
    }
  },
  mounted () {
    this.list = this.discoverList
  },
  methods: {
    onDisLike () {
      console.log(1)
    },
    onLike () {
      console.log(2)
    }
  }
}
</script>
