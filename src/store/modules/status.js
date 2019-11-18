export default {
  namespaced: true,
  state: {
    isLogin: false
  },
  getters: {
    getLoginStatus (state) {
      return state.isLogin
    }
  },
  mutations: {
    CHANGELOGINSTATUS (state, { status }) {
      state.isLogin = status
    }
  },
  actions: {
    judgeLogin ({ commit }, status) {
      commit('CHANGELOGINSTATUS', status)
    }
  }
}
