<template functional>
  <section class="p-8 bg-white shadow rounded w-full">
    <header v-if="props.header" class="mb-8 pb-4 border-b border-neutral-300">
      <h2 class="text-2xl font-bold text-gray-900">{{ props.header }}</h2>
    </header>

    <slot />
  </section>
</template>

<script>
import { createComponent } from '@vue/composition-api'

const Panel = createComponent({
  name: 'Panel',
  props: {
    header: {
      type: String,
      required: false,
    },
  },
})

export default Panel
</script>
