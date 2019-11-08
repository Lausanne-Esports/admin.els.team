<template>
  <div class="flex flex-col items-center text-white justify-center h-full bg-gray-900">
    <h1 class="text-5xl">Error {{ error.statusCode }}</h1>
    <p>{{ error.message }}</p>
    <nuxt-link
      class="w-1/4 font-bold text-center text-white p-4 mt-8 mb-6 bg-gray-800 hover:bg-gray-700 transition rounded uppercase"
      to="/"
    >Drive Me Home</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>
