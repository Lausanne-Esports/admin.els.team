<template>
  <div class="flex flex-col">
    <h1 class="tracking-wide mb-8">Update stream</h1>

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex shadow items-center justify-center hover:bg-neutral-200 transition rounded bg-white px-4 py-2 mr-4"
        to="/streams"
      >
        <BackIcon class="fill-current h-8 mr-1" />
        <span>Back</span>
      </nuxt-link>

      <button
        class="inline-flex items-center shadow bg-primary-800 hover:bg-primary-900 transition rounded text-white px-4 py-2 mr-4"
        @click="save"
      >Sauvegarder</button>

      <button
        class="inline-flex shadow items-center text-s-red-600 hover:bg-neutral-200 transition rounded bg-white px-4 py-2"
        @click="destroy"
      >Delete</button>
    </div>

    <section class="p-8 mb-8 bg-white shadow rounded w-full">
      <header class="mb-8 pb-4 border-b border-neutral-300">
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
import BackIcon from '@/assets/icons/icon-cheveron-left.svg'
import BaseInput from '@/components/Form/BaseInput'

export default {
  layout: 'app',

  components: { BackIcon, BaseInput },

  data: () => ({
    form: {
      username: null,
      twitch_id: null,
      display_name: null,
    },
    stream: {},
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
        this.$toast.success('Stream saved !')
      } catch (e) {
        this.$toast.error('Une erreur est survenue')
      }
    },

    async destroy () {
      try {
        await this.$axios.$delete(`admin/streams/${this.stream.id}`)
        this.$router.push('/streams')
        this.$toast.success('Stream deleted !')
      } catch (e) {
        this.$toast.error('Une erreur est survenue')
      }
    }
  },
}
</script>

