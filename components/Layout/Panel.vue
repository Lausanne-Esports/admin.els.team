<template>
  <section :class="`shadow flex ${column ? 'flex-col' : ''} w-full bg-white text-neutral-900 tracking-wide rounded mb-10 py-6 px-8`">
    <slot></slot>
  </section>
</template>

<script>
export default {
  props: ['column'],
}
</script>

