<template>
  <div class="flex h-full">
    <sidebar></sidebar>

    <main class="flex-1 px-4 py-4 overflow-scroll text-gray-900">
      <navbar></navbar>
      <nuxt />
    </main>

    <portal-target name="modals"></portal-target>
  </div>
</template>

<script>
import Navbar from '@/components/Layout/Navbar'
import Sidebar from '@/components/Layout/Sidebar'

export default {
  middleware: 'auth',

  components: { Navbar, Sidebar },
}
</script>

