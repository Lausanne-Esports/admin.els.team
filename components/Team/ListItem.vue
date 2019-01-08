<template>
  <tr class="h-16 border-b border-primary-lightest">
    <td>{{ team.name }}</td>
    <td>{{ team.category.name }} <small v-if="team.academy">(Académie)</small></td>
    <td>
      <div class="flex justify-center item-centers">
        <button
          class="flex shadow items-center justify-center text-primary-light hover:bg-white-blue-dark transition rounded-full h-10 w-10 bg-white"
          :class="{ 'mr-3': !last }"
          v-if="!first"
          @click="up"
        >
          <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M8.7 14.7a1 1 0 0 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L12 11.42l-3.3 3.3z"/></svg>
        </button>
        <button
          class="flex shadow items-center justify-center text-primary-light hover:bg-white-blue-dark transition rounded-full h-10 w-10 bg-white"
          v-if="!last"
          @click="down"
        >
          <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"/></svg>
        </button>
      </div>
    </td>
    <td>
      <div class="flex item-centers">
        <nuxt-link
          class="flex shadow items-center justify-center bg-primary-light hover:bg-primary transition rounded-full h-10 w-10 text-white"
          :to="editTeamLink"
        >
          <i class="fas fa-pen"></i>
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

