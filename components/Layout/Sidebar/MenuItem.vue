<template>
  <nuxt-link
    class="flex items-center py-4 px-8 hover:bg-martinique-dark transition"
    :to="to"
  >
    <i :class="`fa fa-${icon} w-8`"></i>
    <slot></slot>
  </nuxt-link>
</template>

<script>
export default {
  props: ['to', 'icon']
}
</script>

