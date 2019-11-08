<template>
  <div class="w-full max-w-lg text-gray-700 tracking-wider">
    <form @submit.prevent="authenticate">
      <div class="w-full flex items-center justify-center text-white text-center mb-16">
        <LausanneLogo class="h-32" />
      </div>

      <p class="text-white mb-8" v-if="errors">No account found with the provided credentials.</p>

      <div class="flex flex-col bg-white rounded px-8 py-4">
        <div class="flex items-center border-b h-16 pb-4">
          <UserIcon class="fill-current h-5 mr-4" />
          <input
            class="h-full flex-1 tracking-wider"
            type="text"
            placeholder="Username / Email"
            v-model="form.uid"
            autofocus
          />
        </div>

        <div class="flex items-center h-16 pt-4">
          <PasswordIcon class="fill-current h-5 mr-4" />
          <input
            class="h-full flex-1 tracking-wider"
            type="password"
            placeholder="Password"
            v-model="form.password"
          />
        </div>
      </div>

      <button
        class="w-full font-bold text-white h-12 mt-8 mb-6 bg-gray-800 hover:bg-gray-700 transition rounded"
        type="submit"
      >Sign In</button>
    </form>

    <div class="w-full text-center hover:text-white transition">
      <nuxt-link class="uppercase" to="/forgot-password">Forgot your password ?</nuxt-link>
    </div>
  </div>
</template>

<script>
import LausanneLogo from '~/assets/images/logo-white.svg'
import UserIcon from '~/assets/icons/icon-user.svg'
import PasswordIcon from '~/assets/icons/icon-lock.svg'

export default {
  layout: 'auth',

  components: {
    LausanneLogo,
    UserIcon,
    PasswordIcon,
  },

  data: () => ({
    form: {
      uid: null,
      password: null,
    },
    errors: null,
  }),

  methods: {
    async authenticate() {
      try {
        await this.$store.dispatch('login', this.form)

        this.$router.push('/')
      } catch (e) {
        this.errors = e.response.data.errors
      }
    },
  },
}
</script>

