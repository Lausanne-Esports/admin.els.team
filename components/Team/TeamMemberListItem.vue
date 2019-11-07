<template>
  <tr class="h-16 border-b border-neutral-200 cursor-pointer">
    <td>{{ fullname }}</td>
    <td>{{ member.pivot.role }}</td>
    <td>
      <div class="flex item-centers">
        <button class="relative outline-none relative text-neutral-500">
          <svg
            class="fill-current svg-right h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 26.6"
            @click="showDropdown = true"
          >
            <path
              d="M3.4 16.7c-1.9 0-3.4-1.5-3.4-3.4s1.5-3.4 3.4-3.4 3.4 1.5 3.4 3.4-1.5 3.4-3.4 3.4zm0-4.9c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.6-1.5-1.5-1.5zM15 16.7c-1.9 0-3.4-1.5-3.4-3.4s1.5-3.4 3.4-3.4 3.4 1.5 3.4 3.4-1.5 3.4-3.4 3.4zm0-4.9c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zM26.6 16.7c-1.9 0-3.4-1.5-3.4-3.4s1.5-3.4 3.4-3.4 3.4 1.5 3.4 3.4-1.5 3.4-3.4 3.4zm0-4.9c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5z"
            />
          </svg>

          <div v-if="showDropdown" class="fixed pin" @click="showDropdown = false"></div>

          <transition
            enter-active-class="transition-all transition-fastest ease-out-quad"
            leave-active-class="transition-all transition-faster ease-in-quad"
            enter-class="opacity-0 scale-70"
            enter-to-class="opacity-100 scale-100"
            leave-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-70"
          >
            <div
              v-show="showDropdown"
              class="origin-top-right border border-neutral-200 absolute w-48 right-0 rounded shadow bg-white mt-2 py-1 overflow-hidden z-30"
            >
              <ul class="list-reset">
                <li
                  class="hover:bg-primary-500 hover:text-white px-4 py-2 cursor-pointer transition"
                  @click="deleteMember"
                >Remove from the team</li>
              </ul>
            </div>
          </transition>
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
// TODO: Handle modification of role with modal

export default {
  props: ['first', 'last', 'member', 'team'],

  data: () => ({
    showDropdown: false,
  }),

  computed: {
    fullname() {
      return `${this.member.firstname || ''} "${this.member.nickname}" ${this
        .member.lastname || ''}`.trim()
    },
  },

  methods: {
    async deleteMember() {
      try {
        await this.$axios.$delete(
          `admin/teams/${this.team.id}/members/${this.member.id}`
        )
        this.$toast.success("Membre supprimé de l'équipe !")
        this.$emit('submit')
      } catch (e) {
        this.$toast.error('Une erreur est survenue')
      }
    },
  },
}
</script>

