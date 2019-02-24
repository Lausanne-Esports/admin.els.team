<template>
  <div class="flex items-center justify-center h-full bg-neutral-1000">
    <nuxt/>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
}
</script>
