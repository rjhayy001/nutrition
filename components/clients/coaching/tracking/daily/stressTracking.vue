<template>
  <v-card
    class="mx-2 pa-3"
    height="400"
  >
    <div>
      <div class="ml-2 text-capitalize font-weight-medium">
        stress
      </div>
      <div>
        <bar-chart :chartData="chartData" :max_value="10"></bar-chart>
      </div>
    </div>
  </v-card>
</template>
<script>
import barChart from "@/components/common/charts/barChart.vue";
export default {
  props: ['date', 'data'],
  components: {
    barChart
  },
  watch: {
    data (val) {
      this.curr_data = val
      this.chartData.datasets[0].data = [this.curr_data.stress]
    },
  },
  data () {
    return {
      curr_data:{},
      chartData: {
        labels: [
          'Stress',
        ],
        datasets: [
          {
            label: 'Stress',
            backgroundColor: ['#7C94DE'],
            data: [0]
          }
        ]
      },
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      // alert('sad')
    }
  }
}
</script>
