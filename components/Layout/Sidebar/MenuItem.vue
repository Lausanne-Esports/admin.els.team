<template>
  <nuxt-link
    class="flex items-center py-4 px-8 hover:bg-gray-900 transition"
    :to="to"
  >
    <slot></slot>
  </nuxt-link>
</template>

<script>
export default {
  props: ['to']
}
</script>

