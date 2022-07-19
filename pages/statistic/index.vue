<template>
  <v-container>
    <v-row class="px-3 pt-6">
      <v-flex xs6 class="px-4">
        <v-card class="pa-4">
          <line-chart :height="360" :chartData="chart_data" :removeLabel="true"></line-chart>
        </v-card>
      </v-flex>
      <v-flex xs6 class="px-4">
        <v-card class="pa-4">
          <line-chart :height="360" :chartData="chart_data"></line-chart>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>
<script>
import lineChart from "@/components/common/charts/lineChart.vue";
export default {
  components:{
    lineChart
  },
  data(){
    return {
      chart_data: {
        labels: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        datasets: [
          {
            label: 'Subscribers',
            fill: true,
            backgroundColor: "rgba(183, 192, 223, 0.5)",
            borderColor: '#4860B1',
            pointRadius: 4,
            data: [30, 39, 66, 60, 69, 90, 50],
            tension: 0.5
          },
        ]
      },
    }
  }
}
</script>
