export default {
  namespaced: true,
  state: {
    snackbar: {
      showing: false,
      color: '',
      text: ''
    }
  },
  mutations: {
    SET_SNACKBAR (state, snackbar) {
      state.snackbar = Object.assign(snackbar)
    }
  },
  actions: {
    setSnackbar ({ commit }, snackbar) {
      commit('SET_SNACKBAR', snackbar)
    }
  }
}
