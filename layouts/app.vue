<template>
  <div class="relative h-full">
    <div class="flex items-center justify-between bg-darker-blue text-white h-16 px-8">
      <div>Lausanne eSports</div>
      <div>
        <span>{{ currentUser.username }}</span>
        <span class="mx-4">|</span>
        <button class="text-white" @click="logout">
          <i class="fa fa-sign-out-alt mr-1"></i>
          Logout
        </button>
      </div>
    </div>

    <div class="flex h-full">
      <nav class="flex flex-col px-4 h-full w-1/6 bg-light-blue-grey">
        <nuxt-link class="flex items-center border-b py-4 border-darker-blue" to="/">
          <svg class="fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM5.68 7.1A7.96 7.96 0 0 0 4.06 11H5a1 1 0 0 1 0 2h-.94a7.95 7.95 0 0 0 1.32 3.5A9.96 9.96 0 0 1 11 14.05V9a1 1 0 0 1 2 0v5.05a9.96 9.96 0 0 1 5.62 2.45 7.95 7.95 0 0 0 1.32-3.5H19a1 1 0 0 1 0-2h.94a7.96 7.96 0 0 0-1.62-3.9l-.66.66a1 1 0 1 1-1.42-1.42l.67-.66A7.96 7.96 0 0 0 13 4.06V5a1 1 0 0 1-2 0v-.94c-1.46.18-2.8.76-3.9 1.62l.66.66a1 1 0 0 1-1.42 1.42l-.66-.67zM6.71 18a7.97 7.97 0 0 0 10.58 0 7.97 7.97 0 0 0-10.58 0z"/></svg>
          Dashboard
        </nuxt-link>
        <nuxt-link class="flex items-center border-b py-4 border-darker-blue" to="/articles">
          <svg class="fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M18 21H7a4 4 0 0 1-4-4V5c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2h2a2 2 0 0 1 2 2v11a3 3 0 0 1-3 3zm-3-3V5H5v12c0 1.1.9 2 2 2h8.17a3 3 0 0 1-.17-1zm-7-3h4a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zm0-4h4a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zm0-4h4a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2zm9 11a1 1 0 0 0 2 0V7h-2v11z"/></svg>
          Articles
        </nuxt-link>
      </nav>
      <main class="p-4 w-full overflow-scroll bg-grey-lightest">
        <nuxt/>
      </main>
    </div>

    <portal-target name="modals">
    </portal-target>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

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

