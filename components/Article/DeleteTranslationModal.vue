<template>
  <modal :open="open" @close="dismiss()">
    <h3 class="mb-8 pb-4  border-b border-primary">Êtes-vous sûr ?</h3>

    <p class="mb-16">Voulez-vous vraiment supprimer cette traduction ?</p>

    <div class="flex items-center justify-center">
      <button class="mr-8" @click="dismiss()">Annuler</button>
      <button class="text-white bg-s-red-600 rounded py-2 px-4" @click="sendQuery()">Supprimer</button>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Common/Modal'

export default {
  props: {
    open: { required: true },
    translation: { required: true },
  },

  components: { Modal },

  methods: {
    async sendQuery () {
      try {
        await this.$axios.$delete(`admin/translations/${this.translation.id}`)
        this.$toast.success('Traduction supprimée !')
        this.dismiss()
        this.$router.push('/articles')
      } catch (e) {
        console.log(e)
        this.$toast.error('Une erreur est survenue')
      }
    },

    dismiss () {
      this.$emit('close')
    }
  }
}
</script>
