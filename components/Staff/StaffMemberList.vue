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
        <td>There's currently no member in this staff</td>
      </tr>
    </tbody>
    <Draggable v-model="members" tag="tbody" @update="computeNewOrder">
      <ListItem
        v-for="(member, index) in members"
        :key="member.id"
        :member="member"
        :staff="staff"
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
import ListItem from '@/components/Staff/StaffMemberListItem'

export default {
  props: ['members', 'staff'],

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

      await this.$axios.$post(`admin/staff/${this.staff.id}/members/order`, {
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
