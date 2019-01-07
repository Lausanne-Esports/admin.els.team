<template>
  <div class="flex flex-col">
    <h1 class="tracking-wide mb-8">Ajouter une traduction</h1>

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

    <section class="p-8 bg-white shadow rounded-lg w-full">
      <div class="w-1/5">
        <searchable-select
          label="Status"
          name="state_id"
          :items="articleStates"
          v-model="form.state_id"
        ></searchable-select>
      </div>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input
            label="Titre"
            name="headline"
            v-model="form.headline"
          ></base-input>
        </div>

        <div class="w-full">
          <base-input
            label="Slug"
            name="slug"
            v-model="slug"
            disabled
          ></base-input>
        </div>
      </div>

      <div class="flex flex-col w-full">
        <label class="text-primary-lighter mb-2">Description</label>
        <textarea
          class="bg-black-lightest text-primary rounded-lg p-4 mb-6"
          rows="10"
          v-model="form.description"
        ></textarea>
      </div>

      <div class="flex flex-col w-full">
        <label class="text-primary-lighter mb-2">Contenu</label>
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
import BaseInput from '@/components/Form/BaseInput'
import SearchableSelect from '@/components/Form/SearchableSelect'

export default {
  layout: 'app',

  components: { BaseInput, SearchableSelect },

  data: () => ({
    form: {
      headline: '',
      description: null,
      body: null,
      state_id: null,
      language_id: 2,
    },
    articleStates: [],
    translation: {},
    errors: null,
  }),

  computed: {
    slug () {
      return slug(this.form.headline)
    }
  },

  created () {
    this.$axios.$get('articles/states').then((response) => {
      this.articleStates = response
    })
  },

  methods: {
    async save () {
      try {
        await this.$axios.$post(`admin/articles/${this.$route.params.id}/translations`, this.form)
        this.$toast.success('Traduction sauvegardée !')
      } catch (e) {
        console.log(e)
        this.errors = e.response.data.errors
        this.$toast.error('Une erreur est survenue')
      }
    }
  },
}
</script>

