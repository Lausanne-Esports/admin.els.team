<template>
  <div class="flex flex-col">
    <h1 class="mb-8">Articles</h1>

    <div class="pb-4 mb-4">
      <nuxt-link
        class="border rounded-full py-2 px-8 border-darker-blue mt-10 hover:bg-darker-blue hover:text-white transition"
        to="/articles/create"
      >Rédiger un article</nuxt-link>
    </div>

    <section class="p-8 bg-white shadow rounded-lg w-full">
    </section>
  </div>
</template>

<script>
export default {
  layout: 'app',
}
</script>
