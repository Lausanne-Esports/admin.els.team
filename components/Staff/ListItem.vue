<template>
  <tr class="h-16 border-b border-neutral-200 cursor-pointer">
    <td>{{ staff.name }}</td>
    <td>
      <span v-if="!staff.activated" class="bg-red-100 text-red-800 px-3 py-1 rounded">Archived</span>
    </td>
    <td>
      <div class="flex item-centers">
        <nuxt-link
          class="inline-flex shadow items-center justify-center hover:bg-gray-100 transition rounded h-10 w-10 text-gray-700"
          :to="editStaffLink"
        >
          <Icon name="edit" class="h-5" />
        </nuxt-link>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['first', 'last', 'staff'],

  computed: {
    editStaffLink() {
      return `/staff/${this.staff.id}/edit`
    },
  },
}
</script>
