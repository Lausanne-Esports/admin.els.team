<template>
  <div class="w-full max-w-sm text-neutral-500 tracking-wide">
    <form @submit.prevent="send">

      <div class="w-full text-white text-center mb-8">
        <LausanneLogo class="h-32 mb-10" />
      </div>

      <p class="text-white mb-8" v-if="errors">{{ errors[0].detail }}</p>

      <div class="flex flex-col bg-white rounded px-8 py-4">
        <div class="flex items-center h-16">
          <UserIcon class="fill-current h-5 mr-4" />
          <input class="h-full flex-1 tracking-wide" type="text" placeholder="Username / Email" v-model="form.uid" autofocus>
        </div>
      </div>

      <button
        class="w-full font-bold text-white p-4 mt-8 mb-6 bg-neutral-900 hover:bg-neutral-800 transition rounded"
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
import LausanneLogo from '~/assets/images/logo-white.svg'
import UserIcon from '~/assets/icons/icon-user.svg'

export default {
  layout: 'auth',

  components: { LausanneLogo, UserIcon },

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

