<template>
  <div class="flex flex-col">
    <h1 class="mb-8">Modifier une équipe</h1>

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

        <div class="w-full">
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

    <team-member-form :members="availableMembers" :team="team" @submit="loadTeamMembers"></team-member-form>
    <team-member-list :members="teamMembers" :team="team" @submit="loadTeamMembers"></team-member-list>
  </div>
</template>

<script>
import TeamMemberForm from '@/components/Team/TeamMemberForm'
import TeamMemberList from '@/components/Team/TeamMemberList'
import SearchableSelect from '@/components/Common/SearchableSelect'

export default {
  layout: 'app',

  components: { SearchableSelect, TeamMemberForm, TeamMemberList },

  data: () => ({
    form: {
      name: null,
      category_id: null,
      academy: false,
    },
    teamCategories: [],
    team: {},
    members: [],
    teamMembers: [],
  }),

  async created () {
    this.loadCategories()
    this.loadMembers()
    this.loadTeamMembers()

    this.team = await this.$axios.$get(`admin/teams/${this.$route.params.id}`)
    this.hydrate()
  },

  computed: {
    availableMembers () {
      return this.members.filter((member) => {
        return !this.teamMembers.map(m => m.id).includes(member.id)
      })
    }
  },

  methods: {
    hydrate () {
      this.form.name = this.team.name
      this.form.category_id = this.team.category_id
      this.form.academy = this.team.academy
    },

    async loadMembers () {
      const members = await this.$axios.$get('admin/members')

      this.members = members.map((member) => ({
        id: member.id,
        name: `${member.firstname} "${member.nickname}" ${member.lastname}`,
      }))
    },

    async loadTeamMembers () {
      this.teamMembers = await this.$axios.$get(`admin/teams/${this.$route.params.id}/members`)
    },

    async loadCategories () {
      this.teamCategories = await this.$axios.$get('teams/categories')
    },

    async save () {
      try {
        await this.$axios.$put(`admin/teams/${this.team.id}`, this.form)
        this.$toast.success('Equipe sauvegardée !')
      } catch (e) {
        this.$toast.error('Une erreur est survenue')
      }
    }
  }
}
</script>

