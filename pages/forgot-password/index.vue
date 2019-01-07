<template>
  <div class="w-full max-w-sm text-primary-lighter tracking-wide">
    <form @submit.prevent="send">

      <div class="w-full text-white text-center mb-8">
        <img class="h-32 mb-10" src="~/assets/images/logo-white.svg" alt="Lausanne eSports">
      </div>

      <p class="text-white mb-8" v-if="errors">{{ errors[0].detail }}</p>

      <div class="flex flex-col bg-white rounded-lg px-8 py-4">
        <div class="flex items-center h-16">
          <i class="fa fa-user mr-4"></i>
          <input class="h-full flex-1 tracking-wide" type="text" placeholder="Username / Email" v-model="form.uid" autofocus>
        </div>
      </div>

      <button
        class="w-full font-bold text-white p-4 mt-8 mb-6 bg-primary-light hover:bg-primary transition rounded-full"
        type="submit"
      >
        Envoyer
      </button>
    </form>

    <div class="w-full text-center hover:text-white transition">
      <nuxt-link class="uppercase" to="/login">
        Ou se connecter
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',

  data: () => ({
    form: {
      uid: null,
    },
    errors: null,
  }),

  methods: {
    async send () {
      try {
        await this.$axios.$post('password-requests', this.form)
        this.$toast.success('Demande envoyée par email !')
        this.$router.push('/login')
      } catch (e) {
        this.errors = e.response.data.errors
      }
    }
  },
}
</script>

