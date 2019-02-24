<template>
  <div class="flex flex-col">
    <h1 class="tracking-wide mb-8">Members</h1>

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex items-center shadow bg-primary-800 hover:bg-primary-900 transition rounded text-white px-4 py-2"
        to="/members/create"
      >
        <IconAdd class="fill-current h-8 mr-1" />
        <span>Add a Member</span>
      </nuxt-link>
    </div>

    <panel>
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
            <tr class="text-sm h-12 text-left uppercase text-neutral-500">
              <th>
                Pseudo
              </th>
              <th>
                Name
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <list-item v-for="member in filteredMembers" :key="member.id" :member="member"></list-item>
          </tbody>
        </table>
      </div>
    </panel>
  </div>
</template>

<script>
import IconAdd from '@/assets/icons/icon-add.svg'
import Panel from '@/components/Layout/Panel'
import SearchInput from '@/components/Form/SearchInput'
import ListItem from '@/components/Member/ListItem'

export default {
  layout: 'app',

  components: { IconAdd, ListItem, Panel, SearchInput },

  data: () => ({
    members: [],
    filter: null,
  }),

  async asyncData ({ $axios }) {
    const members = await $axios.$get('admin/members')

    return { members }
  },

  computed: {
    filteredMembers () {
      if (!this.filter) {
        return this.members
      }

      const filter = this.filter.toLowerCase()

      return this.members.filter(member => (
        member.nickname && member.nickname.toLowerCase().includes(filter)
        || member.firstname && member.firstname.toLowerCase().includes(filter)
        || member.lastname && member.lastname.toLowerCase().includes(filter)
      ))
    }
  }
}
</script>
