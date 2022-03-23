<template>
  <fragment>
    <v-container>
      <v-tabs>
        <v-tab :to="{name:'settings-address-countries'}">Tags</v-tab>
        <v-tab :to="{name:'settings-address-cities'}">Groups</v-tab>
        <v-tab :to="{name:'settings-address-zipcodes'}">Vats</v-tab>
      </v-tabs>
      <Nuxt />
    </v-container>
  </fragment>
</template>
<script>
import { Fragment } from "vue-frag";
export default {
  components: {
    Fragment,
  },
  setup() {
    
  },
}
</script>