<template>
  <div class="flex flex-col">
    <h1 class="mb-8">Rédiger un article</h1>

    <div class="pb-4 mb-4">
      <nuxt-link
        class="border rounded-full py-2 px-8 border-darker-blue mt-10 hover:bg-darker-blue hover:text-white transition"
        to="/articles"
      >Back</nuxt-link>
    </div>

    <section class="p-8 bg-white shadow rounded-lg w-full">
      <header class="pb-4 mb-4 border-b border-darker-blue">
        <h2>Meta-donnée</h2>
      </header>

      <div class="flex flex-col">
        <label class="mb-2">Catégorie</label>
        <searchable-select
          :items="articleCategories"
          v-model="form.category_id"
        ></searchable-select>
      </div>
    </section>
  </div>
</template>

<script>
  import SearchableSelect from '@/components/Common/SearchableSelect'

  export default {
    layout: 'app',

    components: { SearchableSelect },

    data: () => ({
      form: {
        headline: null,
        description: null,
        body: null,
        template_id: 1,
        state_id: 1,
        category_id: 1,
        language_id: 1,
      },
      articleCategories: [],
    }),

    async created () {
      const articleCategories = await this.$axios.$get('articles/categories')
      this.articleCategories = articleCategories
    },
  }
</script>
