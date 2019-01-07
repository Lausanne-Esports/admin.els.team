<template>
  <tr class="h-16 border-b border-primary-lightest">
    <td>{{ member.nickname }}</td>
    <td>{{ fullname }}</td>
    <td></td>
    <td>
      <nuxt-link
        class="flex shadow items-center justify-center bg-primary-light hover:bg-primary transition rounded-full h-10 w-10 text-white"
        :to="editMemberLink"
      >
        <i class="fas fa-pen"></i>
      </nuxt-link>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['member'],

  computed: {
    editMemberLink () {
      return `/members/${this.member.id}/edit`
    },

    fullname () {
      return `${this.member.firstname || ''} ${this.member.lastname || ''}`.trim()
    },
  },
}
</script>

