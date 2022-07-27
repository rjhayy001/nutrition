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
        <bar-chart :chartData="chartData" :max_value="14" ></bar-chart>
      </div>
    </div>
  </v-card>
</template>
<script>
import barChart from "@/components/common/charts/barChart.vue";
export default {
  props: ['data'],
  components:{
    barChart
  },
   watch: {
    data (val) {
      console.log(val,'tess')
      this.curr_data = val
      this.chartData.datasets[0].data = [this.curr_data.sleep]
    },
  },
  data(){
    return {
       chartData: {
        labels: [
          'Sleep'
        ],
        datasets: [
          {
            label: 'Sleep',
            backgroundColor: ['#7C94DE'],
            data: [0]
          }
        ]
      },
    }
  }
}
</script>
