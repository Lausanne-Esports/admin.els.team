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
        <nuxt-link class="border-b py-4 border-darker-blue" to="/">
          <i class="fa fa-home mr-4"></i>
          Dashboard
        </nuxt-link>
        <nuxt-link class="border-b py-4 border-darker-blue" to="/articles">
          <i class="fa fa-newspaper mr-4"></i>
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

