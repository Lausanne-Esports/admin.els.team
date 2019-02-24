<template>
  <tr class="h-16 border-b border-neutral-200">
    <td>{{ member.nickname }}</td>
    <td>{{ fullname }}</td>
    <td>
      <nuxt-link
        class="inline-flex shadow items-center justify-center hover:bg-neutral-100 transition rounded h-10 w-10 text-neutral-700"
        :to="editMemberLink"
      >
        <IconEdit class="fill-current h-5" />
      </nuxt-link>
    </td>
  </tr>
</template>

<script>
import IconEdit from '@/assets/icons/icon-edit.svg'

export default {
  props: ['member'],

  components: { IconEdit, },

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

