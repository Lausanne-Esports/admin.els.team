<template>
  <tr class="h-16 border-b border-neutral-200">
    <td>
      <a class="inline-flex items-center" :href="frontendUrl">
        <IconLink class="fill-current h-4 mr-2" />
        <span>{{ frenchTranslation.headline }}</span>
      </a>
    </td>
    <td>
      <span :class="`${stateStyle} px-3 py-1 rounded`">{{ stateText }}</span>
    </td>
    <td>{{ article.published_at }}</td>
    <td>{{ article.category.name }}</td>
    <td>
      <div class="inline-flex items-center">
        <nuxt-link
          class="inline-flex shadow items-center justify-center text-neutral-700 hover:bg-neutral-100 transition rounded h-10 w-10 bg-white mr-3"
          :to="generateEditLink(translation)"
          v-for="translation in article.translations"
          :key="translation.id"
        >
          {{ translation.language.code }}
        </nuxt-link>
        <nuxt-link
          class="inline-flex shadow items-center justify-center text-neutral-700 hover:bg-neutral-100 transition rounded h-10 w-10 bg-white mr-3"
          :to="addTranslationLink"
          v-if="article.translations.length < 2"
        >
          <IconAdd class="fill-current h-5" />
        </nuxt-link>
      </div>
    </td>
    <td>
      <div class="inline-flex item-centers">
        <nuxt-link
          class="inline-flex shadow items-center justify-center hover:bg-neutral-100 transition rounded h-10 w-10 text-neutral-700"
          :to="editArticleLink"
        >
          <IconEdit class="fill-current h-5" />
        </nuxt-link>
      </div>
    </td>
  </tr>
</template>

<script>
import IconAdd from '@/assets/icons/icon-add.svg'
import IconLink from '@/assets/icons/icon-link.svg'
import IconEdit from '@/assets/icons/icon-edit.svg'

export default {
  props: ['article'],

  components: { IconAdd, IconEdit, IconLink },

  computed: {
    stateStyle () {
      switch (this.frenchTranslation.state_id) {
        case 1:
          return 'bg-s-red-200 text-s-red-800'
        case 2:
          return 'bg-s-yellow-200 text-s-yellow-800'
        case 3:
          return 'bg-s-pink-200 text-s-pink-800'
        case 4:
          return 'bg-s-teal-200 text-s-teal-800'
      }

      return ''
    },

    stateText () {
      return this.$store.state.textStates[this.frenchTranslation.state_id]
    },

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
