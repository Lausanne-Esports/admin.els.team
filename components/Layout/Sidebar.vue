<template>
  <aside class="text-white h-full flex flex-col justify-between bg-gray-900">
    <div class="flex flex-col">
      <nuxt-link class="flex mt-8 mb-8 align-center justify-center" to="/">
        <LausanneLogo class="h-32" />
      </nuxt-link>

      <span class="tracking-wider uppercase bg-gray-800 p-4">Main</span>
      <menu-item to="/" icon="chart-line">
        <DashboardIcon class="fill-current h-6 mr-3" />Dashboard
      </menu-item>
      <menu-item to="/articles">
        <NewsIcon class="fill-current h-6 mr-3" />Articles
      </menu-item>
      <menu-item to="/members">
        <MembersIcon class="fill-current h-6 mr-3" />Members
      </menu-item>
      <menu-item to="/teams">
        <TeamIcon class="fill-current h-6 mr-3" />Teams
      </menu-item>
      <menu-item to="/streams">
        <StreamsIcon class="fill-current h-6 mr-3" />Streams
      </menu-item>
      <menu-item to="/users">
        <UsersIcon class="fill-current h-6 mr-3" />Users
      </menu-item>
    </div>
    <div class="flex justify-center py-8">
      <small>v.20190227</small>
    </div>
  </aside>
</template>

<script>
import LausanneLogo from '@/assets/images/logo-white.svg'
import DashboardIcon from '@/assets/icons/icon-dashboard.svg'
import NewsIcon from '@/assets/icons/icon-news.svg'
import MembersIcon from '@/assets/icons/icon-user-group.svg'
import TeamIcon from '@/assets/icons/icon-layers.svg'
import StreamsIcon from '@/assets/icons/icon-videocam.svg'
import UsersIcon from '@/assets/icons/icon-user-couple.svg'
import MenuItem from '@/components/Layout/Sidebar/MenuItem'

export default {
  components: {
    DashboardIcon,
    UsersIcon,
    MembersIcon,
    NewsIcon,
    TeamIcon,
    StreamsIcon,
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

