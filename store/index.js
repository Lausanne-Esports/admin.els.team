export const state = () => ({
  currentUser: null,
  textStates: {
    1: 'Draft',
    2: 'Proofreading Requested',
    3: 'Ready',
    4: 'Published',
  }
})

export const mutations = {
  SET_AUTHENTICATE_USER (state, user) {
    state.currentUser = user
  },

  CLEAR_STORE (state) {
    // TODO: Clear the state to avoid any leaks
    state.currentUser = null
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

  async login ({ dispatch }, { uid, password }) {
    try {
      await this.$axios.$post('sessions', {
        uid, password
      })

      await dispatch('getCurrentUser')
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
