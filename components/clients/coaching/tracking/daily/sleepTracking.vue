<template>
  <v-card
    class="mx-2 pa-3"
    height="400"
  >
    <div>
      <div class="ml-2 text-capitalize font-weight-medium">
        sleep
      </div>
      <div>
        <bar-chart :chartData="chartData" ></bar-chart>
      </div>
    </div>
  </v-card>
</template>
<script>
import barChart from "@/components/common/charts/barChart.vue";
export default {
  components:{
    barChart
  },
  data(){
    return {
       chartData: {
        labels: [
          'Sleep'
        ],
        datasets: [
          {
            label: 'Stress',
            backgroundColor: ['#7C94DE'],
            data: [40]
          }
        ]
      },
    }
  }
}
</script>
