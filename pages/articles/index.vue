<template>
  <div class="flex flex-col">
    <h1 class="tracking-wide mb-8">Articles</h1>

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex items-center shadow bg-primary-800 hover:bg-primary-900 transition rounded text-white px-4 py-2"
        to="/articles/create"
      >
        <IconAdd class="fill-current h-8 mr-1" />
        <span>Rédiger un article</span>
      </nuxt-link>
    </div>

    <panel>
      <div class="w-full">
        <search-input
          class="mb-4"
          name="search"
          placeholder="Search"
          v-model="filter"
          autofocus
        ></search-input>

        <table class="w-full border-collapse">
          <thead>
            <tr class="text-sm h-12 text-left uppercase text-neutral-500">
              <th>
                Titre <small>(FR)</small>
              </th>
              <th></th>
              <th>
                Date de publication
              </th>
              <th>
                Category
              </th>
              <th>
                Langue(s)
              </th>
              <th>
                Actions
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
import IconAdd from '@/assets/icons/icon-add.svg'
import Panel from '@/components/Layout/Panel'
import SearchInput from '@/components/Form/SearchInput'
import ListItem from '@/components/Article/ListItem'

export default {
  layout: 'app',

  components: {
    IconAdd,
    SearchInput, ListItem, Panel
  },

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
