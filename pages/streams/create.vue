<template>
  <div class="flex flex-col">
    <h1 class="tracking-wider mb-8">Add stream</h1>

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex shadow items-center justify-center hover:bg-gray-200 transition rounded bg-white px-4 py-2 mr-4"
        to="/streams"
      >
        <BackIcon class="fill-current h-8 mr-1" />
        <span>Back</span>
      </nuxt-link>

      <button
        class="inline-flex items-center shadow bg-blue-800 hover:bg-blue-900 transition rounded text-white px-4 py-2"
        @click="save"
      >Sauvegarder</button>
    </div>

    <section class="p-8 mb-8 bg-white shadow rounded w-full">
      <header class="mb-8 pb-4 border-b border-neutral-300">
        <h2>Information</h2>
      </header>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input label="Username" name="username" v-model="form.username"></base-input>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BackIcon from '@/assets/icons/icon-cheveron-left.svg'
import BaseInput from '@/components/Form/BaseInput'

export default {
  layout: 'app',

  components: { BackIcon, BaseInput },

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

