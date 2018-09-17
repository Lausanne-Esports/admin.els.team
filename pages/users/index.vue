<template>
  <div class="flex flex-col">
    <h1 class="mb-8">Utilisateurs</h1>

    <div class="pb-4 mb-4">
      <nuxt-link
        class="border rounded-full py-2 px-8 border-darker-blue hover:bg-darker-blue hover:text-white transition"
        to="/users/create"
      >Ajouter un utilisateur</nuxt-link>
    </div>

    <section class="p-8 bg-white shadow rounded-lg w-full">
      <table class="w-full border-collapse">
        <thead>
          <tr class="text-sm h-12 text-left uppercase text-dark-purple-blue">
            <th>
              <span class="flex items-center">Nom d'utilisateur</span>
            </th>
            <th>
              <span class="flex items-center">Email</span>
            </th>
            <th>
              <span class="flex items-center">Status</span>
            </th>
            <th>
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
    </section>
  </div>
</template>

<script>
import ListItem from '@/components/User/ListItem'

export default {
  layout: 'app',

  components: { ListItem },

  data: () => ({
    users: [],
  }),

  async asyncData ({ $axios }) {
    const users = await $axios.$get('admin/users')

    return { users }
  },
}
</script>
