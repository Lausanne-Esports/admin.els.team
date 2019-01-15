<template>
  <div class="flex flex-col">
    <h1 class="tracking-wide mb-8">Streams</h1>

    <div class="pb-4 mb-4">
      <nuxt-link
        class="flex w-1/4 shadow items-center justify-center bg-primary-light hover:bg-primary transition rounded-full text-white p-4"
        to="/streams/create"
      >Add stream</nuxt-link>
    </div>

    <panel>
      <div class="w-full">
        <table class="w-full border-collapse">
          <thead>
            <tr class="text-sm h-12 text-left uppercase text-primary-light">
              <th>
                <span class="flex items-center">Username</span>
              </th>
              <th>
                <span class="flex items-center">Url</span>
              </th>
              <th>
                <span class="flex items-center">Live</span>
              </th>
              <th>
                <span class="flex items-center">Actions</span>
              </th>
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
import Panel from '@/components/Layout/Panel'
import ListItem from '@/components/Stream/ListItem'

export default {
  layout: 'app',

  components: { ListItem, Panel },

  data: () => ({
    streams: [],
  }),

  async asyncData ({ $axios }) {
    const streams = await $axios.$get('admin/streams')

    return { streams }
  },

  computed: {
  }
}
</script>
