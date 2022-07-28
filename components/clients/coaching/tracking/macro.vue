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
              {{active_subs.coach_macros ? active_subs.coach_macros.length ? 'modifier les macros' : 'Définir des macros' : ''}}

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
                    class="mb-3"
                  >
                    <v-toolbar-title class="font-weight-medium text-capitalize">son tracking (MACRO)</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <div
                      width="150px"
                      class="mx-2"
                    >

                      <v-text-field
                        placeholder="from"
                        outlined
                        hide-details="auto"
                        dense
                        append-icon="mdi-calendar-outline"
                      ></v-text-field>
                    </div>
                    <div
                      width="150px"
                      class="mx-2 mr-6"
                    >
                      <v-text-field
                        placeholder="to"
                        outlined
                        hide-details="auto"
                        dense
                        append-icon="mdi-calendar-outline"
                      ></v-text-field>
                    </div>
                    <span class="overline">graph</span>
                    <v-switch
                      class="pl-5"
                      hide-details="auto"
                      v-model="is_graph"
                      dense
                      inset
                    ></v-switch>
                    <span class="overline">table</span>
                    <!-- <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="dates"
                      transition="scale-transition"
                      offset-y
                      left
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <div
                          class="mb-1"
                          style="width:230px;"
                        >
                          <v-text-field
                            outlined
                            dense
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
                    </v-menu> -->
                  </v-toolbar>
                  <!-- <v-divider class="my-4"></v-divider> -->
                  <line-chart
                    :height="360"
                    :chartData="chart_data"
                  ></line-chart>
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
      dates: [],
      is_graph:false,
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
  props: {
    active_subs: {
      type: Object,
      default: () => {
      },
    },
  },
  computed: {
    textDateValue () {
      return this.dates.join(' ~ ')
    },
    formattedStatistics () {
      return [
        {
          title: 'Protein',
          value: this.active_subs.coach_macros ? this.active_subs.coach_macros[0].protein : 0,
          type: 'number'
        },
        {
          title: 'Lipides',
          value: this.active_subs.coach_macros ? this.active_subs.coach_macros[0].lipid : 0,
          type: 'number'
        },
        {
          title: 'Glucides',
          value: this.active_subs.coach_macros ? this.active_subs.coach_macros[0].carbohydrate : 0,
          type: 'number'
        },
        {
          title: 'Legumes',
          value: this.active_subs.coach_macros ? this.active_subs.coach_macros[0].vegetable : 0,
          type: 'number'
        },
      ]
    }
  },
}
</script>
<style scoped>
</style>
