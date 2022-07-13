<template>
  <div>
    <client-info :hide_status="true"></client-info>
    <v-container>
      <v-row>
        <v-flex xs12>
          <v-card class="mx-2 pa-3">
            <v-toolbar
              flat
              dense
            >
              <v-toolbar-title class="font-weight-medium text-capitalize">son poids (kg)</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <line-chart
              :height="360"
              :removeLabel="true"
              :chartData="kg_chart_data"
            ></line-chart>
          </v-card>
        </v-flex>
        <v-flex
          xs12
          class="mt-4"
        >
          <v-card class="mx-2 pa-3">
            <v-toolbar
              flat
              dense
            >
              <v-toolbar-title class="font-weight-medium text-capitalize">ses mesures (cm)</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <line-chart
              :height="360"
              :removeLabel="true"
              :chartData="cm_chart_data"
            ></line-chart>
          </v-card>
        </v-flex>
      </v-row>
      <feed-back-form :feedback_type="type"></feed-back-form>
    </v-container>
  </div>
</template>
<script>
import clientInfo from '@/components/clients/coaching/formula/clientInfo.vue'
import lineChart from "@/components/common/charts/lineChart.vue";
import feedBackForm from "~/components/clients/coaching/feedback/form.vue"
export default {
  components: {
    clientInfo,
    lineChart,
    feedBackForm
  },
  data () {
    return {
      type:'measure',
      kg_chart_data: {
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
            label: 'Kg',
            backgroundColor: '#D8EAF8',
            fill: true,
            borderColor: '#1C3B9F',
            data: [40, 39, 16, 40, 49, 80, 40],
            tension: 0.5
          },
        ]
      },
      cm_chart_data: {
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
            label: 'Cm',
           backgroundColor: '#a0fff5',
            fill: true,
            borderColor: '#8AECE0',
            data: [40, 39, 16, 40, 49, 80, 40],
            tension: 0.5
          },
        ]
      },

    }
  }

}
</script>
