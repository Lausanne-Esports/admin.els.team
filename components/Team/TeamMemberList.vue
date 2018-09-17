<template>
  <section class="p-8 mb-8 bg-white shadow rounded-lg w-full">
    <header class="pb-4 mb-4 border-b border-darker-blue">
      <h2>Membre(s)</h2>
    </header>

    <table class="w-full border-collapse">
      <thead>
        <tr class="text-sm h-12 text-left uppercase text-dark-purple-blue">
          <th>
            <span class="flex items-center">Nom</span>
          </th>
          <th>
            <span class="flex items-center">Rôle(s)</span>
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <list-item
          v-for="(member, index) in members"
          :key="member.id"
          :member="member"
          :team="team"
          :first="index === 0"
          :last="lastItemIndex === index"
          @submit="$emit('submit')"
        ></list-item>
      </tbody>
    </table>
  </section>
</template>

<script>
import ListItem from '@/components/Team/TeamMemberListItem'

export default {
  props: ['members', 'team'],

  components: { ListItem },

  computed: {
    lastItemIndex () {
      return Object.keys(this.members).length - 1
    },
  },
}
</script>

