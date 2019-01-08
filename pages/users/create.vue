<template>
  <div class="flex flex-col">
    <h1 class="mb-8">Ajouter un utilisateur</h1>

    <div class="flex w-1/4 pb-4 mb-4">
      <nuxt-link
        class="flex w-1/4 shadow items-center justify-center text-primary-light hover:bg-white-blue-dark transition rounded-full bg-white p-4 mr-4"
        to="/users"
      >Retour</nuxt-link>

      <button
        class="flex w-1/2 shadow items-center justify-center bg-primary-light hover:bg-primary transition rounded-full text-white p-4"
        @click="save"
      >Sauvegarder</button>
    </div>

    <section class="p-8 mb-8 bg-white shadow rounded-lg w-full">
      <header class="text-primary mb-8 pb-8 border-b border-primary">
        <h2>Information</h2>
      </header>

      <form @submit.prevent="save">
        <div class="flex justify-between">
          <div class="w-full mr-8">
            <base-input
              label="Nom d'utilisateur"
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
              label="Mot de passe"
              name="password"
              type="password"
              v-model="form.password"
            ></base-input>
          </div>

          <div class="w-full mr-8">
            <base-input
              label="Confirmation du mot de passe"
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
import BaseInput from '@/components/Form/BaseInput'

export default {
  layout: 'app',

  components: { BaseInput },

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

