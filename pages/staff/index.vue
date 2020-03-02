<template>
  <div class="flex flex-col">
    <Heading>Staff</Heading>
    <Spacer direction="b" :size="8" />

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex items-center shadow bg-blue-800 hover:bg-blue-900 transition rounded text-white px-4 py-2"
        to="/staff/create"
      >
        <Icon name="add" class="h-5 mr-1" />
        <span>Add a Staff</span>
      </nuxt-link>
    </div>

    <Panel>
      <table class="w-full border-collapse">
        <thead>
          <tr class="text-sm h-12 text-left uppercase text-gray-500">
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <Draggable v-model="staff" tag="tbody" @update="computeNewOrder">
          <ListItem
            v-for="(currentStaff, index) in staff"
            :key="currentStaff.id"
            :staff="currentStaff"
            :first="index === 0"
            :last="lastItemIndex === index"
            @teamUpdated="loadStaff"
          />
        </Draggable>
      </table>
    </Panel>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import ListItem from '@/components/Staff/ListItem'

export default {
  layout: 'app',

  components: { Draggable, ListItem },

  data: () => ({
    staff: [],
  }),

  async asyncData({ $axios }) {
    const staff = await $axios.$get('admin/staff')

    return { staff }
  },

  computed: {
    lastItemIndex() {
      return Object.keys(this.staff).length - 1
    },
  },

  methods: {
    async loadStaff() {
      this.staff = await this.$axios.$get('admin/staff')
    },

    async computeNewOrder() {
      this.staff = this.staff.map((currentStaff, i) => ({
        ...currentStaff,
        order: i + 1,
      }))

      const newOrder = this.staff.map(currentStaff => ({
        id: currentStaff.id,
        order: currentStaff.order,
      }))

      await this.$axios.$post(`admin/staff/order`, { order: newOrder })
    },
  },
}
</script>
