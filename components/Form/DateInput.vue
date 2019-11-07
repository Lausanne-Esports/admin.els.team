<template>
  <div class="flex flex-col">
    <label class="text-gray-500 mb-2" :for="name">{{ label }}</label>
    <date-picker
      :name="name"
      :placeholder="placeholder"
      :value="value"
      :time="time"
      :year-range="yearRange"
      :min-date="computeDate(minDate)"
      :max-date="computeDate(maxDate)"
      @input="handleSelection"
    ></date-picker>
  </div>
</template>

<script>
import moment from 'moment'
import DatePicker from '../Common/DatePicker'

export default {
  props: {
    label: {},
    name: {},
    type: { default: 'text' },
    placeholder: {},
    value: {},
    time: { default: false },
    yearRange: {},
    minDate: {},
    maxDate: {},
  },

  components: { DatePicker },

  methods: {
    computeDate (date) {
      return moment(date, 'DD.MM.YYYY').toDate()
    },

    handleSelection (date) {
      this.$emit('input', date)
    }
  },
}
</script>

