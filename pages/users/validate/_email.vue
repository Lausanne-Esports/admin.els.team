<template>
  <h3 class="text-white">{{ message }}</h3>
</template>

<script>
export default {
  layout: 'auth',

  data: () => ({
    message: 'Validation en cours...'
  }),

  async created() {
    const email = this.$route.params.email
    const signature = this.$route.query.signature

    try {
      await this.$axios.$get(`users/validate/${email}?signature=${signature}`)
      this.message = 'Compte validé avec succès. Redirection...'
      setTimeout(() => {
        this.$router.push('/login')
      }, 1500)
    } catch (e) {
      console.log(e)
      this.message = 'Validation échouée !'
    }
  }
}
</script>
