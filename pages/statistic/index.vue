<template>
  <v-container>
    <v-layout class="px-4 pb-4">
      <v-flex>
        <v-layout>
          <v-flex>
            <div v-if="showMonth" style="height:20px">
              <v-btn x-small icon @click="decrement">
                <v-icon icon>
                  mdi-menu-left
                </v-icon>
              </v-btn>
              <span>{{current_month}}</span>
              <v-btn x-small icon @click="increment">
                <v-icon  icon >
                  mdi-menu-right
                </v-icon>
              </v-btn>
            </div>
          </v-flex>
          <v-flex class="d-flex flex-row-reverse my-auto">
            <v-btn x-small @click="calendar('week')" >Week</v-btn>
            <v-btn class="mx-2" x-small @click="calendar('month')">Month</v-btn>
            <v-btn x-small @click="calendar('year')">Year</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <v-layout>
          <v-flex xs6 class="px-4 pb-4">
            <v-card elevation="2" class="px-4 py-2">
              <bar-chart :chartData="subscription_chart" ></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs6 class="px-4 pb-4">
            <v-card elevation="2" class="px-4 py-2">
              <bar-chart :chartData="plan_chart" ></bar-chart>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex class="px-4 pb-4">
            <v-card  class="px-4 py-2">
              <line-chart
                :height="360"
                :removeLabel="true"
                :chartData="subscription_line"
              ></line-chart>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <v-layout>
          <v-flex xs6 class="px-4 pb-4">
            <v-card elevation="2" class="px-4 py-2">
              <bar-chart :chartData="chartData3" ></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs6 class="px-4 pb-4">
            <v-card elevation="2" class="px-4 py-2">
              <bar-chart :chartData="chartData4" ></bar-chart>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex class="px-4 pb-4">
            <v-card  class="px-4 py-2">
              <line-chart
                :height="360"
                :removeLabel="true"
                :chartData="cm_chart_data2"
              ></line-chart>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import barChart from "@/components/common/charts/barChart.vue";
import lineChart from "@/components/common/charts/lineChart.vue";
import moment from "moment";
export default {
  components:{
    barChart,
    lineChart
  },
  data() {
    return {
      showMonth:false,
      current_month: moment().format('MMMM'),
      subscription_chart: {
        labels: [
          'Subscriber',
          'Non Subscriber',
        ],
        datasets: [
          {
            label: 'Clients',
            backgroundColor: ["#7C94DE", "#e7e7e7"],
            data: [0,0]
          }
        ]
      },
      plan_chart: {
        labels: [
          'macro solo',
          '100% accompagne',
        ],
        datasets: [
          {
            label: 'Clients',
            backgroundColor: ["#7C94DE", "#e7e7e7"],
            data: [0,0]
          }
        ]
      },
      chartData3: {
        labels: [
          'January',
          'February',
        ],
        datasets: [
          {
            label: 'Clients',
            backgroundColor: ["#e7e7e7", "#7C94DE"],
            data: [40, 39]
          }
        ]
      },
      chartData4: {
        labels: [
          'January',
          'February',
        ],
        datasets: [
          {
            label: 'Clients',
            backgroundColor: ["#e7e7e7", "#7C94DE"],
            data: [40, 20]
          }
        ]
      },
      subscription_line: {
        labels: [],
        datasets: [
          {
            label: 'Subscriber',
            backgroundColor: '#a0fff5',
            fill: true,
            borderColor: '#8AECE0',
            data: [],
            tension: 0.5
          },
        ]
      },
      cm_chart_data2: {
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
    };
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.calendar()
    },
    checkSubscription(item) {
      console.log(item)
      this.$axios.get(`${this.$statistics}/subscription/${item.request_view}`,item).then(({data}) => {
        console.log(data)
        this.subscription_chart.datasets[0].data=data[0]
        this.plan_chart.datasets[0].data=data[1]
      })
    },
    calendar(item) {
      if(item=='week') {
        this.showMonth=false;
        let itemMonth= {
          request_view: 'week',
          month_request: this.current_month,
        };
        this.checkSubscription(itemMonth)
      }
      else if(item=='month'  || item==null) {
        this.showMonth=true;
        let itemMonth= {
          request_view: 'month',
          month_request: this.current_month,
        };
        this.checkSubscription(itemMonth)
      }
      else {
        this.showMonth=false;
        alert("year")
      }
    },
    increment() {
      let addMonth = moment().add(1, 'M').format('MMMM');
      this.current_month = addMonth;
    },
    decrement() {

    }
  },
};
</script>
