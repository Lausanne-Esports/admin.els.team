<template>
  <section
    :class="`shadow flex ${column ? 'flex-col' : ''} w-full bg-white text-gray-900 tracking-wider rounded mb-10 py-6 px-8`"
  >
    <slot></slot>
  </section>
</template>

<script>
export default {
  props: ['column'],
}
</script>

