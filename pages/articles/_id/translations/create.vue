<template>
  <div class="flex flex-col">
    <Heading>Add a translation</Heading>
    <Spacer direction="b" :size="8" />

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex shadow items-center justify-center hover:bg-gray-200 transition rounded bg-white px-4 py-2 mr-4"
        to="/articles"
      >
        <Icon name="cheveron-left" class="h-8 mr-1" />
        <span>Back</span>
      </nuxt-link>

      <button
        class="inline-flex items-center shadow bg-blue-800 hover:bg-blue-900 transition rounded text-white px-4 py-2"
        @click="save"
      >Save</button>
    </div>

    <Panel>
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
          <base-input label="Headline" name="headline" v-model="form.headline"></base-input>
        </div>

        <div class="w-full">
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
    </Panel>
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
    slug() {
      return slug(this.form.headline)
    },
  },

  created() {
    this.$axios.$get('articles/states').then(response => {
      this.articleStates = response
    })
  },

  methods: {
    async save() {
      try {
        await this.$axios.$post(
          `admin/articles/${this.$route.params.id}/translations`,
          this.form
        )
        this.$toast.success('Traduction sauvegardée !')
      } catch (e) {
        console.log(e)
        this.errors = e.response.data.errors
        this.$toast.error('Une erreur est survenue')
      }
    },
  },
}
</script>

