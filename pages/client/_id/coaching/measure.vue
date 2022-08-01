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
          <weight-data
            :weights="weights"
            :is_graph="is_graph"
          ></weight-data>
        </v-flex>
        <v-flex
          xs12
          class="mt-4"
        >
          <height-data
          :loading="loading"
            :measures="measures"
            :is_graph="is_graph"
          ></height-data>
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
import heightData from '@/components/clients/coaching/measure/height.vue'
import weightData from '@/components/clients/coaching/measure/weight.vue'
export default {
  components: {
    clientInfo,
    lineChart,
    feedBackForm,
    heightData,
    weightData
  },
  data () {
    return {
      is_graph: false,
      type: 'measure',
      menu: false,
      menu2: false,
      modal: false,
      loading:false,
      payload: {
        from: moment().subtract(1, 'week').format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD'),
      },
      measures: [],
      weights: [],
      subs:[],
    }
  },
  watch: {
    is_graph: {
      handler (val) {

        this.requestForm()
      }
    }
  },
  mounted () {
    this.clientData()
  },
  methods: {
    initialize () {
        this.requestForm()
    },
    async getRecords (item) {
      // this.loading = true
      await this.$axios.post(`${this.$measurements}/${item.request_view}`, item).then(({ data }) => {
        console.log(data, "measure", item.request_view)
        this.measures = data
      })

      this.getWeightData(item)
    },

    async clientData () {
      await this.$axios
        .get(
          `${this.$clients}/${this.$route.params.id}/edit?relations=activeSubscription`
        )
        .then(({ data }) => {
          this.subs = data.active_subscription ? data.active_subscription[0] : {}
          this.requestForm()
        });
    },

    getWeightData(item){
      this.$axios.post(`${this.$measurements}/weights/${item.request_view}`, item).then(({ data }) => {
        this.weights = data
        console.log(data, 'weights')
        // this.loading = false
      })
    },
    requestForm () {
      if (!this.is_graph) {
        let item = {
          request_view: 'line',
          subs_id:this.subs.id,
          week_request: {
            start: this.payload.from,
            end: this.payload.to,
          },
        };
        this.getRecords(item)
      } else {
        let item = {
          request_view: 'graph',
          subs_id:this.subs.id,
          week_request: {
            start: this.payload.from,
            end: this.payload.to,
          },
        };
        this.getRecords(item)
      }
    }
  }

}
</script>
