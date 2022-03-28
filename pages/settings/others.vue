<template>
  <fragment>
    <v-container fluid>
      <v-tabs>
        <v-tab :to="{name:'settings-others-tags-tags'}">Tags</v-tab>
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
