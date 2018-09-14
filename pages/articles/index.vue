<template>
  <div class="flex flex-col">
    <h1 class="mb-8">Articles</h1>

    <div class="pb-4 mb-4">
      <nuxt-link
        class="border rounded-full py-2 px-8 border-darker-blue hover:bg-darker-blue hover:text-white transition"
        to="/articles/create"
      >Rédiger un article</nuxt-link>
    </div>

    <section class="p-8 bg-white shadow rounded-lg w-full">
      <div class="flex w-full mb-4">

      </div>
      <table class="w-full border-collapse">
        <thead>
          <tr class="text-sm h-12 text-left uppercase text-dark-purple-blue">
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
          <list-item v-for="article in articles" :key="article.id" :article="article"></list-item>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import ListItem from '@/components/Article/ListItem'

export default {
  layout: 'app',

  components: { ListItem },

  data: () => ({
    articles: [],
  }),

  async asyncData ({ $axios }) {
    const articles = await $axios.$get('admin/articles')

    return { articles }
  }
}
</script>
