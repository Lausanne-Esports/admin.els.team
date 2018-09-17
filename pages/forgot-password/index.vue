<template>
  <div class="flex flex-col items-center justify-center w-full text-darker-blue">
    <img class="h-32 mb-10" src="~/assets/images/logo-white.svg" alt="Lausanne eSports">

    <form class="w-1/5 flex flex-col bg-white p-8 rounded-lg" @submit.prevent="send">
      <span class="text-red mb-8" v-if="errors">{{ errors[0].detail }}</span>

      <div class="flex items-center mb-4">
        <i class="fa fa-user mr-4"></i>
        <input class="h-8 w-full" type="text" placeholder="Username / Email" v-model="form.uid" autofocus>
      </div>

      <button
        class="border rounded-full py-2 border-darker-blue mt-8 hover:bg-darker-blue hover:text-white transition"
        type="submit"
      >Envoyer</button>
    </form>

    <div class="mt-8 text-white">
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

