<template>
  <div class="flex flex-col">
    <h1 class="tracking mb-8">Utilisateurs</h1>

    <div class="pb-4 mb-4">
      <nuxt-link
        class="flex w-1/4 shadow items-center justify-center bg-primary-light hover:bg-primary transition rounded-full text-white p-4"
        to="/users/create"
      >Ajouter un utilisateur</nuxt-link>
    </div>

    <panel>
      <table class="w-full border-collapse">
        <thead>
          <tr class="text-sm h-12 text-left uppercase text-primary-light">
            <th>
              <span class="flex items-center">Nom d'utilisateur</span>
            </th>
            <th>
              <span class="flex items-center">Email</span>
            </th>
            <th>
              <span class="flex items-center">Status</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <list-item
            v-for="user in users"
            :key="user.id"
            :user="user"
          ></list-item>
        </tbody>
      </table>
    </panel>
  </div>
</template>

<script>
import Panel from '@/components/Layout/Panel'
import ListItem from '@/components/User/ListItem'

export default {
  layout: 'app',

  components: { Panel, ListItem },

  data: () => ({
    users: [],
  }),

  async asyncData ({ $axios }) {
    const users = await $axios.$get('admin/users')

    return { users }
  },
}
</script>
