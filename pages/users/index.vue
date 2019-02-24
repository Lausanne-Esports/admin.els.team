<template>
  <div class="flex flex-col">
    <h1 class="tracking mb-8">Users</h1>

        <div class="flex mb-8">
      <nuxt-link
        class="inline-flex items-center shadow bg-primary-800 hover:bg-primary-900 transition rounded text-white px-4 py-2"
        to="/users/create"
      >
        <IconAdd class="fill-current h-8 mr-1" />
        <span>Add a user</span>
      </nuxt-link>
    </div>

    <panel>
      <table class="w-full border-collapse">
        <thead>
          <tr class="text-sm h-12 text-left uppercase text-neutral-500">
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
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
import IconAdd from '@/assets/icons/icon-add.svg'
import Panel from '@/components/Layout/Panel'
import ListItem from '@/components/User/ListItem'

export default {
  layout: 'app',

  components: { IconAdd, Panel, ListItem },

  data: () => ({
    users: [],
  }),

  async asyncData ({ $axios }) {
    const users = await $axios.$get('admin/users')

    return { users }
  },
}
</script>
