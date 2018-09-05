<template>
  <div class="flex items-center justify-center h-full bg-darker-blue">
    <nuxt/>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
}
</script>
