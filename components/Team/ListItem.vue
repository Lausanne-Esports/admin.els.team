<template>
  <tr class="h-16 border-b border-neutral-200 cursor-pointer">
    <td>{{ team.name }}</td>
    <td>
      {{ team.category.name }}
      <small v-if="team.academy">(Académie)</small>
    </td>
    <td>
      <div class="flex item-centers">
        <nuxt-link
          class="inline-flex shadow items-center justify-center hover:bg-neutral-100 transition rounded h-10 w-10 text-neutral-700"
          :to="editTeamLink"
        >
          <IconEdit class="fill-current h-5" />
        </nuxt-link>
      </div>
    </td>
  </tr>
</template>

<script>
import IconEdit from '@/assets/icons/icon-edit.svg'

export default {
  props: ['first', 'last', 'team'],

  components: { IconEdit },

  computed: {
    editTeamLink() {
      return `/teams/${this.team.id}/edit`
    },
  },
}
</script>

