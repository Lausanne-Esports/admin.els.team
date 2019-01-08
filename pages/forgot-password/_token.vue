<template>
  <div class="w-full max-w-sm text-primary-lighter tracking-wide">
    <form @submit.prevent="send">

      <div class="w-full text-white text-center mb-8">
        <img class="h-32 mb-10" src="~/assets/images/logo-white.svg" alt="Lausanne eSports">
      </div>

      <p class="text-white mb-8" v-if="errors">{{ errors[0].detail }}</p>

      <div class="flex flex-col bg-white rounded-lg px-8 py-4">
        <div class="flex items-center border-b h-16 pb-4">
          <i class="fa fa-lock mr-4"></i>
          <input class="h-full flex-1 tracking-wide" type="password" placeholder="Mot de passe" v-model="form.password" autofocus>
        </div>

        <div class="flex items-center h-16 pt-4">
          <i class="fa fa-lock mr-4"></i>
          <input class="h-full flex-1 tracking-wide" type="password" placeholder="Confirmation" v-model="form.password_confirmation">
        </div>
      </div>

      <button
        class="w-full font-bold text-white p-4 mt-8 mb-6 bg-primary-light hover:bg-primary transition rounded-full"
        type="submit"
      >
        Changer mon mot de passe
      </button>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'auth',

  data: () => ({
    form: {
      password: null,
      password_confirmation: null,
    },
    errors: null,
    token: null,
  }),

  async created () {
    this.token = this.$route.params.token
  },

  methods: {
    async send () {
      try {
        await this.$axios.$post(`/password-requests/${this.token}`, this.form)
        this.$toast.success('Mot de passe modifié !')
        this.$router.push('/login')
      } catch (e) {
        this.errors = e.response.data.errors
        this.$toast.error('Une erreur est survenue')
      }
    },
  },
}
</script>
