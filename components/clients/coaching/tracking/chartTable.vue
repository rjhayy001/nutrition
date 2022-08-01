<template>
  <div>
    <line-chart
      v-if="!is_graph"
      :height="360"
      :chartData="chart_data"
    ></line-chart>
    <v-data-table 
      v-else
      :headers="headers"
      :items="table_data"
      class="elevation-1 custom-table"
    ></v-data-table>
  </div>
</template>
<script>
import lineChart from "@/components/common/charts/lineChart.vue";
export default {
  components: {
    lineChart,
  },
  props: {
    is_graph: {
      type: Boolean,
      default: () => false,
    },
    dataChart: {
      default:() => {}
    }
  },
  data() {
    return {
      headers: [
        { text: 'Date', align: 'start', value: 'date', width: '130px'},
        { text: 'Carbohydrate', align: 'start', value: 'carbohydrate', width: '130px'},
        { text: 'Lipid', align: 'start', value: 'lipid', width: '130px'},
        { text: 'Protein', align: 'start', value: 'Protein', width: '130px'},
        { text: 'Vegetable', align: 'start', value: 'vegetable', width: '130px'},
        { text: 'Type', align: 'start', value: 'type', width: '130px'},
      ],
      table_data: [],
      
      chart_data: {
        labels: [],
        datasets: [
          {
            label: 'Protein',
            fill: true,
            backgroundColor: "rgba(183, 192, 223, 0.5)",
            borderColor: '#4860B1',
            pointRadius: 4,
            data: [30, 39, 66, 60, 69, 90, 50],
            tension: 0.5
          },
          {
            label: 'Lipides',
            fill: true,
            borderColor: 'red',
            pointRadius: 4,
            backgroundColor: "rgba(253, 222, 170, 0.6)",
            data: [40, 39, 16, 40, 49, 80, 80],
            tension: 0.5
          },
          {
            label: 'Glucides',
            fill: true,
            pointRadius: 4,
            borderColor: 'green',
            backgroundColor: "rgba(206, 249, 206, 0.6)",
            data: [70, 19, 21, 67, 59, 70, 90],
            tension: 0.5
          },
          {
            label: 'Legumes',
            backgroundColor: "rgba(240, 202, 243, 0.5)",
            fill: true,
            borderColor: '#C83FD3',
            pointRadius: 4,
            data: [64, 57, 32, 45, 81, 76, 39],
            tension: 0.5
          },
        ]
      },
    }
  },
  watch: {
    dataChart: {
      handler(val) {
        if (!this.is_graph) {
          this.chart_data.labels = val[0] ? this.cloneVariable(val[0]) : ['test'];
          Object.values(this.dataChart[1]).forEach((value,index) => {
            this.chart_data.datasets[index] = {
              label: value.name,
              backgroundColor: value.color,
              borderColor: value.color,
              data: value.data,
              tension: 0.3
            }
          })
        } else {
          this.table_data = val
        }
      }
    }
  }
}
</script>