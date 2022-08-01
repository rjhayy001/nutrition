<template>
  <v-card class="mx-2 pa-3">
    <v-toolbar
      flat
      dense
    >
      <v-toolbar-title class="font-weight-medium text-capitalize">son poids (kg)</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <line-chart
      v-if="is_graph==false"
      :height="360"
      :chartData="kg_chart_data"
    ></line-chart>
    <v-data-table
      v-else
      :headers="headers"
      :items="data"
      class="elevation-1 custom-table"
    ></v-data-table>
  </v-card>
</template>
<script>
import lineChart from "@/components/common/charts/lineChart.vue";
export default {
  components: {
    lineChart
  },
  props: {
    is_graph: {
      type: Boolean,
      default: () => false,
    },
    weights: {
      default: () => { }
    }
  },
  data () {
    return {
      headers: [
        { text: 'Date', align: 'start', value: 'date'},
        { text: 'Weight', align: 'start', value: 'weight'},
      ],
      data:[],
      kg_chart_data: {
        labels: [],
        datasets: [
          {
            label: 'Weight/Kg',
            backgroundColor: '#D8EAF8',
            fill: true,
            borderColor: '#1C3B9F',
            data: [],
            tension: 0.5
          },
        ]
      },
    }
  },
  watch: {
    weights: {
      handler (val) {
        if (!this.is_graph) {
          this.kg_chart_data.labels = val['dates'] ? this.cloneVariable(val['dates']) : [];
          this.kg_chart_data.datasets[0].data = val['data'] ? this.cloneVariable(val['data']) : [];
          // this.cm_chart_data.datasets[0].data=val[1];
          // Object.values(this.measures[1]).forEach((value,index) => {
          //   this.cm_chart_data.datasets[index] = {
          //     label: value.name,
          //     backgroundColor: value.color,
          //     borderColor: value.color,
          //     data: value.data,
          //     tension: 0.3
          //   }
          // })

          // console.log(this.cm_chart_data.datasets, 'datasets')
          console.log(val[1], 'dataaaaaa')
        } else {
          this.data = val
        }

      }
    }
  }
}
</script>
