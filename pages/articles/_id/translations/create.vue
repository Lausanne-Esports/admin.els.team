<template>
  <div class="flex flex-col">
    <h1 class="mb-8">Ajouter une traduction</h1>

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

    <section class="p-8 bg-white shadow rounded-lg w-full">
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
          ></markdown-editor>
        </no-ssr>
      </div>
    </section>
  </div>
</template>

<script>
import slug from '@slynova/slug'

export default {
  layout: 'app',

  data: () => ({
    form: {
      headline: '',
      description: null,
      body: null,
      language_id: 2,
    },
    translation: {},
    errors: null,
  }),

  computed: {
    slug () {
      return slug(this.form.headline)
    }
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

