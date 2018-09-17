<template>
  <div class="flex flex-col items-center justify-center w-full text-darker-blue">
    <img class="h-32 mb-10" src="~/assets/images/logo-white.svg" alt="Lausanne eSports">

    <form class="w-1/5 flex flex-col bg-white p-8 rounded-lg" @submit.prevent="send">
      <span class="text-red mb-8" v-if="errors">{{ errors[0].detail }}</span>

      <div class="flex items-center mb-4">
        <i class="fa fa-lock mr-4"></i>
        <input class="h-8 w-full" type="password" placeholder="Mot de passe" v-model="form.password" autofocus>
      </div>

      <div class="flex items-center">
        <i class="fa fa-lock mr-4"></i>
        <input class="h-8 w-full" type="password" placeholder="Confirmation" v-model="form.password_confirmation">
      </div>

      <button
        class="border rounded-full py-2 border-darker-blue mt-8 hover:bg-darker-blue hover:text-white transition"
        type="submit"
      >Changer mon mot de passe</button>
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
