<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-capitalize">Les Macros</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs9
          class="mb-2"
        >
          <div>
            <statistics-component
              :statistics="formattedStatistics"
              :title="title"
            />
          </div>
        </v-flex>
        <v-flex
          xs3
          style="display: flex; align-items: center; justify-content: center;"
        >
          <div style="width:70%; ">
            <v-btn
              large
              block
              color="primary"
              outlined
              class="py-4"
              @click="$emit('openDrawer')"
            >
              <v-icon left>mdi-plus</v-icon>
              modifier les macros
            </v-btn>
          </div>
        </v-flex>
        <v-flex
          x12
          class="mb-2"
        >
          <v-container>
            <v-row>
              <v-flex xs12>
                <v-card class="mx-2 pa-3">
                  <v-toolbar
                    dense
                    flat
                  >
                    <v-toolbar-title class="font-weight-medium text-capitalize">son tracking (MACRO)</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="dates"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <!-- <v-text-field
                          v-model="date"
                          label="Picker in menu"
                          prepend-icon="mdi-calendar"
                        ></v-text-field> -->
                         <div class="mb-1">
                          <v-text-field
                            v-model="textDateValue"
                            placeholder="Choose Date..."
                            type="text"
                            hide-details="auto"
                            readonly
                            prepend-inner-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </div>
                      </template>
                      <v-date-picker
                        v-model="dates"
                        range
                        color="primary"
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="menu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(dates)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-toolbar>
                  <line-chart :height="360" :chartData="chart_data"></line-chart>
                </v-card>
              </v-flex>
            </v-row>
          </v-container>
        </v-flex>
      </v-layout>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import statisticsComponent from "@/components/common/statisticComponent.vue";
import lineChart from "@/components/common/charts/lineChart.vue";
// import barChart from "@/components/common/charts/barChart.vue";
export default {
  components: {
    statisticsComponent,
    lineChart,
    // barChart
  },
  data () {
    return {
      title: "",
      dates:[],
      menu: false,
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
  computed: {
    textDateValue() {
     return this.dates.join(' ~ ')
    },
    formattedStatistics () {
      return [
        {
          title: 'Protein',
          value: 0,
          type: 'number'
        },
        {
          title: 'Lipides',
          value: 1,
          type: 'number'
        },
        {
          title: 'Glucides',
          value: 2,
          type: 'number'
        },
        {
          title: 'Legumes',
          value: 3,
          type: 'number'
        },
      ]
    }
  },
}
</script>
<style scoped>
.v-text-field{
      width: 400px;
}
</style>
