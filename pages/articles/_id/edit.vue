<template>
  <div class="flex flex-col">
    <h1 class="tracking-wide mb-8">Modification de l'article</h1>

    <div class="flex w-1/4 pb-4 mb-4">
      <nuxt-link
        class="flex w-1/4 shadow items-center justify-center text-primary-light hover:bg-white-blue-dark transition rounded-full bg-white p-4 mr-4"
        to="/articles"
      >Retour</nuxt-link>

      <button
        class="flex w-1/2 shadow items-center justify-center bg-primary-light hover:bg-primary transition rounded-full text-white p-4"
        @click="save"
      >Sauvegarder</button>
    </div>

    <section class="p-8 mb-8 bg-white shadow rounded-lg w-full">
      <header class="text-primary mb-8 pb-8 border-b border-primary">
        <h2>Meta-donnée</h2>
      </header>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <searchable-select
            label="Catégorie"
            name="category_id"
            :items="articleCategories"
            v-model="form.category_id"
          ></searchable-select>
        </div>

        <div class="w-full mr-8">
          <searchable-select
            label="Template"
            name="template_id"
            :items="articleTemplates"
            v-model="form.template_id"
          ></searchable-select>
        </div>

        <div class="w-full">
          <date-input
            label="Date de publication"
            name="published_at"
            :time="true"
            v-model="form.published_at"
          ></date-input>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input
            label="URL vignette"
            name="thumbnail"
            v-model="form.thumbnail"
          ></base-input>
        </div>

        <div class="w-full">
          <base-input
            label="URL vignette (mis en avant)"
            name="featured_thumbnail"
            v-model="form.featured_thumbnail"
          ></base-input>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import slug from '@slynova/slug'
import BaseInput from '@/components/Form/BaseInput'
import DateInput from '@/components/Form/DateInput'
import SearchableSelect from '@/components/Form/SearchableSelect'

export default {
  layout: 'app',

  components: { BaseInput, DateInput, SearchableSelect },

  data: () => ({
    form: {
      thumbnail: '',
      featured_thumbnail: '',
      published_at: null,
      template_id: 1,
      category_id: 1,
    },
    article: {},
    articleCategories: [],
    articleTemplates: [],
    errors: null,
  }),

  async created () {
    this.$axios.$get('articles/categories').then((response) => {
      this.articleCategories = response
    })

    this.$axios.$get('articles/templates').then((response) => {
      this.articleTemplates = response
    })

    this.article = await this.$axios.$get(`admin/articles/${this.$route.params.id}`)

    this.hydrate()
  },

  methods: {
    hydrate () {
      this.form.thumbnail = this.article.thumbnail
      this.form.featured_thumbnail = this.article.featured_thumbnail
      this.form.published_at = this.article.published_at
      this.form.template_id = this.article.template_id
      this.form.category_id = this.article.category_id
    },

    async save () {
      try {
        await this.$axios.$put(`admin/articles/${this.article.id}`, this.form)
        this.$toast.success('Article sauvegardé !')
      } catch (e) {
        console.log(e)
        this.errors = e.response.data.errors
        this.$toast.error('Une erreur est survenue')
      }
    }
  },
}
</script>

