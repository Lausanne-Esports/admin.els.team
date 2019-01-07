<template>
  <aside class="text-white h-full w-1/6 flex flex-col justify-between admin-aside-gradient">
    <div class="flex flex-col">
      <nuxt-link class="flex mt-8 mb-8 align-center justify-center" to="/">
        <img class="h-32" src="~/assets/images/logo-white.svg" alt="Lausanne eSports">
      </nuxt-link>

      <span class="tracking-wide uppercase bg-martinique-light p-4">Main</span>
      <menu-item to="/" icon="chart-line">Dashboard</menu-item>
      <menu-item to="/articles" icon="newspaper">Articles</menu-item>
      <menu-item to="/members" icon="user">Members</menu-item>
      <menu-item to="/teams" icon="layer-group">Teams</menu-item>
      <menu-item to="/users" icon="users">Users</menu-item>
    </div>
    <div class="flex justify-center py-8">
      <small>v.20190107</small>
    </div>
  </aside>
</template>

<script>
import MenuItem from '@/components/Layout/Sidebar/MenuItem'

export default {
  components: { MenuItem },
}
</script>

<style>
.admin-aside-gradient {
  background: rgb(53,57,85);
  background: linear-gradient(45deg, rgba(53,57,85,1) 0%, rgba(53,57,85,.95) 100%);
}
</style>

