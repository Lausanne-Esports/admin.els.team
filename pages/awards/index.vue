<template>
  <div class="flex flex-col">
    <Heading>Awards</Heading>
    <Spacer direction="b" :size="8" />

    <div class="flex mb-8">
      <NuxtLink
        class="inline-flex items-center shadow bg-blue-800 hover:bg-blue-900 transition rounded text-white px-4 py-2"
        to="/awards/create"
      >
        <Icon name="add" class="h-5 mr-1" />
        <span>Add an Award</span>
      </NuxtLink>
    </div>

    <template v-for="year in years">
      <YearPanel
        :year="year"
        :categories="categories"
        :key="year"
        :categoryOrder="categoryOrderByYear[year]"
        :results="resultPerYear[year]"
        @updateOrder="computeNewOrder"
        @updateCategoryOrder="computeNewCategoryOrder"
      />

      <Spacer direction="b" :size="8" :key="`${year}-spacer`" />
    </template>
  </div>
</template>

<script>
import YearPanel from '@/components/Award/YearPanel.vue'

export default {
  layout: 'app',

  components: {
    YearPanel,
  },

  data: () => ({
    awards: [],
    categories: [],
    categoryOrderByYear: [],
    resultPerYear: {},
  }),

  async created() {
    const [awards, categories, categoryOrderByYear] = await Promise.all([
      this.$axios.$get('awards'),
      this.$axios.$get('teams/categories'),
      this.$axios.$get('awards/categories/order'),
    ])

    this.awards = awards
    this.categories = categories
    this.categoryOrderByYear = categoryOrderByYear.reduce((agg, order) => {
      if (!agg[order.year]) {
        agg[order.year] = []
      }

      agg[order.year].push(order)

      return agg
    }, {})

    this.resultPerYear = this.awards.reduce((agg, award) => {
      if (!agg[award.year]) {
        agg[award.year] = []
      }

      agg[award.year].push(award)

      return agg
    }, {})
  },

  computed: {
    years() {
      return Object.keys(this.resultPerYear).sort(
        (a, b) => Number(b) - Number(a)
      )
    },
  },

  methods: {
    async computeNewOrder(awards) {
      const newOrder = awards.map(award => ({
        id: award.id,
        order: award.order,
      }))

      await this.$axios.$post(`admin/awards/order`, { order: newOrder })
    },

    async computeNewCategoryOrder(categories) {
      this.$axios.$post('admin/awards/categories/order', { categories })
    },
  },
}
</script>
