<template>
  <div class="inline-flex items-center w-full">
    <label class="mb-2" :for="name">{{ label }}</label>
    <IconSearch class="fill-current h-8 mr-8" />
    <input
      class="border border-neutral-300 h-12 w-full rounded px-4"
      :id="name"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :autofocus="autofocus"
    >
  </div>
</template>

<script>
import IconSearch from '@/assets/icons/icon-search.svg'

export default {
  props: {
    label: {},
    name: {},
    type: { default: 'text' },
    placeholder: {},
    value: {},
    autofocus: { default: false },
    nomargin: { default: false },
  },

  components: { IconSearch }
}
</script>

<style lang="postcss" scoped>
svg .primary {
  @apply .text-neutral-200
}

input::placeholder {
  @apply .text-neutral-600
}
</style>
