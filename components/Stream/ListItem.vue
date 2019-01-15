<template>
  <tr class="h-16 border-b border-primary-lightest">
    <td>{{ stream.username }}</td>
    <td><a :href="url" target="_blank">twitch.tv/{{ stream.username }}</a></td>
    <td>{{ stream.is_live }}</td>
    <td>
      <nuxt-link
        class="flex shadow items-center justify-center bg-primary-light hover:bg-primary transition rounded-full h-10 w-10 text-white"
        :to="editStreamLink"
      >
        <i class="fas fa-pen"></i>
      </nuxt-link>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['stream'],

  computed: {
    url() {
      return `https://www.twitch.tv/${this.stream.username}`;
    },
    editStreamLink () {
      return `/streams/${this.stream.id}/edit`
    },
  },
}
</script>
