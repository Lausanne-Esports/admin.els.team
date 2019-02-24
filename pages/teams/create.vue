<template>
  <div class="flex flex-col">
    <h1 class="tracking-wide mb-8">Add a team</h1>

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex shadow items-center justify-center hover:bg-neutral-200 transition rounded bg-white px-4 py-2 mr-4"
        to="/teams"
      >
        <BackIcon class="fill-current h-8 mr-1" />
        <span>Back</span>
      </nuxt-link>

      <button
        class="inline-flex items-center shadow bg-primary-800 hover:bg-primary-900 transition rounded text-white px-4 py-2"
        @click="save"
      >Save</button>
    </div>

    <section class="p-8 mb-8 bg-white shadow rounded w-full">
      <header class="mb-8 pb-4 border-b border-neutral-300">
        <h2>Information</h2>
      </header>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input
            label="Name"
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
          label="Academy"
          name="academy"
          v-model="form.academy"
        ></checkbox>
      </div>
    </section>
  </div>
</template>

<script>
import BackIcon from '@/assets/icons/icon-cheveron-left.svg'
import Checkbox from '@/components/Form/Checkbox'
import BaseInput from '@/components/Form/BaseInput'
import SearchableSelect from '@/components/Form/SearchableSelect'

export default {
  layout: 'app',

  components: { BackIcon, BaseInput, Checkbox, SearchableSelect },

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
