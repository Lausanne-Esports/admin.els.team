<template>
  <tr class="h-16 border-b border-dark-purple-blue">
    <td>{{ user.username }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.account_status }}</td>
    <td></td>
  </tr>
</template>

<script>
export default {
  props: ['user'],
}
</script>

