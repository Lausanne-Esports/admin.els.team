<template>
  <div>
    <div class="flex justify-between">
      <div class="w-full mr-8">
        <searchable-select
          label="Membre"
          name="member_id"
          :items="members"
          v-model="form.member_id"
        ></searchable-select>
      </div>

      <div class="w-full">
        <base-input label="Rôle(s)" name="role" v-model="form.role"></base-input>
      </div>
    </div>
    <div class="inline-flex">
      <NewCheckbox label="Academy" v-model="form.academy" />

      <div class="flex items-center ml-8">
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
import NewCheckbox from '@/components/Form/NewCheckbox'
import SearchableSelect from '@/components/Form/SearchableSelect'

export default {
  props: ['members', 'team'],

  components: { BaseInput, NewCheckbox, SearchableSelect },

  data: () => ({
    form: {
      member_id: null,
      role: null,
      academy: 0,
    },
  }),

  methods: {
    async addMember() {
      try {
        await this.$axios.$post(
          `admin/teams/${this.team.id}/members`,
          this.form
        )
        this.$toast.success('Membre ajouté !')
        this.form = { member_id: null, role: null }
        this.$emit('submit')
      } catch (e) {
        this.$toast.error('Une erreur est survenue')
      }
    },
  },
}
</script>

