<template>
  <table class="w-full border-collapse">
    <thead>
      <tr class="text-sm h-12 text-left uppercase text-gray-500">
        <th>Name</th>
        <th></th>
        <th>Roles</th>
        <th></th>
      </tr>
    </thead>
    <tbody v-if="members.length <= 0">
      <tr>
        <td>There's currently no member in this team</td>
      </tr>
    </tbody>
    <Draggable v-model="members" tag="tbody" @update="computeNewOrder">
      <ListItem
        v-for="(member, index) in members"
        :key="member.id"
        :member="member"
        :team="team"
        :first="index === 0"
        :last="lastItemIndex === index"
        @submit="$emit('submit')"
        @refreshList="refreshList"
      ></ListItem>
    </Draggable>
  </table>
</template>

<script>
import Draggable from 'vuedraggable'
import ListItem from '@/components/Team/TeamMemberListItem'

export default {
  props: ['members', 'team'],

  components: { Draggable, ListItem },

  computed: {
    lastItemIndex() {
      return Object.keys(this.members).length - 1
    },
  },

  methods: {
    async computeNewOrder() {
      const members = this.members.map((member, i) => ({
        ...member,
        order: i + 1,
      }))

      const newOrder = members.map(member => ({
        id: member.id,
        order: member.order,
      }))

      await this.$axios.$post(`admin/teams/${this.team.id}/members/order`, {
        order: newOrder,
      })
      this.$emit('updateMemberList', members)
    },

    refreshList() {
      this.$emit('refreshList', ...arguments)
    },
  },
}
</script>

