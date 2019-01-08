<template>
  <tr class="h-16 border-b border-primary-lightest">
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

