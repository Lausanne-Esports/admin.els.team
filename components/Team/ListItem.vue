<template>
  <tr class="h-16 border-b border-dark-purple-blue">
    <td>{{ team.name }}</td>
    <td>{{ team.category.name }}</td>
    <td>
      <div class="flex item-centers">
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
  props: ['team'],

  computed: {
    editTeamLink () {
      return `/teams/${this.team.id}/edit`
    }
  }
}
</script>

