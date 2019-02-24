<template>
  <tr class="h-16 border-b border-primary-lightest">
    <td>{{ fullname }}</td>
    <td>{{ member.pivot.role }}</td>
    <td>
      <!-- <div class="flex justify-center item-centers">
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
      </div> -->
    </td>
    <td>
      <div class="flex item-centers">
        <button
          class="inline-flex text-s-red-600 shadow items-center justify-center hover:bg-neutral-100 transition rounded h-10 w-10 text-neutral-700"
          @click="deleteMember"
        >
          <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z"/></svg>
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
// TODO: Handle modification of role with modal

export default {
  props: ['first', 'last', 'member', 'team'],

  computed: {
    fullname () {
      return `${this.member.firstname || ''} "${this.member.nickname}" ${this.member.lastname || ''}`.trim()
    },
  },

  methods: {
    async deleteMember () {
      try {
        await this.$axios.$delete(`admin/teams/${this.team.id}/members/${this.member.id}`)
        this.$toast.success("Membre supprimé de l'équipe !")
        this.$emit('submit')
      } catch (e) {
        this.$toast.error('Une erreur est survenue')
      }
    },

    async up () {
      await this.$axios.$post(`admin/teams/${this.team.id}/members/${this.member.id}/up`)
      this.$emit('submit')
    },

    async down () {
      await this.$axios.$post(`admin/teams/${this.team.id}/members/${this.member.id}/down`)
      this.$emit('submit')
    },
  },
}
</script>

