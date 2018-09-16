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
      <div class="flex w-full mb-4">

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
          <list-item v-for="member in members" :key="member.id" :member="member"></list-item>
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
  }),

  async asyncData ({ $axios }) {
    const members = await $axios.$get('admin/members')

    return { members }
  },
}
</script>
