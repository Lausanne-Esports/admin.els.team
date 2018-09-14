<template>
  <button
    class="border rounded-full py-2 px-8 text-red border-red hover:bg-red hover:text-white transition"
    @click="showModal = true"
  >
    Supprimer

    <portal to="modals" v-if="showModal">
      <delete-translation-modal :open="showModal" :translation="translation" @close="showModal = false"></delete-translation-modal>
    </portal>
  </button>
</template>

<script>
  import DeleteTranslationModal from './DeleteTranslationModal'

  export default  {
    props: ['translation'],

    components: { DeleteTranslationModal },

    data: () => ({
      showModal: false,
    }),
  }
</script>
