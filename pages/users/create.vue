<template>
  <div class="flex flex-col">
    <Heading>Add a user</Heading>
    <Spacer direction="b" :size="8" />

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex shadow items-center justify-center hover:bg-gray-200 transition rounded bg-white px-4 py-2 mr-4"
        to="/users"
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
      <form @submit.prevent="save">
        <div class="flex justify-between">
          <div class="w-full mr-8">
            <base-input label="Username" name="username" v-model="form.username"></base-input>
          </div>

          <div class="w-full mr-8">
            <base-input label="Email" name="email" v-model="form.email"></base-input>
          </div>
        </div>

        <div class="flex justify-between">
          <div class="w-full mr-8">
            <base-input label="Password" name="password" type="password" v-model="form.password"></base-input>
          </div>

          <div class="w-full mr-8">
            <base-input
              label="Password Confirmation"
              name="password_confirmation"
              type="password"
              v-model="form.password_confirmation"
            ></base-input>
          </div>
        </div>
      </form>
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
      email: null,
      password: null,
      password_confirmation: null,
    },
  }),

  methods: {
    async save() {
      try {
        await this.$axios.$post('admin/users', this.form)
        this.$toast.success('User saved!')
        this.$router.push('/users')
      } catch (e) {
        this.$toast.error('Something went wrong')
      }
    },
  },
}
</script>

