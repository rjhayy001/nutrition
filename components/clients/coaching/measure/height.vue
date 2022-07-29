<template>
  <v-card class="mx-2 pa-3">
    <v-toolbar
      flat
      dense
    >
      <v-toolbar-title class="font-weight-medium text-capitalize">ses mesures (cm)</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <line-chart
      v-if="is_graph==false"
      :height="360"
      :removeLabel="true"
      :chartData="cm_chart_data"
    ></line-chart>
    <v-data-table
      v-else
      :headers="headers"
      :items="measures"
      class="elevation-1 custom-table"
    ></v-data-table>
  </v-card>
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
    measures: {
      type:Array/Object,
      default:() => {}
    }
  },
  data() {
    return {
      headers: [
        { text: 'Date', align: 'start', value: 'date', width: '150px'},
        { text: 'Neck', align: 'start', value: 'neck', width: '150px'},
        { text: 'Shoulder', align: 'start', value: 'shoulder', width: '150px'},
        { text: 'Chest', align: 'start', value: 'chest', width: '150px'},
        { text: 'Upper Arm', align: 'start', value: 'upper_arm', width: '150px'},
        { text: 'Waist', align: 'start', value: 'waist', width: '150px'},
        { text: 'Hips', align: 'start', value: 'hips', width: '150px'},
        { text: 'Upper Thigh', align: 'start', value: 'upper_thigh', width: '150px'},
        { text: 'Calf', align: 'start', value: 'calf', width: '150px'},
      ],
      cm_chart_data: {
        labels: [],
        datasets: [
          {
            label: 'Cm',
            backgroundColor: '#a0fff5',
            fill: true,
            borderColor: '#8AECE0',
            data: [],
            tension: 0.5
          },
        ]
      },
    }
  },
  watch: {
    measures: {
      handler(val) {
        this.cm_chart_data.labels=val[0];
        this.cm_chart_data.datasets[0].data=val[1];
      }
    }
  }
}
</script>
