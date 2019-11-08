<template>
  <div class="inline-flex items-center w-full">
    <label class="mb-2" :for="name">{{ label }}</label>
    <Icon name="search" class="h-8 mr-8" />
    <input
      class="border border-neutral-300 h-12 w-full rounded px-4"
      :id="name"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :autofocus="autofocus"
    />
  </div>
</template>

<script>
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
}
</script>

<style lang="postcss" scoped>
svg .primary {
  @apply .text-gray-200;
}

input::placeholder {
  @apply .text-gray-600;
}
</style>
