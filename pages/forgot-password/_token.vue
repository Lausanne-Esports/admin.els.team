<template>
  <div class="w-full max-w-sm text-gray-500 tracking-wider">
    <form @submit.prevent="send">
      <div class="w-full text-white text-center mb-8">
        <LausanneLogo class="h-32 mb-10" />
      </div>>
      <p class="text-white mb-8" v-if="errors">{{ errors[0].detail }}</p>

      <div class="flex flex-col bg-white rounded px-8 py-4">
        <div class="flex items-center border-b h-16 pb-4">
          <PasswordIcon class="fill-current h-5 mr-4" />
          <input
            class="h-full flex-1 tracking-wider"
            type="password"
            placeholder="Password"
            v-model="form.password"
          />
        </div>

        <div class="flex items-center h-16 pt-4">
          <PasswordIcon class="fill-current h-5 mr-4" />
          <input
            class="h-full flex-1 tracking-wider"
            type="password"
            placeholder="Confirmation"
            v-model="form.password_confirmation"
          />
        </div>
      </div>

      <button
        class="w-full font-bold text-white p-4 mt-8 mb-6 bg-gray-900 hover:bg-gray-800 transition rounded"
        type="submit"
      >Change my Password</button>
    </form>
  </div>
</template>

<script>
import LausanneLogo from '~/assets/images/logo-white.svg'
import PasswordIcon from '~/assets/icons/icon-lock.svg'

export default {
  layout: 'auth',

  components: { LausanneLogo, PasswordIcon },

  data: () => ({
    form: {
      password: null,
      password_confirmation: null,
    },
    errors: null,
    token: null,
  }),

  async created() {
    this.token = this.$route.params.token
  },

  methods: {
    async send() {
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
