<template>
  <div>
    <client-info :hide_status="true"></client-info>
    <v-container>
      <v-row>
        <v-flex xs12>
          <v-toolbar
            class="ma-2"
            flat
            dense
          >
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
              v-model="is_graph"
              hide-details="auto"
              dense
              inset
            ></v-switch>
            <span class="overline">table</span>
          </v-toolbar>
        </v-flex>

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
              v-if="is_graph==false"
              :height="360"
              :removeLabel="true"
              :chartData="kg_chart_data"
            ></line-chart>
            <v-data-table
              v-else
              :headers="headers"
              :items="pods"
              class="elevation-1 custom-table"
            ></v-data-table>
          </v-card>
        </v-flex>
        <v-flex
          xs12
          class="mt-4"
        >
          <height-form :measures="measures" :is_graph="is_graph"></height-form>
          <!-- <v-card class="mx-2 pa-3">
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
          </v-card> -->
        </v-flex>
      </v-row>
      <feed-back-form :feedback_type="type"></feed-back-form>
    </v-container>
  </div>
</template>
<script>
import moment from "moment";
import clientInfo from '@/components/clients/coaching/formula/clientInfo.vue'
import lineChart from "@/components/common/charts/lineChart.vue";
import feedBackForm from "~/components/clients/coaching/feedback/form.vue"
import heightForm from '@/components/clients/coaching/measure/height.vue';
export default {
  components: {
    clientInfo,
    lineChart,
    feedBackForm,
    heightForm
  },
  data () {
    return {
      is_graph: false,
      type: 'measure',
      menu: false,
      menu2: false,
      modal: false,
      payload: {
        from: moment().subtract(1,'week').format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD'),
      },
      measures: [],
      pods: [
        {
          date: '2022-07-12',
          neck: 159,
          shoulder: 6.0,
          chest: 24,
          upper_arm: 4.0,
          waist: '1%',
          hips: '1%',
          upper_thigh: '1%',
          calf: '1%',
        },
        {
          date: '2022-07-12',
          neck: 159,
          shoulder: 6.0,
          chest: 24,
          upper_arm: 4.0,
          waist: '1%',
          hips: '1%',
          upper_thigh: '1%',
          calf: '1%',
        },
        {
          date: '2022-07-12',
          neck: 159,
          shoulder: 6.0,
          chest: 24,
          upper_arm: 4.0,
          waist: '1%',
          hips: '1%',
          upper_thigh: '1%',
          calf: '1%',
        },
        {
          date: '2022-07-12',
          neck: 159,
          shoulder: 6.0,
          chest: 24,
          upper_arm: 4.0,
          waist: '1%',
          hips: '1%',
          upper_thigh: '1%',
          calf: '1%',
        },
        {
          date: '2022-07-12',
          neck: 159,
          shoulder: 6.0,
          chest: 24,
          upper_arm: 4.0,
          waist: '1%',
          hips: '1%',
          upper_thigh: '1%',
          calf: '1%',
        },
        {
          date: '2022-07-12',
          neck: 159,
          shoulder: 6.0,
          chest: 24,
          upper_arm: 4.0,
          waist: '1%',
          hips: '1%',
          upper_thigh: '1%',
          calf: '1%',
        },
        {
          date: '2022-07-12',
          neck: 159,
          shoulder: 6.0,
          chest: 24,
          upper_arm: 4.0,
          waist: '1%',
          hips: '1%',
          upper_thigh: '1%',
          calf: '1%',
        },
        {
          date: '2022-07-12',
          neck: 159,
          shoulder: 6.0,
          chest: 24,
          upper_arm: 4.0,
          waist: '1%',
          hips: '1%',
          upper_thigh: '1%',
          calf: '1%',
        },
        {
          date: '2022-07-12',
          neck: 159,
          shoulder: 6.0,
          chest: 24,
          upper_arm: 4.0,
          waist: '1%',
          hips: '1%',
          upper_thigh: '1%',
          calf: '1%',
        },
      ],
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

    }
  },
  watch: {
    is_graph: {
      handler(val) {
        if(val) {
          this.requestForm()
        }
      }
    }
  },
  mounted() {
    this.initialize()
  },
  methods:{
    initialize() {
      this.requestForm()
    },
    getRecords(item) {
      this.$axios.post(`${this.$measurements}/${item.request_view}`, item).then(({data}) => {
        console.log(data,"measure")
        this.measures=data
      })
    },
    requestForm() {
      if(this.is_graph==false) {
        let item= {
          request_view: 'line',
          week_request: {
            start: this.payload.from,
            end :  this.payload.to,
          },
        };
        this.getRecords(item)
      } else {
        let item= {
          request_view: 'graph',
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
