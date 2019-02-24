<template>
  <tr class="h-16 border-b border-neutral-200">
    <td>{{ user.username }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.account_status }}</td>
  </tr>
</template>

<script>
export default {
  props: ['user'],
}
</script>

