<template>
  <button
    class="flex w-1/4 shadow items-center justify-center text-danger hover:bg-white-blue-dark transition rounded-full bg-white p-4 mr-4"
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
