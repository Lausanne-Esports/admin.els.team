<template>
  <div class="flex flex-col">
    <Heading>Add a staff</Heading>
    <Spacer direction="b" :size="8" />

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex shadow items-center justify-center hover:bg-gray-200 transition rounded bg-white px-4 py-2 mr-4"
        to="/staff"
      >
        <Icon name="cheveron-left" class="h-8 mr-1" />
        <span>Back</span>
      </nuxt-link>

      <button
        class="inline-flex items-center shadow bg-blue-800 hover:bg-blue-900 transition rounded text-white px-4 py-2"
        @click="save"
      >Save</button>
    </div>

    <Panel header="Information">
      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input label="Name" name="name" v-model="form.name"></base-input>
        </div>
      </div>
      <div class="flex flex-col">
        <NewCheckbox label="Enabled" name="activated" v-model="form.activated" />
      </div>
    </Panel>
  </div>
</template>

<script>
import BaseInput from '@/components/Form/BaseInput'
import NewCheckbox from '@/components/Form/NewCheckbox'

export default {
  layout: 'app',

  components: { BaseInput, NewCheckbox },

  data: () => ({
    form: {
      name: null,
      activated: 0,
    },
  }),

  methods: {
    async save() {
      try {
        const staff = await this.$axios.$post('admin/staff', this.form)
        this.$router.push(`/staff/${staff.id}/edit`)
        this.$toast.success('Staff created!')
      } catch (e) {
        this.$toast.error('Something went wrong')
      }
    },
  },
}
</script>
