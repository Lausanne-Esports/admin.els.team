<template>
  <div class="flex flex-col">
    <h1 class="mb-8">Ajouter une équipe</h1>

    <div class="pb-4 mb-4">
      <nuxt-link
        class="border rounded-full py-2 px-8 mr-2 border-darker-blue hover:bg-darker-blue hover:text-white transition"
        to="/teams"
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
            <label class="mb-2">Nom</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.name"
            >
          </div>
        </div>

        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">Type</label>
            <searchable-select
              :items="teamCategories"
              v-model="form.category_id"
            ></searchable-select>
          </div>
        </div>
      </div>

      <div class="flex flex-col">
        <label class="mb-2">Académie</label>
        <input
          type="checkbox"
          v-model="form.academy"
        >
      </div>
    </section>
  </div>
</template>

<script>
import SearchableSelect from '@/components/Common/SearchableSelect'

export default {
  layout: 'app',

  components: { SearchableSelect },

  data: () => ({
    form: {
      name: null,
      academy: false,
      category_id: null,
    },
    teamCategories: [],
  }),

  async created () {
    this.teamCategories = await this.$axios.$get('teams/categories')
  },

  methods: {
    async save () {
      try {
        const team = await this.$axios.$post('admin/teams', this.form)
        this.$router.push(`/teams/${team.id}/edit`)
      } catch (e) {
        this.$toast.error('Une erreur est survenue')
      }
    },
  }
}
</script>
