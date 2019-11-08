<template>
  <div class="flex flex-col">
    <Heading>Dashboard</Heading>
    <Spacer direction="b" :size="8" />

    <!-- <div class="inline-flex">
      <div class="flex-1 mr-8">
        <panel>
          <header class="w-full text-gray-400 mb-4 pb-4">
            <h2 class="font-normal">Members</h2>
          </header>

          <div class="inline-flex justify-end items-center w-full text-5xl text-right">
            <span class="mr-4">47</span>
            <MembersIcon class="fill-current h-10" />
          </div>
        </panel>
      </div>

      <div class="flex-1 mr-8">
        <panel>
          <header class="w-full text-gray-400 mb-4 pb-4">
            <h2 class="font-normal">Awards</h2>
          </header>

          <div class="inline-flex justify-end items-center w-full text-5xl text-right">
            <span class="mr-4">68</span>
            <TrophyIcon class="fill-current h-10" />
          </div>
        </panel>
      </div>

      <div class="flex-1">
        <panel>
          <header class="w-full text-gray-400 mb-4 pb-4">
            <h2 class="font-normal">Awards</h2>
          </header>

          <div class="inline-flex justify-end items-center w-full text-5xl text-right">
            <span class="mr-4">68</span>
            <TrophyIcon class="fill-current h-10" />
          </div>
        </panel>
      </div>
    </div>-->
  </div>
</template>

<script>
// import Panel from '@/components/Layout/Panel'
// import MembersIcon from '@/assets/icons/icon-user-group.svg'
// import TrophyIcon from '@/assets/icons/icon-trophy.svg'

export default {
  layout: 'app',

  // components: {
  //  MembersIcon, TrophyIcon,
  //  Panel,
  // },
}
</script>

<style lang="postcss" scoped>
svg .primary {
  @apply .text-blue-200;
}
</style>
