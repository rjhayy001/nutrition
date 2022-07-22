<template>
  <v-container>
    <v-row class="px-3 pt-6">
      <v-flex xs3 class="px-4 pb-4">
        <v-card class="pa-4">
          <bar-chart :chartData="bar_data" ></bar-chart>
        </v-card>
      </v-flex>
      <v-flex xs3 class="px-4 pb-4">
        <v-card class="pa-4">
          <bar-chart :chartData="bar_data" ></bar-chart>
        </v-card>
      </v-flex>
      <v-flex xs3 class="px-4 pb-4">
        <v-card class="pa-4">
          <bar-chart :chartData="bar_data" ></bar-chart>
        </v-card>
      </v-flex>
      <v-flex xs3 class="px-4 pb-4">
        <v-card class="pa-4">
          <bar-chart :chartData="bar_data" ></bar-chart>
        </v-card>
      </v-flex>
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
import barChart from "@/components/common/charts/barChart.vue";
export default {
  components:{
    lineChart,
    barChart
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
      bar_data: {
        labels: [
          'Macro',
          '100% accompagne',
        ],
        datasets: [
          {
            label: 'Stress',
            backgroundColor: [ "#e7e7e7", '#7C94DE'],
            data: [40, 60]
          }
        ]
      },
    }
  }
}
</script>
