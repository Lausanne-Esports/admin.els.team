<template>
  <header class="flex items-center justify-end w-full h-16">
    <div class="flex items-center">
      <span class="tracking-wide mr-4">{{ currentUser.username }}</span>
      <button class="flex items-center tracking-wide" @click="logout">
        <i class="fa fa-sign-out-alt mr-1"></i>
        Sign Out
      </button>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    currentUser () { return this.$store.state.currentUser },
  },

  methods: {
    async logout () {
      try {
        await this.$store.dispatch('logout')
        this.$router.push('/login')
      } catch (e) {}
    },
  },
}
</script>

