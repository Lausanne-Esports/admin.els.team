<template>
  <div :class="`flex flex-col ${nomargin ? '' : 'mb-6' }`">
    <label class="text-martinique mb-2" :for="name">{{ label }}</label>
    <input
      class="border border-martinique text-martinique h-12 rounded-lg px-4 mb-1"
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

<style scoped>
input::placeholder {
  color: #353955 !important;
}
</style>
