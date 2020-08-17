<template>
  <header class="flex items-center justify-end w-full h-16">
    <div v-if="currentUser" class="flex items-center">
      <small class="tracking-wider mr-4">({{ currentUser.username }})</small>
      <button class="flex items-center tracking-wider" @click="logout">
        <Icon name="door-exit" class="mono h-5 mr-1" />Sign Out
      </button>
    </div>
  </header>
</template>

<script>
export default {
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

