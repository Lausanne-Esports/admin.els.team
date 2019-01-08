<template>
  <div class="flex flex-col">
    <h1 class="tracking mb-8">Equipes</h1>

    <div class="pb-4 mb-4">
      <nuxt-link
        class="flex w-1/4 shadow items-center justify-center bg-primary-light hover:bg-primary transition rounded-full text-white p-4"
        to="/teams/create"
      >Ajouter une équipe</nuxt-link>
    </div>

    <panel>
      <table class="w-full border-collapse">
        <thead>
          <tr class="text-sm h-12 text-left uppercase text-primary-light">
            <th>
              <span class="flex items-center">Nom</span>
            </th>
            <th>
              <span class="flex items-center">Type</span>
            </th>
            <th>
              <span class="flex justify-center items-center">Ordre</span>
            </th>
            <th>
              <span class="flex items-center">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <list-item
            v-for="(team, index) in teams"
            :key="team.id"
            :team="team"
            :first="index === 0"
            :last="lastItemIndex === index"
            @teamUpdated="loadTeams"
          ></list-item>
        </tbody>
      </table>
    </panel>
  </div>
</template>

<script>
import Panel from '@/components/Layout/Panel'
import ListItem from '@/components/Team/ListItem'

export default {
  layout: 'app',

  components: { ListItem, Panel },

  data: () => ({
    teams: [],
  }),

  async asyncData ({ $axios }) {
    const teams = await $axios.$get('admin/teams')

    return { teams }
  },

  computed: {
    lastItemIndex () {
      return Object.keys(this.teams).length - 1
    },
  },

  methods: {
    async loadTeams () {
      this.teams = await this.$axios.$get('admin/teams')
    }
  }
}
</script>
