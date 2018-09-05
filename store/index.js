export const state = () => ({
  currentUser: null,
})

export const mutations = {
  SET_AUTHENTICATE_USER (state, user) {
    state.currentUser = user
  },
}

export const actions = {
  async nuxtServerInit ({ dispatch }, { app }) {
    dispatch('getCurrentUser')
  },

  async getCurrentUser ({ commit }) {
    try {
      const user = await this.$axios.$get('me')
      commit('SET_AUTHENTICATE_USER', user)
    } catch (e) {}
  },

  async login ({ dispatch }, { email, password }) {
    try {
      await this.$axios.$post('sessions', {
        email, password
      })

      dispatch('getCurrentUser')
    } catch (e) {}
  },
}
