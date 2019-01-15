<template>
  <div class="flex flex-col">
    <h1 class="tracking-wide mb-8">Update stream</h1>

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

        <div class="w-full mr-8">
          <base-input
            label="Twitch ID"
            name="twitch_id"
            v-model="form.twitch_id"
            disabled
          ></base-input>
        </div>

        <div class="w-full">
          <base-input
            label="Display name"
            name="display_name"
            v-model="form.display_name"
            disabled
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
    stream: {}
  }),

  async created () {
    this.stream = await this.$axios.$get(`admin/streams/${this.$route.params.id}`)

    this.hydrate()
  },

  methods: {
    hydrate () {
      Object.keys(this.stream).forEach((key) => {
        this.form[key] = this.stream[key]
      })
    },

    async save () {
      try {
        await this.$axios.$put(`admin/streams/${this.stream.id}`, this.form)
        this.$router.push('/streams')
        this.$toast.success('Stream sauvegardé !')
      } catch (e) {
        this.$toast.error('Une erreur est survenue')
      }
    }
  }
}
</script>

