<template>
  <div>
    <div class="tinder_avatar_wrapper">
      <transition-group
        name="transition"
        :leave-active-class="
          ['animated', isLike ? 'bounceOutRight' : 'bounceOutLeft'].join(' ')
        "
        tag="div"
      >
        <div
          v-for="user in users"
          :key="user.id"
          no-gutters
          class="tinder_avatar justify-center"
        >
          <div>
            <div class="card">
              <v-img class="tinder_image" height="340" :src="user.picture" />
            </div>
            <v-card-text class="user_name">
              {{ user.title }}. {{ user.firstName }} {{ user.lastName }}
            </v-card-text>
          </div>
        </div>
      </transition-group>
    </div>

    <v-card-actions class="tinder_action justify-center">
      <v-btn fab @click="onDisLike()">
        <v-icon color="red">
          mdi-close
        </v-icon>
      </v-btn>
      <v-btn fab @click="onLike()">
        <v-icon color="green">
          mdi-heart
        </v-icon>
      </v-btn>
    </v-card-actions>
  </div>
</template>
<script>
export default {
  props: {
    randomUser: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      list: [],
      text: '',
      users: [],
      show: true,
      isLike: false
    }
  },
  watch: {
    randomUser (newValue) {
      this.users = newValue
    }
  },
  mounted () {
    this.users = this.randomUser
    console.log(this.users)
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
          id: this.users[0].id
        }
      }
      const data = await this.$axios.request({
        url: 'http://localhost:4000/user',
        method: 'POST',
        data: graphqlQuery
      })
      if (data.status === 200) {
        this.isLike = false
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
          id: this.users[0].id
        }
      }
      const data = await this.$axios.request({
        url: 'http://localhost:4000/user',
        method: 'POST',
        data: graphqlQuery
      })
      if (data.status === 200) {
        this.isLike = true
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
$distance: 400px;

.tinder_avatar_wrapper {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 23px;
  margin: auto;
  width: calc(100% - 20px);
  height: calc(100% - 23px - 65px - 47px - 16px);
  min-width: 80%;
  max-width: 80%;
  .tinder_avatar {
    position: absolute;
    width: 100%;
    background-color: transparent;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    transition: all 0.1s linear;

    &:nth-child(1) {
      z-index: 5;
      //animation: no 0.6s infinite;
    }
    &:nth-child(2) {
      z-index: 4;
      top: 7px;
      transform: scale(0.98);
    }
    &:nth-child(3) {
      z-index: 3;
      top: 14px;
      transform: scale(0.96);
    }
    &:nth-child(n + 4) {
      z-index: 2;
      transform: scale(0.7);
    }
  }
  .user_name {
    font-weight: 500;
    font-size: 18px;
    position: absolute;
    bottom: 0;
    color: #fff;
  }
}

// .tinder_image {
//   margin: 10px;
//   border-radius: 8px;
//   box-shadow: 0px 7px 7px 0px rgb(0 0 0 / 20%);
// }
.empty {
  display: flex;
  justify-content: center;
  padding: 100px;
}

.tinder_action {
  position: absolute;
  bottom: 0;
  width: 100%;
  .v-btn {
    box-shadow: none !important;
  }
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.animateYes {
  animation-fill-mode: both;
  animation: yes 0.6s linear;
  &:before {
    transform: rotateZ(-35deg);
    background: url(https://i.imgur.com/Zkwj970.png) no-repeat center 10px;
  }
}

@keyframes no {
  0% {
    transform: rotateZ(360deg);
    right: 0;
  }
  30% {
    transform: scale(1.05) rotateZ(360deg);
    right: 0;
  }
  100% {
    transform: rotateZ(315deg);
    right: $distance;
  }
}

@keyframes yes {
  0% {
    transform: scale(1) rotateZ(0deg);
    left: 0;
  }
  30% {
    transform: scale(1.05) rotateZ(0deg);
    left: 0;
  }
  100% {
    transform: rotateZ(45deg);
    left: $distance;
  }
}
</style>
