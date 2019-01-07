<template>
  <div class="flex h-full">
    <sidebar></sidebar>

    <main class="w-5/6 px-4 py-4 overflow-scroll text-martinique">
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

