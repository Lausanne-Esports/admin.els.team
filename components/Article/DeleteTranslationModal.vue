<template>
  <modal :open="open" @close="dismiss()">
    <h3 class="text-primary mb-8 pb-8 border-b border-primary">Êtes-vous sûr ?</h3>

    <p class="my-8">Voulez-vous vraiment supprimer cette traduction ?</p>

    <div class="flex items-center justify-center">
      <a class="text-primary mr-8" href="#" @click="dismiss()">Annuler</a>
      <a class="text-white bg-danger rounded-full py-2 px-4" href="#" @click="sendQuery()">Supprimer</a>
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
