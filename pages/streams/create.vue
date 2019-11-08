<template>
  <div class="flex flex-col">
    <h1 class="tracking-wider mb-8">Add stream</h1>

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex shadow items-center justify-center hover:bg-gray-200 transition rounded bg-white px-4 py-2 mr-4"
        to="/streams"
      >
        <Icon name="cheveron-left" class="h-8 mr-1" />
        <span>Back</span>
      </nuxt-link>

      <button
        class="inline-flex items-center shadow bg-blue-800 hover:bg-blue-900 transition rounded text-white px-4 py-2"
        @click="save"
      >Sauvegarder</button>
    </div>

    <Panel header="Information">
      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input label="Username" name="username" v-model="form.username"></base-input>
        </div>
      </div>
    </Panel>
  </div>
</template>

<script>
import BaseInput from '@/components/Form/BaseInput'

export default {
  layout: 'app',

  components: { BaseInput },

  data: () => ({
    form: {
      username: null,
    },
  }),

  methods: {
    async save() {
      try {
        await this.$axios.$post('admin/streams', this.form)
        this.$router.push('/streams')
        this.$toast.success('Stream sauvegardé !')
      } catch (e) {
        this.$toast.error('Une erreur est survenue')
      }
    },
  },
}
</script>

