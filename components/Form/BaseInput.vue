<template>
  <div :class="`flex flex-col ${nomargin ? '' : 'mb-6' }`">
    <label class="text-neutral-500 mb-2" :for="name">{{ label }}</label>
    <input
      :class="`bg-white h-12 rounded border border-neutral-300 px-4 mb-1 ${disabled !== false ? 'cursor-not-allowed' : ''}`"
      :id="name"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :autofocus="autofocus"
      autocomplete="off"
      :disabled="disabled !== false"
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
    disabled: { default: false },
  },
}
</script>

