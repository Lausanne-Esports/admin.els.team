<template>
  <div class="flex flex-col">
    <h1 class="tracking-wider mb-8">Write an article</h1>

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex shadow items-center justify-center hover:bg-gray-200 transition rounded bg-white px-4 py-2 mr-4"
        to="/articles"
      >
        <BackIcon class="fill-current h-8 mr-1" />
        <span>Back</span>
      </nuxt-link>

      <button
        class="inline-flex items-center shadow bg-blue-800 hover:bg-blue-900 transition rounded text-white px-4 py-2"
        @click="save"
      >Save</button>
    </div>

    <section class="p-8 mb-8 bg-white shadow rounded w-full">
      <header class="mb-8 pb-4 border-b border-neutral-300">
        <h2>Metadata</h2>
      </header>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <searchable-select
            label="Category"
            name="category_id"
            :items="articleCategories"
            v-model="form.category_id"
          ></searchable-select>
        </div>

        <div class="w-full mr-8">
          <searchable-select
            label="Status"
            name="state_id"
            :items="articleStates"
            v-model="form.state_id"
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
            label="Release Date"
            name="published_at"
            :time="true"
            v-model="form.published_at"
          ></date-input>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input label="Thumbnail URL" name="thumbnail" v-model="form.thumbnail"></base-input>
        </div>

        <div class="w-full">
          <base-input
            label="Featured Thumbnail URL"
            name="featured_thumbnail"
            v-model="form.featured_thumbnail"
          ></base-input>
        </div>
      </div>
    </section>

    <section class="p-8 bg-white shadow rounded w-full">
      <header class="mb-8 pb-4 border-b border-neutral-300">
        <h2>Content</h2>
      </header>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input label="Headline" name="headline" v-model="form.headline"></base-input>
        </div>
        <div class="w-full mr-8">
          <base-input label="Slug" name="slug" v-model="slug" disabled></base-input>
        </div>
      </div>

      <div class="flex flex-col w-full">
        <label class="text-gray-500 mb-2">Description</label>
        <textarea
          class="bg-white border border-neutral-300 rounded p-4 mb-6"
          rows="10"
          v-model="form.description"
        ></textarea>
      </div>

      <div class="flex flex-col w-full">
        <label class="text-gray-500 mb-2">Content</label>
        <no-ssr>
          <markdown-editor
            class="rounded mb-6"
            rows="30"
            v-model="form.body"
            :configs="{ spellChecker: false }"
          ></markdown-editor>
        </no-ssr>
      </div>
    </section>
  </div>
</template>

<script>
import slug from '@slynova/slug'
import BackIcon from '@/assets/icons/icon-cheveron-left.svg'
import BaseInput from '@/components/Form/BaseInput'
import DateInput from '@/components/Form/DateInput'
import SearchableSelect from '@/components/Form/SearchableSelect'

export default {
  layout: 'app',

  components: { BackIcon, BaseInput, DateInput, SearchableSelect },

  data: () => ({
    form: {
      headline: '',
      description: '',
      thumbnail: '',
      featured_thumbnail: '',
      body: '',
      published_at: null,
      template_id: 1,
      state_id: 1,
      category_id: 1,
      language_id: 1,
    },
    articleCategories: [],
    articleStates: [],
    articleTemplates: [],
    errors: [],
  }),

  created() {
    this.$axios.$get('articles/categories').then(response => {
      this.articleCategories = response
    })

    this.$axios.$get('articles/states').then(response => {
      this.articleStates = response
    })

    this.$axios.$get('articles/templates').then(response => {
      this.articleTemplates = response
    })
  },

  computed: {
    slug() {
      return slug(this.form.headline)
    },
  },

  methods: {
    async save() {
      try {
        await this.$axios.$post('admin/articles', this.form)
        this.$router.push('/articles')
        this.$toast.success('Article sauvegardé !')
      } catch (e) {
        console.log(e)
        this.errors = e.response.data.errors
        this.$toast.error('Une erreur est survenue')
      }
    },
  },
}
</script>
