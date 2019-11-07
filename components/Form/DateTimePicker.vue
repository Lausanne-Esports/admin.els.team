<template>
  <div class="flex flex-col">
    <label class="text-gray-500 mb-2" :for="name">{{ label }}</label>

    <div class="flex">
      <div
        class="flex items-center justify-center bg-white h-12 border border-r-0 border-neutral-300 rounded-l px-4 cursor-pointer"
        @click="dateTimePicker.open()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path
            class="fill-current heroicon-ui"
            d="M17 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h2V3a1 1 0 1 1 2 0v1h6V3a1 1 0 0 1 2 0v1zm-2 2H9v1a1 1 0 1 1-2 0V6H5v4h14V6h-2v1a1 1 0 0 1-2 0V6zm4 6H5v8h14v-8z"
          />
        </svg>
      </div>
      <input
        ref="dateTimePicker"
        class="bg-white h-12 w-full border border-neutral-300 rounded-r px-4 mb-6"
        type="text"
        readonly
      />
    </div>
  </div>
</template>

<script>
import Flatpickr from 'flatpickr'
import {
  createComponent,
  onMounted,
  ref,
  onUnmounted,
} from '@vue/composition-api'

const DateTimePicker = createComponent({
  props: ['label', 'name', 'value', 'hasTime'],

  setup(props, ctx) {
    const dateTimePicker = ref(null)
    onMounted(() => {
      dateTimePicker.value = new Flatpickr(ctx.refs.dateTimePicker, {
        enableTime: props.hasTime,
        time_24hr: true,
        altFormat: props.hasTime ? 'd.m.Y H:i' : 'd.m.Y',
        altInput: true,
        defaultDate: props.value,
        onChange(_, date) {
          ctx.emit('input', date)
        },
      })
    })
    onUnmounted(() => {
      if (dateTimePicker.value) {
        dateTimePicker.value.destroy()
      }
    })

    return {
      dateTimePicker,
    }
  },
})

export default DateTimePicker
</script>
