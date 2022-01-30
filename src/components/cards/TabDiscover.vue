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
      timeout: 2000,
      firstName:"test123",
      lastName:"sadsad",
      picture: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/945.jpg"
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
    async onLike () {
      const graphqlQuery = {
         query: `mutation likeUser($firstName: String, $lastName: String, $picture: String) {
          likeUser( firstName: $firstName, lastName: $lastName, picture: $picture){
            id
            firstName
            lastName
            picture
          }
        }`,
        variables: {
          firstName: this.firstName,
          lastName: this.lastName,
          picture: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1201.jpg"
        }
      }
      const { data } = await this.$axios.request({
        url: 'http://localhost:4000/user',
        method: 'POST',
        data: graphqlQuery
      })
      console.log(data)
      this.$store.dispatch('snackbar/setSnackbar', {
        showing: true,
        color: 'success',
        text: '<span>New match!!!</span><p>Send her a message now!</p>'
      })
    }
  }
}
</script>
