<template>
  <div class="flex flex-col">
    <Heading>Members</Heading>
    <Spacer direction="b" :size="8" />

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex items-center shadow bg-blue-800 hover:bg-blue-900 transition rounded text-white px-4 py-2"
        to="/members/create"
      >
        <Icon name="add" class="h-5 mr-1" />
        <span>Add a Member</span>
      </nuxt-link>
    </div>

    <Panel>
      <div class="w-full">
        <search-input
          class="mb-4"
          name="search"
          placeholder="Search"
          :nomargin="true"
          v-model="filter"
          autofocus
        ></search-input>

        <table class="w-full border-collapse">
          <thead>
            <tr class="text-sm h-12 text-left uppercase text-gray-500">
              <th>Pseudo</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <list-item v-for="member in filteredMembers" :key="member.id" :member="member"></list-item>
          </tbody>
        </table>
      </div>
    </Panel>
  </div>
</template>

<script>
import SearchInput from '@/components/Form/SearchInput'
import ListItem from '@/components/Member/ListItem'

export default {
  layout: 'app',

  components: { ListItem, SearchInput },

  data: () => ({
    members: [],
    filter: null,
  }),

  async asyncData({ $axios }) {
    const members = await $axios.$get('admin/members')

    return { members }
  },

  computed: {
    filteredMembers() {
      if (!this.filter) {
        return this.members
      }

      const filter = this.filter.toLowerCase()

      return this.members.filter(
        member =>
          (member.nickname && member.nickname.toLowerCase().includes(filter)) ||
          (member.firstname &&
            member.firstname.toLowerCase().includes(filter)) ||
          (member.lastname && member.lastname.toLowerCase().includes(filter))
      )
    },
  },
}
</script>
