<template>
  <div>
    <div class="flex items-center justify-between bg-darker-blue text-white h-16 px-8">
      <div>Lausanne eSports</div>
      <div>
        <span class="mr-4">{{ currentUser.username }}</span>
        <button class="text-white" @click="logout">Logout</button>
      </div>
    </div>
    <nuxt/>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  computed: {
    currentUser () { return this.$store.state.currentUser },
  },

  methods: {
    logout () {
      this.$store.dispatch('logout')
    },
  },
}
</script>

