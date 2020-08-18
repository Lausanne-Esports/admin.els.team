<template>
  <div class="flex flex-col">
    <Heading>Modification of a staff</Heading>
    <Spacer direction="b" :size="8" />

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex shadow items-center justify-center hover:bg-gray-200 transition rounded bg-white px-4 py-2 mr-4"
        to="/staff"
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
      </div>

      <div class="flex">
        <NewCheckbox label="Enabled" name="activated" v-model="form.activated" />
      </div>
    </Panel>

    <Spacer direction="b" :size="8" />

    <Panel header="Add a member">
      <StaffMemberForm :members="availableMembers" :staff="staff" @submit="loadStaffMembers" />
    </Panel>

    <Spacer direction="b" :size="8" />

    <Panel header="Members">
      <StaffMemberList
        :members="staffMembers"
        :staff="staff"
        @submit="loadStaffMembers"
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
import StaffMemberForm from '@/components/Staff/StaffMemberForm'
import StaffMemberList from '@/components/Staff/StaffMemberList'

export default {
  layout: 'app',

  components: {
    NewCheckbox,
    BaseInput,
    StaffMemberForm,
    StaffMemberList,
  },

  data: () => ({
    form: {
      name: null,
      activated: 0,
    },
    staff: {},
    members: [],
    staffMembers: [],
  }),

  async created() {
    this.loadMembers()
    this.loadStaffMembers()

    this.staff = await this.$axios.$get(`admin/staff/${this.$route.params.id}`)
    this.hydrate()
  },

  computed: {
    availableMembers() {
      return this.members.filter(member => {
        return !this.staffMembers.map(m => m.id).includes(member.id)
      })
    },
  },

  methods: {
    hydrate() {
      this.form.name = this.staff.name
      this.form.activated = this.staff.activated
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

    async loadStaffMembers() {
      this.staffMembers = await this.$axios.$get(
        `admin/staff/${this.$route.params.id}/members`
      )
    },

    async save() {
      try {
        await this.$axios.$put(`admin/staff/${this.staff.id}`, this.form)
        this.$toast.success('Staff saved!')
      } catch (e) {
        this.$toast.error('Something went wrong')
      }
    },

    // TODO: Cleanup event management
    updateMemberList(members) {
      this.staffMembers = members
    },

    refreshList({ id, update }) {
      const member = this.staffMembers.find(member => member.id === id)

      member.pivot_role = update.role
    },
  },
}
</script>
