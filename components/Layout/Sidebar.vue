<template>
  <aside
    class="flex flex-col justify-between h-full text-white bg-gray-900 select-none"
  >
    <div class="flex flex-col">
      <nuxt-link class="align-center flex justify-center mt-8 mb-8" to="/">
        <img class="h-32" src="/logo-white.svg" alt="Lausanne Esports" />
      </nuxt-link>

      <span class="p-4 tracking-wider uppercase bg-gray-800">Main</span>
      <menu-item to="/" icon="chart-line">
        <Icon name="dashboard" class="h-6 mr-3" />Dashboard
      </menu-item>
      <menu-item to="/articles">
        <Icon name="news" class="h-6 mr-3" />Articles
      </menu-item>
      <menu-item to="/members">
        <Icon name="user-group" class="h-6 mr-3" />Members
      </menu-item>
      <menu-item to="/teams">
        <Icon name="layers" class="h-6 mr-3" />Teams
      </menu-item>
      <menu-item to="/staff">
        <Icon name="brick" class="h-6 mr-3" />Staff
      </menu-item>
      <menu-item to="/awards">
        <Icon name="trophy" class="h-6 mr-3" />Awards
      </menu-item>
      <menu-item to="/streams">
        <Icon name="videocam" class="h-6 mr-3" />Streams
      </menu-item>
      <menu-item to="/users">
        <Icon name="user-couple" class="h-6 mr-3" />Users
      </menu-item>
    </div>
    <div class="flex justify-center py-8">
      <small>v.20211003</small>
    </div>
  </aside>
</template>

<script>
import MenuItem from '@/components/Layout/Sidebar/MenuItem'

export default {
  components: {
    MenuItem,
  },
}
</script>

<style lang="postcss" scoped>
aside {
  min-width: 300px;
}

svg .primary {
  @apply .text-gray-500;
}
</style>
