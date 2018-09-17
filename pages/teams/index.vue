<template>
  <div class="flex flex-col">
    <h1 class="mb-8">Equipes</h1>

    <div class="pb-4 mb-4">
      <nuxt-link
        class="border rounded-full py-2 px-8 border-darker-blue hover:bg-darker-blue hover:text-white transition"
        to="/teams/create"
      >Ajouter une équipe</nuxt-link>
    </div>

    <section class="p-8 bg-white shadow rounded-lg w-full">
      <table class="w-full border-collapse">
        <thead>
          <tr class="text-sm h-12 text-left uppercase text-dark-purple-blue">
            <th>
              <span class="flex items-center">Nom</span>
            </th>
            <th>
              <span class="flex items-center">Type</span>
            </th>
            <th>
            </th>
            <th>
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
    </section>
  </div>
</template>

<script>
import ListItem from '@/components/Team/ListItem'

export default {
  layout: 'app',

  components: { ListItem },

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
