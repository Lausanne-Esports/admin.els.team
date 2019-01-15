<template>
  <div class="flex flex-col">
    <h1 class="tracking-wide mb-8">Add stream</h1>

    <div class="flex w-1/4 pb-4 mb-4">
      <nuxt-link
        class="flex w-1/4 shadow items-center justify-center text-primary-light hover:bg-white-blue-dark transition rounded-full bg-white p-4 mr-4"
        to="/streams"
      >Back</nuxt-link>

      <button
        class="flex w-1/2 shadow items-center justify-center bg-primary-light hover:bg-primary transition rounded-full text-white p-4"
        @click="save"
      >Save</button>
    </div>

    <section class="p-8 mb-8 bg-white shadow rounded-lg w-full">
      <header class="text-primary mb-8 pb-8 border-b border-primary">
        <h2>Information</h2>
      </header>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input
            label="Username"
            name="username"
            v-model="form.username"
          ></base-input>
        </div>
      </div>
    </section>
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
      twitch_id: null,
      display_name: null,
    },
  }),

  methods: {
    async save () {
      try {
        await this.$axios.$post('admin/streams', this.form)
        this.$router.push('/streams')
        this.$toast.success('Stream sauvegardé !')
      } catch (e) {
        this.$toast.error('Une erreur est survenue')
      }
    }
  }
}
</script>

