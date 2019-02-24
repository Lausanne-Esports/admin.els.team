<template>
  <div class="flex flex-col">
    <h1 class="tracking-wide mb-8">Modifier une équipe</h1>

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
      >Sauvegarder</button>
    </div>

    <section class="p-8 mb-8 bg-white shadow rounded w-full">
      <header class="mb-8 pb-4 border-b border-neutral-300">
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

        <div class="w-full">
          <searchable-select
            label="Type"
            name="category_id"
            :items="teamCategories"
            v-model="form.category_id"
          ></searchable-select>
        </div>
      </div>

      <div class="flex">
        <div class="mr-8">
          <checkbox
            label="Académie"
            name="academy"
            v-model="form.academy"
          ></checkbox>
        </div>
       <checkbox
          label="Activée"
          name="activated"
          v-model="form.activated"
        ></checkbox>
      </div>
    </section>

    <team-member-form :members="availableMembers" :team="team" @submit="loadTeamMembers"></team-member-form>
    <team-member-list :members="teamMembers" :team="team" @submit="loadTeamMembers"></team-member-list>
  </div>
</template>

<script>
import BackIcon from '@/assets/icons/icon-cheveron-left.svg'
import Checkbox from '@/components/Form/Checkbox'
import BaseInput from '@/components/Form/BaseInput'
import TeamMemberForm from '@/components/Team/TeamMemberForm'
import TeamMemberList from '@/components/Team/TeamMemberList'
import SearchableSelect from '@/components/Form/SearchableSelect'

export default {
  layout: 'app',

  components: {
    BackIcon,
    Checkbox, BaseInput, SearchableSelect,
    TeamMemberForm, TeamMemberList,
  },

  data: () => ({
    form: {
      name: null,
      category_id: null,
      academy: false,
      activated: false,
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
      this.form.activated = this.team.activated
    },

    async loadMembers () {
      const members = await this.$axios.$get('admin/members')

      this.members = members.map((member) => ({
        id: member.id,
        name: `${member.firstname || ''} "${member.nickname}" ${member.lastname || ''}`,
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

