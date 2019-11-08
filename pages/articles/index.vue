<template>
  <div class="flex flex-col">
    <h1 class="tracking-wider mb-8">Articles</h1>

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex items-center shadow bg-blue-800 hover:bg-blue-900 transition rounded text-white px-4 py-2"
        to="/articles/create"
      >
        <Icon name="add" class="h-5 mr-1" />
        <span>Write an Article</span>
      </nuxt-link>
    </div>

    <Panel>
      <div class="w-full">
        <search-input class="mb-4" name="search" placeholder="Search" v-model="filter" autofocus></search-input>

        <table class="w-full border-collapse">
          <thead>
            <tr class="text-sm h-12 text-left uppercase text-gray-500">
              <th>
                Headline
                <small>(FR)</small>
              </th>
              <th></th>
              <th>Release Date</th>
              <th>Category</th>
              <th>Languages</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <list-item v-for="article in filteredArticles" :key="article.id" :article="article"></list-item>
          </tbody>
        </table>
      </div>
    </Panel>
  </div>
</template>

<script>
import SearchInput from '@/components/Form/SearchInput'
import ListItem from '@/components/Article/ListItem'

export default {
  layout: 'app',

  components: {
    SearchInput,
    ListItem,
  },

  data: () => ({
    articles: [],
    filter: null,
  }),

  async asyncData({ $axios }) {
    const articles = await $axios.$get('admin/articles')

    return { articles }
  },

  computed: {
    filteredArticles() {
      if (!this.filter) {
        return this.articles
      }

      const filter = this.filter.toLowerCase()

      return this.articles.filter(article =>
        this.$getFrenchTranslation(article)
          .headline.toLowerCase()
          .includes(filter)
      )
    },
  },

  methods: {
    $getFrenchTranslation(article) {
      return article.translations.find(t => t.language.code === 'fr')
    },
  },
}
</script>
