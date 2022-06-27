<template>
  <v-container>
    <v-row>
      <v-flex xs12 style="display:flex; justify-content:center; align-items:center;
    height:77vh;">
        <div class="text-center">
         <v-icon size="350" color="primary" >
           mdi-file-remove-outline
         </v-icon>
         <div class="text-capitalize" style="color: #7c94de;
    font-weight: bold;
    font-size: 43px;">
           currently no data available.
         </div>
         <!-- <span class="font-weight-bold text-upperc">try adding data to start browsing!</span> -->
        </div>
      </v-flex>
    </v-row>
  </v-container>
</template>
<script>
import empty from '~/assets/default/empty.webp'
export default {
  data(){
    return {
      empty
    }
  }
}
</script>
