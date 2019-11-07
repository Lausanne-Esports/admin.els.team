<template>
  <span class="font-variant-numeric">{{ formatedTime }}</span>
</template>

<script>
import { createComponent } from '@vue/composition-api'
import { parseISO, format } from 'date-fns'

const DateTime = createComponent({
  name: 'DateTime',

  props: {
    format: {
      type: String,
      required: false,
      default: 'dd.MM.yyyy',
    },
    time: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const parsedDate = parseISO(props.time)
    const formatedTime = format(parsedDate, props.format)

    return { formatedTime }
  },
})

export default DateTime
</script>
