<template>
  <tr class="h-16 border-b border-primary-lightest">
    <td>{{ frenchTranslation.headline }}</td>
    <td>{{ article.published_at }}</td>
    <td>{{ article.category.name }}</td>
    <td>
      <div class="flex items-center">
        <nuxt-link
          class="flex shadow items-center justify-center text-primary-light hover:bg-white-blue-dark transition rounded-full h-10 w-10 bg-white mr-3"
          :to="generateEditLink(translation)"
          v-for="translation in article.translations"
          :key="translation.id"
        >
          {{ translation.language.code }}
        </nuxt-link>
        <nuxt-link
          class="flex shadow items-center justify-center text-primary-light hover:bg-white-blue-dark transition rounded-full h-10 w-10 bg-white"
          :to="addTranslationLink"
          v-if="article.translations.length < 2"
        >
          <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/></svg>
        </nuxt-link>
      </div>
    </td>
    <td>
      <div class="flex item-centers">
        <button
          class="flex shadow items-center justify-center text-primary-light hover:bg-white-blue-dark transition rounded-full h-10 w-10 bg-white mr-3"
          @click="toggleFeatured"
        >
          <i class="fas fa-star" v-if="article.featured"></i>
          <i class="far fa-star" v-else></i>
        </button>
        <nuxt-link
          class="flex shadow items-center justify-center bg-primary-light hover:bg-primary transition rounded-full h-10 w-10 text-white mr-3"
          :to="editArticleLink"
        >
          <i class="fas fa-pen"></i>
        </nuxt-link>
        <a
          class="flex cursor-pointer shadow items-center justify-center text-primary-light hover:bg-white-blue-dark transition rounded-full h-10 w-10 text-white"
          target="_blank"
          :href="frontendUrl"
        >
          <i class="fas fa-link"></i>
        </a>
      </div>
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
    },

    frontendUrl () {
      return `${process.env.FRONTEND_URL}/articles/${this.article.id}`
    },
  },

  methods: {
    async toggleFeatured () {
      if (this.article.featured) {
        this.$toast.error('Cette article est déjà mis en avant!')
        return
      }

      try {
        await this.$axios.post(`admin/articles/${this.article.id}/featured`)
        this.article.featured = true
        this.$toast.success('Article mise en avant !')
      } catch (e) {
        this.$toast.error('Une erreur est survenue')
      }
    },

    generateEditLink (translation) {
      return `/translations/${translation.id}/edit`
    },
  },
}
</script>

