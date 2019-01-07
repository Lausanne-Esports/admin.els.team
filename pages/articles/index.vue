<template>
  <div class="flex flex-col">
    <h1 class="tracking-wide mb-8">Articles</h1>

    <div class="pb-4 mb-4">
      <nuxt-link
        class="flex w-1/4 shadow items-center justify-center bg-primary-light hover:bg-primary transition rounded-full text-white p-4"
        to="/articles/create"
      >Rédiger un article</nuxt-link>
    </div>

    <panel>
      <div class="w-full">
        <div class="flex w-full items-center mb-4">
          <svg class="text-martinique fill-current mr-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
          <search-input
            class="w-1/3"
            name="search"
            placeholder="Search"
            :nomargin="true"
            v-model="filter"
            autofocus
          ></search-input>
        </div>

        <table class="w-full border-collapse">
          <thead>
            <tr class="text-sm h-12 text-left uppercase text-primary-light">
              <th>
                <span class="flex items-center">Titre (FR)</span>
              </th>
              <th>
                <span class="flex items-center">Date de publication</span>
              </th>
              <th>
                <span class="flex items-center">Category</span>
              </th>
              <th>
                <span class="flex items-center">Langue(s)</span>
              </th>
              <th>
                <span class="flex items-center">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <list-item v-for="article in filteredArticles" :key="article.id" :article="article"></list-item>
          </tbody>
        </table>
      </div>
    </panel>
  </div>
</template>

<script>
import Panel from '@/components/Layout/Panel'
import SearchInput from '@/components/Form/SearchInput'
import ListItem from '@/components/Article/ListItem'

export default {
  layout: 'app',

  components: { SearchInput, ListItem, Panel },

  data: () => ({
    articles: [],
    filter: null,
  }),

  async asyncData ({ $axios }) {
    const articles = await $axios.$get('admin/articles')

    return { articles }
  },

  computed: {
    filteredArticles () {
      if (!this.filter) {
        return this.articles
      }

      const filter = this.filter.toLowerCase()

      return this.articles.filter(article => (
        this.$getFrenchTranslation(article).headline.toLowerCase().includes(filter)
      ))
    }
  },

  methods: {
    $getFrenchTranslation (article) {
      return article.translations.find(t => t.language.code === 'fr')
    }
  }
}
</script>
