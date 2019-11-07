<template>
  <div class="flex items-center justify-center h-full bg-gray-900">
    <nuxt />
  </div>
</template>

<script>
export default {
  middleware: 'guest',
}
</script>
