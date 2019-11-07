<template>
  <div class="flex flex-col">
    <h1 class="mb-8">Add a user</h1>

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex shadow items-center justify-center hover:bg-gray-200 transition rounded bg-white px-4 py-2 mr-4"
        to="/users"
      >
        <BackIcon class="fill-current h-8 mr-1" />
        <span>Back</span>
      </nuxt-link>

      <button
        class="inline-flex items-center shadow bg-blue-800 hover:bg-blue-900 transition rounded text-white px-4 py-2"
        @click="save"
      >Save</button>
    </div>

    <section class="p-8 mb-8 bg-white shadow rounded w-full">
      <header class="mb-8 pb-4 border-b border-neutral-300">
        <h2>Information</h2>
      </header>

      <form @submit.prevent="save">
        <div class="flex justify-between">
          <div class="w-full mr-8">
            <base-input
              label="Username"
              name="username"
              v-model="form.username"
            ></base-input>
          </div>

          <div class="w-full mr-8">
            <base-input
              label="Email"
              name="email"
              v-model="form.email"
            ></base-input>
          </div>
        </div>

        <div class="flex justify-between">
          <div class="w-full mr-8">
            <base-input
              label="Password"
              name="password"
              type="password"
              v-model="form.password"
            ></base-input>
          </div>

          <div class="w-full mr-8">
            <base-input
              label="Password Confirmation"
              name="password_confirmation"
              type="password"
              v-model="form.password_confirmation"
            ></base-input>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import BackIcon from '@/assets/icons/icon-cheveron-left.svg'
import BaseInput from '@/components/Form/BaseInput'

export default {
  layout: 'app',

  components: { BackIcon, BaseInput },

  data: () => ({
    form: {
      username: null,
      email: null,
      password: null,
      password_confirmation: null,
    }
  }),

  methods: {
    async save () {
      try {
        await this.$axios.$post('admin/users', this.form)
        this.$toast.success('Utilisateur sauvegardé !')
        this.$router.push('/users')
      } catch (e) {
        this.$toast.error('Une erreur est survenue')
      }
    }
  }
}
</script>

