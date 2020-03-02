<template>
  <div>
    <div class="flex justify-between">
      <div class="w-full mr-8">
        <searchable-select
          label="Member"
          name="member_id"
          :items="members"
          v-model="form.member_id"
        ></searchable-select>
      </div>

      <div class="w-full">
        <base-input label="Role" name="role" v-model="form.role"></base-input>
      </div>
    </div>
    <div class="inline-flex">
      <div class="flex items-center">
        <button
          class="inline-flex items-center shadow bg-blue-800 hover:bg-blue-900 transition rounded text-white px-4 py-2"
          @click="addMember"
        >Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/Form/BaseInput'
import SearchableSelect from '@/components/Form/SearchableSelect'

export default {
  props: ['members', 'staff'],

  components: { BaseInput, SearchableSelect },

  data: () => ({
    form: {
      member_id: null,
      role: null,
    },
  }),

  methods: {
    async addMember() {
      try {
        await this.$axios.$post(
          `admin/staff/${this.staff.id}/members`,
          this.form
        )
        this.$toast.success('Member added!')
        this.form = { member_id: null, role: null }
        this.$emit('submit')
      } catch (e) {
        console.log(e)
        this.$toast.error('Something went wrong')
      }
    },
  },
}
</script>
