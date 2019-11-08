<template>
  <div class="flex flex-col">
    <h1 class="tracking-wider mb-8">Users</h1>

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex items-center shadow bg-blue-800 hover:bg-blue-900 transition rounded text-white px-4 py-2"
        to="/users/create"
      >
        <Icon name="add" class="h-5 mr-1" />
        <span>Add a User</span>
      </nuxt-link>
    </div>

    <Panel>
      <table class="w-full border-collapse">
        <thead>
          <tr class="text-sm h-12 text-left uppercase text-gray-500">
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <list-item v-for="user in users" :key="user.id" :user="user"></list-item>
        </tbody>
      </table>
    </Panel>
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

  async asyncData({ $axios }) {
    const users = await $axios.$get('admin/users')

    return { users }
  },
}
</script>
