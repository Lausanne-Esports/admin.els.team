<template>
  <div class="flex items-center justify-center h-full gradient">
    <nuxt/>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
}
</script>

<style scoped>
.gradient {
  background: rgb(53,57,85);
  background: linear-gradient(45deg, rgba(53,57,85,1) 0%, rgba(53,57,85,.95) 100%);
}
</style>

