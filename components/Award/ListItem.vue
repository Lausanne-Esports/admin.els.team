<template>
  <tr class="h-16 border-b border-neutral-200">
    <td>
      <Icon
        v-if="[1, 2, 3].includes(award.result)"
        name="trophy"
        class="h-10"
        :class="`top${award.result}`"
      />
      <div
        class="flex font-mono justify-center items-center rounded-full border-2 border-blue-500 h-10 w-10 text-xl"
        v-else
      >{{ award.result }}</div>
    </td>
    <td>{{ award.event_name }}</td>
    <td>{{ award.lineup }}</td>
    <td>{{ award.category.name }}</td>
    <td></td>
  </tr>
</template>

<script>
export default {
  props: {
    award: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="postcss">
svg.top1 * {
  @apply text-yellow-500 !important;
}

svg.top2 * {
  @apply text-gray-400 !important;
}

svg.top3 * {
  @apply text-yellow-700 !important;
}
</style>
