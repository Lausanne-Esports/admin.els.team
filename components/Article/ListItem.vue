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
          <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/></svg>
        </a>
      </div>
    </td>
    <td>
      <a
        class="bg-dark-purple-blue mr-2 h-10 w-10 flex items-center justify-center rounded-full"
        :href="editArticleLink"
      >
        <svg class="text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z"/></svg>
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

