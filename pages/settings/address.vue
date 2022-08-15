<template>
  <fragment>
    <v-container>
      <v-tabs>
        <v-tab :to="{name:'settings-address-countries'}">{{ $t('address.country') }}</v-tab>
        <v-tab :to="{name:'settings-address-cities'}">{{ $t('address.city') }}</v-tab>
        <v-tab :to="{name:'settings-address-zipcodes'}">{{ $t('address.zipcodes') }}</v-tab>
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