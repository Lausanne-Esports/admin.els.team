<template>
  <section class="p-8 mb-8 bg-white shadow rounded w-full">
    <header class="mb-8 pb-4 border-b border-neutral-300">
      <h2>Ajouter un membre</h2>
    </header>

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
        <base-input
          label="Rôle(s)"
          name="role"
          v-model="form.role"
        ></base-input>
      </div>

      <div class="flex items-center ml-8">
        <button
          class="inline-flex items-center shadow bg-primary-800 hover:bg-primary-900 transition rounded text-white px-4 py-2"
          @click="addMember"
        >Ajouter</button>
      </div>
    </div>
  </section>
</template>

<script>
import BaseInput from '@/components/Form/BaseInput'
import SearchableSelect from '@/components/Form/SearchableSelect'

export default {
  props: ['members', 'team'],

  components: { BaseInput, SearchableSelect },

  data: () => ({
    form: {
      member_id: null,
      role: null,
    },
  }),

  methods: {
    async addMember () {
      try {
        await this.$axios.$post(`admin/teams/${this.team.id}/members`, this.form)
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

