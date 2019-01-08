<template>
  <div class="flex flex-col">
    <h1 class="tracking-wide mb-8">Ajouter une équipe</h1>

    <div class="flex w-1/4 pb-4 mb-4">
      <nuxt-link
        class="flex w-1/4 shadow items-center justify-center text-primary-light hover:bg-white-blue-dark transition rounded-full bg-white p-4 mr-4"
        to="/teams"
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

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input
            label="Nom"
            name="name"
            v-model="form.name"
          ></base-input>
        </div>

        <div class="w-full mr-8">
          <searchable-select
            label="Type"
            name="category_id"
            :items="teamCategories"
            v-model="form.category_id"
          ></searchable-select>
        </div>
      </div>

      <div class="flex flex-col">
        <checkbox
          label="Académie"
          name="academy"
          v-model="form.academy"
        ></checkbox>
      </div>
    </section>
  </div>
</template>

<script>
import Checkbox from '@/components/Form/Checkbox'
import BaseInput from '@/components/Form/BaseInput'
import SearchableSelect from '@/components/Form/SearchableSelect'

export default {
  layout: 'app',

  components: { BaseInput, Checkbox, SearchableSelect },

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
        this.$toast.success('Équipe crée !')
      } catch (e) {
        this.$toast.error('Une erreur est survenue')
      }
    },
  }
}
</script>
