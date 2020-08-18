<template>
  <div class="flex flex-col">
    <Heading>Modification of a team</Heading>
    <Spacer direction="b" :size="8" />

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex shadow items-center justify-center hover:bg-gray-200 transition rounded bg-white px-4 py-2 mr-4"
        to="/teams"
      >
        <Icon name="cheveron-left" class="h-8 mr-1" />
        <span>Back</span>
      </nuxt-link>

      <button
        class="inline-flex items-center shadow bg-blue-800 hover:bg-blue-900 transition rounded text-white px-4 py-2"
        @click="save"
      >Save</button>
    </div>

    <Panel header="Information">
      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input label="Name" name="name" v-model="form.name"></base-input>
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
          <NewCheckbox label="Academy" name="academy" v-model="form.academy" />
        </div>
        <NewCheckbox label="Enabled" name="activated" v-model="form.activated" />
      </div>
    </Panel>

    <Spacer direction="b" :size="8" />

    <Panel header="Add a member">
      <TeamMemberForm :members="availableMembers" :team="team" @submit="loadTeamMembers" />
    </Panel>

    <Spacer direction="b" :size="8" />

    <Panel header="Members">
      <TeamMemberList
        :members="teamMembers"
        :team="team"
        @submit="loadTeamMembers"
        @updateMemberList="updateMemberList"
        @refreshList="refreshList"
      />
    </Panel>
  </div>
</template>

<script>
import Checkbox from '@/components/Form/Checkbox'
import NewCheckbox from '@/components/Form/NewCheckbox'
import BaseInput from '@/components/Form/BaseInput'
import TeamMemberForm from '@/components/Team/TeamMemberForm'
import TeamMemberList from '@/components/Team/TeamMemberList'
import SearchableSelect from '@/components/Form/SearchableSelect'

export default {
  layout: 'app',

  components: {
    NewCheckbox,
    BaseInput,
    SearchableSelect,
    TeamMemberForm,
    TeamMemberList,
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

  async created() {
    this.loadCategories()
    this.loadMembers()
    this.loadTeamMembers()

    this.team = await this.$axios.$get(`admin/teams/${this.$route.params.id}`)
    this.hydrate()
  },

  computed: {
    availableMembers() {
      return this.members.filter(member => {
        return !this.teamMembers.map(m => m.id).includes(member.id)
      })
    },
  },

  methods: {
    hydrate() {
      this.form.name = this.team.name
      this.form.category_id = this.team.category_id
      this.form.academy = this.team.academy
      this.form.activated = this.team.activated
    },

    async loadMembers() {
      const members = await this.$axios.$get('admin/members')

      this.members = members.map(member => ({
        id: member.id,
        name: `${member.firstname || ''} "${
          member.nickname
        }" ${member.lastname || ''}`,
      }))
    },

    async loadTeamMembers() {
      this.teamMembers = await this.$axios.$get(
        `admin/teams/${this.$route.params.id}/members`
      )
    },

    async loadCategories() {
      this.teamCategories = await this.$axios.$get('teams/categories')
    },

    async save() {
      try {
        await this.$axios.$put(`admin/teams/${this.team.id}`, this.form)
        this.$toast.success('Team saved!')
      } catch (e) {
        this.$toast.error('Something went wrong')
      }
    },

    // TODO: Cleanup event management
    updateMemberList(members) {
      this.teamMembers = members
    },

    refreshList({ id, update }) {
      const member = this.teamMembers.find(member => member.id === id)

      member.pivot_role = update.role
      member.pivot_academy = update.academy
    },
  },
}
</script>

