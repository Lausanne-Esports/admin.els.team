<template>
  <div class="flex flex-col items-center justify-center w-full text-darker-blue">
    <img class="h-32 mb-10" src="~/assets/images/logo-white.svg" alt="Lausanne eSports">

    <form class="w-1/5 flex flex-col bg-white p-8 rounded-lg" @submit.prevent="authenticate">
      <span class="text-red mb-8" v-if="errors">{{ errors[0].detail }}</span>

      <div class="flex items-center mb-4">
        <i class="fa fa-user mr-4"></i>
        <input class="h-8 w-full" type="text" placeholder="Email" v-model="form.email" autofocus>
      </div>

      <div class="flex items-center">
        <i class="fa fa-lock mr-4"></i>
        <input class="h-8 w-full" type="password" placeholder="Password" v-model="form.password">
      </div>

      <button class="border rounded-full py-2 border-darker-blue mt-10 hover:bg-darker-blue hover:text-white transition" type="submit">Connexion</button>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'auth',

  data: () => ({
    form: {
      email: null,
      password: null,
    },
    errors: null,
  }),

  methods: {
    async authenticate () {
      try {
        await this.$store.dispatch('login', {
          email: this.form.email,
          password: this.form.password,
        })

        this.$router.push('/')
      } catch (e) {
        this.errors = e.response.data.errors
      }
    }
  },
}
</script>

