<template>
  <div class="flex flex-col">
    <h1 class="mb-8">Ajouter une traduction</h1>

    <div class="pb-4 mb-4">
      <nuxt-link
        class="border rounded-full py-2 px-8 mr-2 border-darker-blue hover:bg-darker-blue hover:text-white transition"
        to="/articles"
      >Retour</nuxt-link>

      <button
        class="border rounded-full py-2 px-8 hover:border-darker-blue bg-darker-blue text-white hover:bg-transparent hover:text-darker-blue transition"
        @click="save"
      >Sauvegarder</button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'app',

}
</script>

