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
        <bar-chart :chartData="chartData"></bar-chart>
      </div>
    </div>
  </v-card>
</template>
<script>
import barChart from "@/components/common/charts/barChart.vue";
export default {
  props: ['date'],
  components: {
    barChart
  },
  watch: {
    date (val) {
      alert(val)
    },
  },
  data () {
    return {
      chartData: {
        labels: [
          'Stress',
        ],
        datasets: [
          {
            label: 'Stress',
            backgroundColor: ['#7C94DE'],
            data: [39]
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
