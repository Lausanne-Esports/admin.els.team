<template>
  <tr class="h-16 border-b border-dark-purple-blue">
    <td>{{ team.name }}</td>
    <td>{{ team.category.name }} <small v-if="team.academy">(Académie)</small></td>
    <td>
      <div class="flex justify-center item-centers">
        <button
          class="border border-dark-purple-blue mr-2 h-10 w-10 flex items-center justify-center rounded-full"
          v-if="!first"
          @click="up"
        >
          <svg class="text-dark-purple-blue fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M8.7 14.7a1 1 0 0 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L12 11.42l-3.3 3.3z"/></svg>
        </button>
        <button
          class="border border-dark-purple-blue mr-2 h-10 w-10 flex items-center justify-center rounded-full"
          v-if="!last"
          @click="down"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"/></svg>
        </button>
      </div>
    </td>
    <td>
      <div class="flex justify-center item-centers">
        <nuxt-link
          class="bg-dark-purple-blue mr-2 h-10 w-10 flex items-center justify-center rounded-full"
          :to="editTeamLink"
        >
          <svg class="text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z"/></svg>
        </nuxt-link>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['first', 'last', 'team'],

  computed: {
    editTeamLink () {
      return `/teams/${this.team.id}/edit`
    }
  },

  methods: {
    async up () {
      await this.$axios.$post(`admin/teams/${this.team.id}/up`)
      this.$emit('teamUpdated')
    },

    async down () {
      await this.$axios.$post(`admin/teams/${this.team.id}/down`)
      this.$emit('teamUpdated')
    },
  },
}
</script>

