import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import snackbarModule from './snackbar'

Vue.use(Vuex)

export default () => new Store({
  modules: {
    snackbar: snackbarModule
  }
})
