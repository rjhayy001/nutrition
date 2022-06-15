<template>
  <v-container>
     <form-drawer :drawerStatus="drawer" @closeDrawer="drawer = !drawer"
        @addRecord="addRecord($event)"
        @updateRecord="updateRecord($event)"
        :selectedItem="selectedItem"
      />
    <v-row justify="center">
      <v-expansion-panels accordion  v-model="panel">
        <macro-view @openDrawer="drawer =! drawer"></macro-view>
        <daily-view></daily-view>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>
<script>
import macroView from '@/components/clients/coaching/tracking/macro.vue'
import formDrawer from "~/components/clients/coaching/tracking/macroForm.vue";
import dailyView from '@/components/clients/coaching/tracking/daily.vue'
export default {
  components: {
    macroView,
    formDrawer,
    dailyView
  },
  data(){
    return{
      panel:0,
      selectedItem:{},
      drawer:false,
    }
  },
}
</script>
