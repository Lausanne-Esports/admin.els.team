<template>
  <tr class="h-16 border-b border-dark-purple-blue">
    <td>{{ frenchTranslation.headline }}</td>
    <td>{{ article.published_at }}</td>
    <td>{{ article.category.name }}</td>
    <td>
      <div class="flex items-center">
        <a
          class="bg-white border border-dark-purple-blue mr-2 h-10 w-10 flex items-center justify-center rounded-full"
          :href="generateEditLink(translation)"
          v-for="translation in article.translations"
          :key="translation.id"
        >
          {{ translation.language.code }}
        </a>
        <a
          class="bg-white border border-dark-purple-blue h-10 w-10 flex items-center justify-center rounded-full"
          :href="addTranslationLink"
          v-if="article.translations.length < 2"
        >
          <i class="fa fa-plus"></i>
        </a>
      </div>
    </td>
    <td>
      <a
        class="bg-dark-purple-blue mr-2 text-white h-10 w-10 flex items-center justify-center rounded-full"
        :href="editArticleLink"
      >
        <i class="fa fa-pen"></i>
      </a>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['article'],

  computed: {
    editArticleLink () {
      return `/articles/${this.article.id}/edit`
    },

    addTranslationLink () {
      return `/articles/${this.article.id}/translations/create`
    },

    frenchTranslation () {
      return this.article.translations.find(t => t.language.code === 'fr')
    }
  },

  methods: {
    generateEditLink (translation) {
      return `/translations/${translation.id}/edit`
    },
  },
}
</script>

