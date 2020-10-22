<template>
  <div class="w-full max-w-lg text-gray-700 tracking-wider">
    <form @submit.prevent="send">
      <div class="w-full flex items-center justify-center text-white text-center mb-8">
        <img class="h-32" src="/logo-white.svg" alt="Lausanne Esports" />
      </div>

      <div class="flex flex-col bg-white rounded px-8 py-4">
        <div class="flex items-center border-b h-16 pb-4">
          <Icon name="lock" class="mono h-5 mr-4" />
          <input
            class="h-full flex-1 tracking-wider"
            type="password"
            placeholder="Password"
            v-model="form.password"
          />
        </div>

        <div class="flex items-center h-16 pt-4">
          <Icon name="lock" class="mono h-5 mr-4" />
          <input
            class="h-full flex-1 tracking-wider"
            type="password"
            placeholder="Confirmation"
            v-model="form.password_confirmation"
          />
        </div>
      </div>

      <button
        class="w-full font-bold text-white h-12 mt-8 mb-6 bg-gray-800 hover:bg-gray-700 transition rounded"
        type="submit"
      >Change my Password</button>
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
    email: null,
    signature: null,
  }),

  async created() {
    this.email = this.$route.params.email
    this.signature = this.$route.query.signature
  },

  methods: {
    async send() {
      try {
        await this.$axios.$post(`/password-requests/${this.email}?signature=${this.signature}`, this.form)
        this.$toast.success('Mot de passe modifié !')
        this.$router.push('/login')
      } catch (e) {
        this.$toast.error('Une erreur est survenue')
      }
    },
  },
}
</script>
