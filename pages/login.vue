<template>
  <div>
    <span v-if="errors">{{ errors[0].detail }}</span>
    <form class="flex flex-col" @submit.prevent="authenticate">
      <input type="text" placeholder="Email" v-model="form.email">
      <input type="password" placeholder="Password" v-model="form.password">
      <button type="submit">Connexion</button>
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

