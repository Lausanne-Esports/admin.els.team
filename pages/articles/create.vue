<template>
  <div class="flex flex-col">
    <h1 class="mb-8">Rédiger un article</h1>

    <div class="pb-4 mb-4">
      <nuxt-link
        class="border rounded-full py-2 px-8 mr-2 border-darker-blue hover:bg-darker-blue hover:text-white transition"
        to="/articles"
      >Retour</nuxt-link>

      <button
        class="border rounded-full py-2 px-8 hover:border-darker-blue bg-darker-blue text-white hover:bg-transparent hover:text-darker-blue transition"
        @click="save"
      >Sauvegarder</button>
    </div>

    <section class="p-8 mb-8 bg-white shadow rounded-lg w-full">
      <header class="pb-4 mb-4 border-b border-darker-blue">
        <h2>Meta-donnée</h2>
      </header>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">Catégorie</label>
            <searchable-select
              :items="articleCategories"
              v-model="form.category_id"
            ></searchable-select>
          </div>
        </div>

        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">Status</label>
            <searchable-select
              :items="articleStates"
              v-model="form.state_id"
            ></searchable-select>
          </div>
        </div>

        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">Template</label>
            <searchable-select
              :items="articleTemplates"
              v-model="form.template_id"
            ></searchable-select>
          </div>
        </div>

        <div class="w-full">
          <div class="flex flex-col">
            <label class="mb-2">Date de publication</label>
            <date-picker
              :time="true"
              v-model="form.published_at"
            ></date-picker>
          </div>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">URL vignette</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.thumbnail"
            >
          </div>
        </div>

        <div class="w-full">
          <div class="flex flex-col">
            <label class="mb-2">URL vignette (mis en avant)</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.featured_thumbnail"
            >
          </div>
        </div>
      </div>
    </section>

    <section class="p-8 bg-white shadow rounded-lg w-full">
      <header class="pb-4 mb-4 border-b border-darker-blue">
        <h2>Contenu</h2>
      </header>

      <div class="flex justify-between">
        <div class="flex flex-col w-full mr-8">
          <label class="mb-2">Titre</label>
          <input
            class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
            type="text"
            v-model="form.headline"
          >
        </div>

        <div class="flex flex-col w-full">
          <label class="mb-2">Slug</label>
          <input
            class="bg-grey-lightest text-darker-blue h-12 w-full rounded-lg px-4 mb-6 cursor-not-allowed"
            type="text"
            v-model="slug"
            disabled
          >
        </div>
      </div>

      <div class="flex flex-col w-full">
        <label class="mb-2">Description</label>
        <textarea
          class="bg-light-blue-grey text-darker-blue rounded-lg p-4 mb-6"
          rows="10"
          v-model="form.description"
        ></textarea>
      </div>

      <div class="flex flex-col w-full">
        <label class="mb-2">Contenu</label>
        <no-ssr>
          <markdown-editor
            class="text-darker-blue rounded-lg mb-6"
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
  import DatePicker from '@/components/Common/DatePicker'
  import SearchableSelect from '@/components/Common/SearchableSelect'

  export default {
    layout: 'app',

    components: { DatePicker, SearchableSelect },

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

    created () {
      this.$axios.$get('articles/categories').then((response) => {
        this.articleCategories = response
      })

      this.$axios.$get('articles/states').then((response) => {
        this.articleStates = response
      })

      this.$axios.$get('articles/templates').then((response) => {
        this.articleTemplates = response
      })
    },

    computed: {
      slug () {
        return slug(this.form.headline)
      },
    },

    methods: {
      async save () {
        try {
          await this.$axios.$post('admin/articles', this.form)
          this.$router.push('/articles')
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
