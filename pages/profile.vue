<template>
  <div>
    <v-tabs>
      <v-tab v-for="tab in tabs" :key="tab.to" 
      :to="{name: tab.to}">{{tab.title}}</v-tab>
    </v-tabs>
    <Nuxt></Nuxt>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabs: [
        {
          title: 'CHANGE PASSWORD',
          to: 'profile-change_password'
        },
        {
          title: 'EDIT INFORMATION',
          to: 'profile-edit_information'
        },
      ]
    }
  }
}
</script>