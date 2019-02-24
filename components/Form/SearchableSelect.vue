<template>
  <div class="flex flex-col">
    <label class="text-neutral-500 mb-2" :for="name" v-if="label">{{ label }}</label>
    <searchable-select
      :name="name"
      :items="items"
      :value="value"
      @input="handleSelect"
    ></searchable-select>
  </div>
</template>

<script>
import SearchableSelect from '../Common/SearchableSelect'

export default {
  props: [
    'label',
    'name',
    'placeholder',
    'items',
    'value',
  ],

  components: { SearchableSelect },

  methods: {
    handleSelect (item) {
      this.$emit('input', item.id)
    }
  }
}
</script>

