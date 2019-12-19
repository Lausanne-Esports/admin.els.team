<template>
  <div class="flex flex-col">
    <Heading>Add an Award</Heading>
    <Spacer direction="b" :size="8" />

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex shadow items-center justify-center hover:bg-gray-200 transition rounded bg-white px-4 py-2 mr-4"
        to="/awards"
      >
        <Icon name="cheveron-left" class="h-8 mr-1" />
        <span>Back</span>
      </nuxt-link>

      <button
        class="inline-flex items-center shadow bg-blue-800 hover:bg-blue-900 transition rounded text-white px-4 py-2"
        @click="save"
      >
        Save
      </button>
    </div>

    <Panel header="Information">
      <div class="flex justify-between">
        <div class="w-full mr-8">
          <BaseInput label="Result" name="result" v-model="form.result" />
        </div>
        <div class="w-full mr-8">
          <BaseInput label="Event" name="event" v-model="form.event_name" />
        </div>
        <div class="w-full mr-8">
          <BaseInput label="Lineup" name="lineup" v-model="form.lineup" />
        </div>
        <div class="w-full mr-8">
          <BaseInput label="Year" name="year" v-model="form.year" />
        </div>
        <div class="w-full mr-8">
          <SearchableSelect
            label="Category"
            name="category_id"
            :items="articleCategories"
            v-model="form.category_id"
          />
        </div>
      </div>
    </Panel>
  </div>
</template>

<script>
import BaseInput from '@/components/Form/BaseInput'
import SearchableSelect from '@/components/Form/SearchableSelect'

export default {
  layout: 'app',

  components: {
    BaseInput,
    SearchableSelect,
  },

  data: () => ({
    form: {
      result: '',
      event_name: '',
      lineup: '',
      year: '',
      category_id: 1,
    },
    articleCategories: [],
  }),

  created() {
    this.$axios.$get('teams/categories').then(response => {
      this.articleCategories = response
    })
  },

  methods: {
    async save() {
      try {
        await this.$axios.$post('admin/awards', this.form)
        this.$router.push('/awards')
        this.$toast.success('Award saved!')
      } catch (e) {
        console.log(e)
        this.errors = e.response.data.errors
        this.$toast.error('Something went wrong')
      }
    },
  },
}
</script>
