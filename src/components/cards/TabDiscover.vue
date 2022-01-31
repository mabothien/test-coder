<template>
  <div>
    <v-card v-if="user">
    <div class="card">
      <v-img
        height="250"
        :src="user.picture"
      />
    </div>
    <v-card-text >
     {{user.title}}. {{user.firstName}} {{user.lastName}}
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
  <div class="empty" v-else>empty</div>
  </div>
</template>
<script>
const { faker } = require('@faker-js/faker');

export default {
  props: {
    discoverUser: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      list: [],
      text: '',
      user: {},
    }
  },
  watch: {
    discoverUser (newValue) {
      this.user = newValue
    }
  },
  mounted () {
    this.user = this.discoverUser
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
          id: this.user.id.toString(),
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
         query: `mutation likeUser($id: String!, $title: String, $firstName: String, $lastName: String, $picture: String) {
          likeUser(id: $id, title: $title, firstName: $firstName, lastName: $lastName, picture: $picture){
            id,
            title,
            firstName,
            lastName,
            picture
          }
        }`,
        variables: {
          id: this.user.id.toString(),
          title: this.user.title,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          picture: this.user.picture
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