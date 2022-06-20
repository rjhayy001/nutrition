<template>
  <v-container>
    <h1>Dashboard</h1>
    {{$auth.user}}
    <br/>
    <br/>
    <br/>
    is admin =
    {{ $isAdmin()}}
  </v-container>
</template>
<script>
export default {
  auth:'auth'
}
</script>
