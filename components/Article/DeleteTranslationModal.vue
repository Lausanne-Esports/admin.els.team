<template>
  <modal :open="open" @close="dismiss()">
    <h3 class="mb-8 pb-4 border-b border-primary">Are you sure?</h3>

    <p class="mb-16">Do you really want to delete this translation?</p>

    <div class="flex items-center justify-center">
      <button class="mr-8" @click="dismiss()">Cancel</button>
      <button class="text-white bg-red-600 rounded py-2 px-4" @click="sendQuery()">Delete</button>
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
    async sendQuery() {
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

    dismiss() {
      this.$emit('close')
    },
  },
}
</script>
