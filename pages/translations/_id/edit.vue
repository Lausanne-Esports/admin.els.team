<template>
  <div class="flex flex-col">
    <h1 class="tracking-wide mb-8">Modification de la traduction</h1>

    <div class="flex w-1/4 pb-4 mb-4">
      <nuxt-link
        class="flex w-1/4 shadow items-center justify-center text-primary-light hover:bg-white-blue-dark transition rounded-full bg-white p-4 mr-4"
        to="/articles"
      >Retour</nuxt-link>

      <button
        class="flex w-1/2 shadow items-center justify-center bg-primary-light hover:bg-primary transition rounded-full text-white p-4"
        :class="{ 'mr-4': translation && translation.language.code === 'en' }"
        @click="save"
      >Sauvegarder</button>

      <delete-translation-button
        :translation="translation"
        v-if="translation && translation.language.code === 'en'"
      ></delete-translation-button>
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
import DeleteTranslationButton from '@/components/Article/DeleteTranslationButton'

export default {
  layout: 'app',

  components: { BaseInput, DeleteTranslationButton, SearchableSelect },

  data: () => ({
    form: {
      headline: '',
      description: null,
      body: null,
      state_id: null,
    },
    articleStates: [],
    translation: null,
    errors: null,
  }),

  created () {
    this.$axios.$get('articles/states').then((response) => {
      this.articleStates = response
    })

    this.$axios.$get(`admin/translations/${this.$route.params.id}`).then((response) => {
      this.translation = response
      this.hydrate()
    })

  },

  computed: {
    slug () {
      return slug(this.form.headline)
    }
  },

  methods: {
    hydrate () {
      this.form.headline = this.translation.headline
      this.form.description = this.translation.description
      this.form.body = this.translation.body
      this.form.state_id = this.translation.state_id
    },

    async save () {
      try {
        await this.$axios.$put(`admin/translations/${this.translation.id}`, this.form)
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

