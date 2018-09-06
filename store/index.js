export const state = () => ({
  currentUser: null,
})

export const mutations = {
  SET_AUTHENTICATE_USER (state, user) {
    state.currentUser = user
  },

  CLEAR_STORE (state) {
    // TODO: Clear the state to avoid any leaks
  }
}

export const actions = {
  async nuxtServerInit ({ dispatch }, { app }) {
    try {
      await dispatch('getCurrentUser')
    } catch (e) {}
  },

  async getCurrentUser ({ commit }) {
    try {
      const user = await this.$axios.$get('me')
      commit('SET_AUTHENTICATE_USER', user)
    } catch (e) {
      throw e
    }
  },

  async login ({ dispatch }, { email, password }) {
    try {
      await this.$axios.$post('sessions', {
        email, password
      })

      dispatch('getCurrentUser')
    } catch (e) {
      throw e
    }
  },

  async logout ({ commit }) {
    try {
      await this.$axios.$delete('sessions')

      commit('CLEAR_STORE')
    } catch (e) {
      throw e
    }
  }
}
