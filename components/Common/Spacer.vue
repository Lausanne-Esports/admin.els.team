<template>
  <div :class="className" />
</template>

<script>
import { createComponent } from '@vue/composition-api'

const Spacer = createComponent({
  name: 'Spacer',

  props: {
    direction: {
      type: String,
      required: false,
    },
    size: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const classDirection = props.direction ? `${props.direction}-` : '-'
    const className = `m${classDirection}${props.size}`

    return { className }
  },
})

export default Spacer
</script>
