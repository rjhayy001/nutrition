<template>
  <fragment>
    <v-container>
      <v-tabs>
        <v-tab :to="{name:'settings-address-countries'}">Countries</v-tab>
        <v-tab :to="{name:'settings-address-cities'}">Cities</v-tab>
        <v-tab :to="{name:'settings-address-zipcodes'}">Zipcodes</v-tab>
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