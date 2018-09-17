<template>
  <section class="p-8 mb-8 bg-white shadow rounded-lg w-full">
    <header class="pb-4 mb-4 border-b border-darker-blue">
      <h2>Ajouter un membre</h2>
    </header>

    <div class="flex justify-between">
      <div class="w-full mr-8">
        <div class="flex flex-col">
          <label class="mb-2">Membre</label>
          <searchable-select
            :items="members"
            v-model="form.member_id"
          ></searchable-select>
        </div>
      </div>

      <div class="w-full">
        <div class="flex flex-col mr-8">
          <label class="mb-2">Rôle(s)</label>
          <input
            class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
            type="text"
            v-model="form.role"
          >
        </div>
      </div>

      <div class="flex items-center">
        <button
          class="border rounded-full py-2 px-8 border-darker-blue hover:bg-darker-blue hover:text-white transition"
          @click="addMember"
        >Ajouter</button>
      </div>
    </div>
  </section>
</template>

<script>
import SearchableSelect from '@/components/Common/SearchableSelect'

export default {
  props: ['members', 'team'],

  components: { SearchableSelect },

  data: () => ({
    form: {
      member_id: null,
      role: null,
    },
  }),

  async created () {

  },

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

