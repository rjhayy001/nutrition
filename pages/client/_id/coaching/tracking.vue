<template>
  <v-container>
    <v-row justify="center">
      <v-expansion-panels accordion  v-model="panel">
        <macro-view></macro-view>
        <daily-view></daily-view>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>
<script>
import macroView from '@/components/clients/coaching/tracking/macro.vue'
import dailyView from '@/components/clients/coaching/tracking/daily.vue'
export default {
  components: {
    macroView,
    dailyView
  },
  data(){
    return{
      panel:0,
    }
  },
}
</script>
