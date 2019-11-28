<template>
  <tr class="h-16 border-b border-neutral-200 cursor-pointer">
    <td>{{ team.name }}</td>
    <td>
      {{ team.category.name }}
      <small v-if="team.academy">(Académie)</small>
    </td>
    <td>
      <span v-if="!team.activated" class="bg-red-100 text-red-800 px-3 py-1 rounded">Archived</span>
    </td>
    <td>
      <div class="flex item-centers">
        <nuxt-link
          class="inline-flex shadow items-center justify-center hover:bg-gray-100 transition rounded h-10 w-10 text-gray-700"
          :to="editTeamLink"
        >
          <Icon name="edit" class="h-5" />
        </nuxt-link>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['first', 'last', 'team'],

  computed: {
    editTeamLink() {
      return `/teams/${this.team.id}/edit`
    },
  },
}
</script>

