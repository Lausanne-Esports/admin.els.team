<template>
  <div class="flex flex-col">
    <h1 class="tracking-wider mb-8">Streams</h1>

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex items-center shadow bg-blue-800 hover:bg-blue-900 transition rounded text-white px-4 py-2"
        to="/streams/create"
      >
        <IconAdd class="fill-current h-8 mr-1" />
        <span>Add a Stream</span>
      </nuxt-link>
    </div>

    <panel>
      <div class="w-full">
        <table class="w-full border-collapse">
          <thead>
            <tr class="text-sm h-12 text-left uppercase text-gray-500">
              <th>Username</th>
              <th>Url</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <list-item v-for="stream in streams" :key="stream.id" :stream="stream"></list-item>
          </tbody>
        </table>
      </div>
    </panel>
  </div>
</template>

<script>
import IconAdd from '@/assets/icons/icon-add.svg'
import Panel from '@/components/Layout/Panel'
import ListItem from '@/components/Stream/ListItem'

export default {
  layout: 'app',

  components: { IconAdd, ListItem, Panel },

  data: () => ({
    streams: [],
  }),

  async asyncData({ $axios }) {
    const streams = await $axios.$get('admin/streams')

    return { streams }
  },
}
</script>
