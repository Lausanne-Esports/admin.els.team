<template>
  <Panel :header="year" :key="year">
    <template #tools>
      <BaseSelect
        label="Category"
        name="category_id"
        v-model="filteredByCategory"
      >
        <option value="0">All</option>
        <option
          :value="category.id"
          v-for="category in categories"
          :key="category.id"
          >{{ category.name }}</option
        >
      </BaseSelect>
    </template>

    <div class="w-full">
      <Draggable
        class="flex mb-4"
        v-model="localOrderByCategory"
        tag="ul"
        @update="computeCategoryOrder"
      >
        <li
          class="bg-white border border-gray-300 shadow hover:shadow-md rounded cursor-pointer py-2 px-4 mr-4"
          v-for="cat of localOrderByCategory"
          :key="cat.id"
        >
          {{ getCategoryNameById(cat.category_id) }}
        </li>
      </Draggable>

      <table class="w-full border-collapse">
        <thead>
          <tr class="text-sm h-12 text-left uppercase text-gray-500">
            <th>Result</th>
            <th>Event</th>
            <th>Winner Name</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <Draggable v-model="localResults" tag="tbody" @update="computeNewOrder">
          <ListItem
            v-for="award in awardByCategory"
            :key="award.id"
            :award="award"
          />
        </Draggable>
      </table>
    </div>
  </Panel>
</template>

<script>
import Draggable from 'vuedraggable'
import ListItem from '@/components/Award/ListItem.vue'
import BaseSelect from '@/components/Form/BaseSelect.vue'

export default {
  props: {
    year: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    categoryOrder: {
      type: Array,
      required: true,
    },
    results: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    localResults: [],
    localOrderByCategory: [],
    filteredByCategory: 0,
  }),

  components: {
    Draggable,
    ListItem,
    BaseSelect,
  },

  created() {
    this.localResults = [
      ...this.results.slice().sort((a, b) => a.order - b.order),
    ]

    this.localOrderByCategory = [
      ...this.categoryOrder.slice().sort((a, b) => a.order - b.order),
    ]
  },

  computed: {
    awardByCategory() {
      if (this.filteredByCategory == 0) {
        return this.localResults.slice()
      }

      return this.localResults.filter(
        award => award.category.id == this.filteredByCategory
      )
    },
  },

  methods: {
    getCategoryNameById(id) {
      return this.categories.find(c => c.id === id).name
    },

    computeNewOrder() {
      this.localResults = this.localResults.map((award, i) => ({
        ...award,
        order: i + 1,
      }))

      this.$emit('updateOrder', this.localResults)
    },

    computeCategoryOrder() {
      this.localOrderByCategory = this.localOrderByCategory.map(
        (category, i) => ({
          ...category,
          order: i + 1,
        })
      )

      this.$emit('updateCategoryOrder', this.localOrderByCategory)
    },
  },
}
</script>
