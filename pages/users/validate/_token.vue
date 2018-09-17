<template>
  <h3 class="text-white">{{ message }}</h3>
</template>

<script>
export default {
  layout: 'auth',

  data: () => ({
    message: 'Validation en cours...'
  }),

  async created () {
    const token = this.$route.params.token

    try {
      await this.$axios.$post('users/validate', { token })
      // await this.$store.dispatch('getCurrentUser')
      this.$router.push('/login')
    } catch (e) {
      console.log(e)
      this.message = 'Validation échouée !'
    }
  }
}
</script>
