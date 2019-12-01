<template>
  <div class="relative">
    <select
      :id="name"
      :name="name"
      :value="value"
      :tabindex="tabindex"
      :autofocus="autofocus"
      :disabled="disabled"
      @input="(e) => $emit('input', e.currentTarget.value)"
      :class="`min-w-32 appearance-none ${sizeClasses} w-full rounded bg-white px-4 outline-none ${disabled ? 'cursor-not-allowed opacity-75' : 'shadow cursor-pointer hover:shadow-md focus:shadow-md'} border border-gray-300`"
    >
      <slot />
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
    >
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    autofocus: {
      required: false,
      type: Boolean,
    },
    disabled: {
      required: false,
      type: Boolean,
    },
    name: {
      required: true,
      type: String,
    },
    type: {
      required: false,
      type: String,
      default: 'text',
    },
    size: {
      type: String,
      required: false,
      default: 'normal',
    },
    value: {
      required: true,
      type: [String, Number],
    },
    tabindex: {
      required: false,
      type: String,
    },
  },

  computed: {
    sizeClasses() {
      switch (this.size) {
        case 'small':
          return 'h-8'
        case 'normal':
        default:
          return 'h-12'
      }
    },
  },
}
</script>
