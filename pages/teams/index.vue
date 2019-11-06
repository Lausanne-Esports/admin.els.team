<template>
  <div class="flex flex-col">
    <h1 class="tracking mb-8">Teams</h1>

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex items-center shadow bg-primary-800 hover:bg-primary-900 transition rounded text-white px-4 py-2"
        to="/teams/create"
      >
        <IconAdd class="fill-current h-8 mr-1" />
        <span>Add a Team</span>
      </nuxt-link>
    </div>

    <panel>
      <table class="w-full border-collapse">
        <thead>
          <tr class="text-sm h-12 text-left uppercase text-neutral-500">
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <Draggable v-model="teams" tag="tbody" @update="computeNewOrder">
          <ListItem
            v-for="(team, index) in teams"
            :key="team.id"
            :team="team"
            :first="index === 0"
            :last="lastItemIndex === index"
            @teamUpdated="loadTeams"
          />
        </Draggable>
      </table>
    </panel>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import IconAdd from '@/assets/icons/icon-add.svg'
import Panel from '@/components/Layout/Panel'
import ListItem from '@/components/Team/ListItem'

export default {
  layout: 'app',

  components: { Draggable, IconAdd, ListItem, Panel },

  data: () => ({
    teams: [],
  }),

  async asyncData({ $axios }) {
    const teams = await $axios.$get('admin/teams')

    return { teams }
  },

  computed: {
    lastItemIndex() {
      return Object.keys(this.teams).length - 1
    },
  },

  methods: {
    async loadTeams() {
      this.teams = await this.$axios.$get('admin/teams')
    },

    async computeNewOrder() {
      this.teams = this.teams.map((team, i) => ({
        ...team,
        order: i + 1,
      }))

      const newOrder = this.teams.map(team => ({
        id: team.id,
        order: team.order,
      }))

      await this.$axios.$post(`admin/teams/order`, { order: newOrder })
    },
  },
}
</script>
