<template>
  <div class="flex flex-col">
    <Heading>Update stream</Heading>
    <Spacer direction="b" :size="8" />

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex shadow items-center justify-center hover:bg-gray-200 transition rounded bg-white px-4 py-2 mr-4"
        to="/streams"
      >
        <Icon name="cheveron-left" class="h-8 mr-1" />
        <span>Back</span>
      </nuxt-link>

      <button
        class="inline-flex items-center shadow bg-blue-800 hover:bg-blue-900 transition rounded text-white px-4 py-2 mr-4"
        @click="save"
      >Sauvegarder</button>

      <button
        class="inline-flex shadow items-center text-red-600 hover:bg-gray-200 transition rounded bg-white px-4 py-2"
        @click="destroy"
      >Delete</button>
    </div>

    <Panel header="Information">
      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input label="Username" name="username" v-model="form.username"></base-input>
        </div>

        <div class="w-full mr-8">
          <base-input label="Twitch ID" name="twitch_id" v-model="form.twitch_id" disabled></base-input>
        </div>

        <div class="w-full">
          <base-input label="Display name" name="display_name" v-model="form.display_name" disabled></base-input>
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
      twitch_id: null,
      display_name: null,
    },
    stream: {},
  }),

  async created() {
    this.stream = await this.$axios.$get(
      `admin/streams/${this.$route.params.id}`
    )

    this.hydrate()
  },

  methods: {
    hydrate() {
      Object.keys(this.stream).forEach(key => {
        this.form[key] = this.stream[key]
      })
    },

    async save() {
      try {
        await this.$axios.$put(`admin/streams/${this.stream.id}`, this.form)
        this.$router.push('/streams')
        this.$toast.success('Stream saved !')
      } catch (e) {
        this.$toast.error('Une erreur est survenue')
      }
    },

    async destroy() {
      try {
        await this.$axios.$delete(`admin/streams/${this.stream.id}`)
        this.$router.push('/streams')
        this.$toast.success('Stream deleted !')
      } catch (e) {
        this.$toast.error('Une erreur est survenue')
      }
    },
  },
}
</script>

