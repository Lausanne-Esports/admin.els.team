<template>
  <div class="flex flex-col">
    <h1 class="mb-8">Membres</h1>

    <div class="pb-4 mb-4">
      <nuxt-link
        class="border rounded-full py-2 px-8 border-darker-blue hover:bg-darker-blue hover:text-white transition"
        to="/members/create"
      >Ajouter un membre</nuxt-link>
    </div>

    <section class="p-8 bg-white shadow rounded-lg w-full">
      <div class="flex mb-4 w-1/3">
        <div class="w-full flex flex-col">
          <label class="mb-2">Recherche</label>
          <input
            class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
            type="text"
            v-model="filter"
          >
        </div>
      </div>

      <table class="w-full border-collapse">
        <thead>
          <tr class="text-sm h-12 text-left uppercase text-dark-purple-blue">
            <th>
              <span class="flex items-center">Pseudo</span>
            </th>
            <th>
              <span class="flex items-center">Nom</span>
            </th>
            <th>
              <span class="flex items-center">Equipe(s)</span>
            </th>
            <th>
              <span class="flex items-center">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <list-item v-for="member in filteredMembers" :key="member.id" :member="member"></list-item>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import ListItem from '@/components/Member/ListItem'

export default {
  layout: 'app',

  components: { ListItem },

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
