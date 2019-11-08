<template>
  <aside class="text-white h-full flex flex-col justify-between bg-gray-900 select-none">
    <div class="flex flex-col">
      <nuxt-link class="flex mt-8 mb-8 align-center justify-center" to="/">
        <LausanneLogo class="h-32" />
      </nuxt-link>

      <span class="tracking-wider uppercase bg-gray-800 p-4">Main</span>
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
      <menu-item to="/streams">
        <Icon name="videocam" class="h-6 mr-3" />Streams
      </menu-item>
      <menu-item to="/users">
        <Icon name="user-couple" class="h-6 mr-3" />Users
      </menu-item>
    </div>
    <div class="flex justify-center py-8">
      <small>v.20190227</small>
    </div>
  </aside>
</template>

<script>
import LausanneLogo from '@/assets/images/logo-white.svg'
import MenuItem from '@/components/Layout/Sidebar/MenuItem'

export default {
  components: {
    LausanneLogo,
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

