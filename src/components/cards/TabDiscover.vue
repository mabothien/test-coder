<template>
  <div>
    <v-card v-if="user">
      <div class="card">
        <v-img
          height="250"
          :src="user.picture"
        />
      </div>
      <v-card-text>
        {{ user.title }}. {{ user.firstName }} {{ user.lastName }}
      </v-card-text>
      <v-card-actions class="justify-center">
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
    <div v-else class="empty">
      empty
    </div>
  </div>
</template>
<script>

export default {
  props: {
    randomUser: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      list: [],
      text: '',
      user: {}
    }
  },
  watch: {
    randomUser (newValue) {
      this.user = newValue
    }
  },
  mounted () {
    this.user = this.randomUser
  },
  methods: {
    async onDisLike () {
      const graphqlQuery = {
        query: `mutation passUser($id: String!) {
          passUser( id: $id){
            id
          }
        }`,
        variables: {
          id: this.user.id
        }
      }
      const data = await this.$axios.request({
        url: 'http://localhost:4000/user',
        method: 'POST',
        data: graphqlQuery
      })
      if (data.status === 200) {
        this.$emit('reload')
        this.$store.dispatch('snackbar/setSnackbar', {
          showing: true,
          color: 'info',
          text: '<span>Not feeling it?</span><p>Keep discovering</p>'
        })
      }
    },
    async onLike () {
      const graphqlQuery = {
        query: `mutation likeUser($id: String!) {
          likeUser(id: $id){
            id,
          }
        }`,
        variables: {
          id: this.user.id
        }
      }
      const data = await this.$axios.request({
        url: 'http://localhost:4000/user',
        method: 'POST',
        data: graphqlQuery
      })
      if (data.status === 200) {
        this.$emit('reload')
        this.$store.dispatch('snackbar/setSnackbar', {
          showing: true,
          color: 'success',
          text: '<span>New match!!!</span><p>Send her a message now!</p>'
        })
      }
    }
  }
}
</script>
<style lang="scss">
.empty {
  display: flex;
  justify-content: center;
  padding: 100px;
}
</style>
