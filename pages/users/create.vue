<template>
  <div class="flex flex-col">
    <h1 class="mb-8">Ajouter un utilisateur</h1>

    <div class="pb-4 mb-4">
      <nuxt-link
        class="border rounded-full py-2 px-8 mr-2 border-darker-blue hover:bg-darker-blue hover:text-white transition"
        to="/users"
      >Retour</nuxt-link>

      <button
        class="border rounded-full py-2 px-8 hover:border-darker-blue bg-darker-blue text-white hover:bg-transparent hover:text-darker-blue transition"
        @click="save"
      >Sauvegarder</button>
    </div>

    <section class="p-8 mb-8 bg-white shadow rounded-lg w-full">
      <header class="pb-4 mb-4 border-b border-darker-blue">
        <h2>Information</h2>
      </header>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">Nom d'utilisateur</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.username"
            >
          </div>
        </div>

        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">Email</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.email"
            >
          </div>
        </div>
      </div>

            <div class="flex justify-between">
        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">Mot de passe</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="password"
              v-model="form.password"
            >
          </div>
        </div>

        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">Confirmation du mot de passe</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="password"
              v-model="form.password_confirmation"
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'app',

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

