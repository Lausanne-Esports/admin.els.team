<template>
  <div class="w-full max-w-lg text-gray-700 tracking-wider">
    <form @submit.prevent="send">
      <div class="w-full flex items-center justify-center text-white text-center mb-16">
        <LausanneLogo class="h-32" />
      </div>

      <p class="text-white mb-8" v-if="errors">{{ errors[0].detail }}</p>

      <div class="flex flex-col bg-white rounded px-8 py-4">
        <div class="flex items-center h-12">
          <Icon name="user" class="h-5 mr-4" />
          <input
            class="h-full flex-1 tracking-wider"
            type="text"
            placeholder="Username / Email"
            v-model="form.uid"
            autofocus
          />
        </div>
      </div>

      <button
        class="w-full font-bold text-white h-12 mt-8 mb-6 bg-gray-800 hover:bg-gray-700 transition rounded"
        type="submit"
      >Send</button>
    </form>

    <div class="w-full text-center hover:text-white transition">
      <nuxt-link class="uppercase" to="/login">Or Sign In</nuxt-link>
    </div>
  </div>
</template>

<script>
import LausanneLogo from '~/assets/images/logo-white.svg'

export default {
  layout: 'auth',

  components: { LausanneLogo },

  data: () => ({
    form: {
      uid: null,
    },
    errors: null,
  }),

  methods: {
    async send() {
      try {
        await this.$axios.$post('password-requests', this.form)
        this.$toast.success('Demande envoyée par email !')
        this.$router.push('/login')
      } catch (e) {
        this.errors = e.response.data.errors
      }
    },
  },
}
</script>

