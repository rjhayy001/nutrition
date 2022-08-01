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
              Définir des macros
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
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="payload.from"
                            placeholder="from"
                            readonly
                            hide-details="auto"
                            outlined
                            dense
                            append-icon="mdi-calendar-outline"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          @change="requestForm"
                          color="primary"
                          v-model="payload.from"
                          no-title
                          scrollable
                          @input="menu = false"
                        >
                        </v-date-picker>
                      </v-menu>
                    </div>
                    <div
                      width="150px"
                      class="mx-2 mr-6"
                    >
                      <v-menu
                        ref="menu"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="payload.to"
                            placeholder="from"
                            readonly
                            hide-details="auto"
                            outlined
                            dense
                            append-icon="mdi-calendar-outline"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          color="primary"
                          v-model="payload.to"
                          @change="requestForm"
                          no-title
                          scrollable
                          @input="menu2 = false"
                        >
                        </v-date-picker>
                      </v-menu>
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
                  </v-toolbar>
                  <chart-table :dataChart="measures" :is_graph="is_graph"></chart-table>
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
import moment from "moment";
import statisticsComponent from "@/components/common/statisticComponent.vue";
import lineChart from "@/components/common/charts/lineChart.vue";
import chartTable from '@/components/clients/coaching/tracking/chartTable.vue';
import ChartTable from './chartTable.vue';
// import barChart from "@/components/common/charts/barChart.vue";
export default {
  components: {
    statisticsComponent,
    lineChart,
    chartTable
    // barChart
  },
  data () {
    return {
      title: "",
      dates: [],
      is_graph:false,
      menu: false,
      menu2: false,
      modal: false,
      payload: {
        from: moment().subtract(1,'week').format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD'),
      },
      measures: [],
      subs:[],
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
          value: this.active_subs.coach_macros.length ? this.active_subs.coach_macros[0].protein : 0,
          type: 'number'
        },
        {
          title: 'Lipides',
          value: this.active_subs.coach_macros.length ? this.active_subs.coach_macros[0].lipid : 0,
          type: 'number'
        },
        {
          title: 'Glucides',
          value: this.active_subs.coach_macros.length ? this.active_subs.coach_macros[0].carbohydrate : 0,
          type: 'number'
        },
        {
          title: 'Legumes',
          value: this.active_subs.coach_macros.length ? this.active_subs.coach_macros[0].vegetable : 0,
          type: 'number'
        },
      ]
    }
  },
    watch: {
    is_graph: {
      handler(val) {
        this.requestForm()
      }
    }
  },
  mounted () {
    this.clientData()
  },
  methods: {
    initialize() {
      this.requestForm()
    },
    async getRecords(item) {
      await this.$axios.post(`${this.$macros}/${item.request_view}`, item).then(({data}) => {
        console.log(data,"dataMacro")
        this.measures=data
      })
    },

    async clientData () {
      await this.$axios
        .get(
          `${this.$clients}/${this.$route.params.id}/edit?relations=activeSubscription`
        )
        .then(({ data }) => {
          this.subs = data.active_subscription ? data.active_subscription[0] : {}
          console.log(this.subs,"subs")
          this.requestForm()
        });
    },
    requestForm() {
      if(!this.is_graph) {
        let item= {
          request_view: 'graph',
          subs_id:this.subs.id,
          week_request: {
            start: this.payload.from,
            end :  this.payload.to,
          },
        };
        this.getRecords(item)
      } else {
        let item= {
          request_view: 'table',
          subs_id:this.subs.id,
          week_request: {
            start: this.payload.from,
            end :  this.payload.to,
          },
        };
        this.getRecords(item)
      }
    }
  }
}
</script>
<style scoped>
</style>
