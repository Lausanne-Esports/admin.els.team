<template>
  <header class="flex items-center justify-end w-full h-16">
    <div class="flex items-center">
      <small class="tracking-wider mr-4">({{ currentUser.username }})</small>
      <button class="flex items-center tracking-wider" @click="logout">
        <LogoutIcon class="fill-current h-5 mr-1" />Sign Out
      </button>
    </div>
  </header>
</template>

<script>
import LogoutIcon from '@/assets/icons/icon-door-exit.svg'

export default {
  components: { LogoutIcon },

  computed: {
    currentUser() {
      return this.$store.state.currentUser
    },
  },

  methods: {
    async logout() {
      try {
        await this.$store.dispatch('logout')
        this.$router.push('/login')
      } catch (e) {}
    },
  },
}
</script>

