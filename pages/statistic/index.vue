<template>
  <v-container>
    <v-layout class="px-4 pb-4">
      <v-flex>
        <v-layout>
          <v-flex>
            <div v-if="showMonth=='week'">
              <v-btn x-small icon @click="decrement">
                <v-icon icon>
                  mdi-menu-left
                </v-icon>
              </v-btn>
              <span>{{start_week}} to {{end_week}}</span>
              <v-btn x-small icon @click="increment">
                <v-icon  icon >
                  mdi-menu-right
                </v-icon>
              </v-btn>
            </div>
            <div v-else>
              <v-btn x-small icon @click="decrement">
                <v-icon icon>
                  mdi-menu-left
                </v-icon>
              </v-btn>
              <span>{{current_year}}</span>
              <v-btn x-small icon @click="increment">
                <v-icon  icon >
                  mdi-menu-right
                </v-icon>
              </v-btn>
            </div>
          </v-flex>
          <v-flex class="d-flex flex-row-reverse my-auto">
            <v-btn x-small @click="calendar('week')">Weekly</v-btn>
            <v-btn class="mx-2" x-small @click="calendar('year')">Yearly</v-btn>
            <v-btn x-small @click="calendar('year')">Range</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <v-layout>
          <v-flex xs6 class="px-4 pb-4">
            <v-card elevation="2" class="px-4 py-2">
              <bar-chart :chartData="subscription_chart"></bar-chart>
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
              <bar-chart :chartData="total_plan_payment" ></bar-chart>
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
                :chartData="payments_line"
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
      showMonth:'week',
      current_year: moment().format('YYYY'),
      current_date : moment().format('YYYY-MM-DD'),
      start_week: moment(this.current_date).startOf('week').format('MMMM-DD-YYYY'),
      end_week: moment(this.current_date).endOf('week').format('MMMM-DD-YYYY'),
      
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
      total_plan_payment: {
        labels: [
          'Macro Solo',
          '100% Accompagne',
          'Total Payments'
        ],
        datasets: [
          {
            label: 'Payments',
            backgroundColor: ["#e7e7e7", "#7C94DE"],
            data: [0,0]
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
            data: [0,0,0,0,0,0,0,0,0,0,0,0],
            tension: 0.5
          },
        ]
      },
      payments_line: {
        labels: [],
        datasets: [
          {
            label: 'Payments',
            backgroundColor: '#a0fff5',
            fill: true,
            borderColor: '#8AECE0',
            data: [0,0,0,0,0,0,0,0,0,0,0,0],
            tension: 0.5
          },
        ]
      },
    };
  },
  watch: {
    current_date: {
      handler(val) {
        this.current_year = moment(val).format('YYYY')
      },
    },
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.calendar('week')
    },
    checkSubscription(item) {
      this.$axios.post(`${this.$statistics}/subscription/${item.request_view}`,item).then(({data}) => {
        this.subscription_chart.datasets[0].data= data[0];
        this.plan_chart.datasets[0].data= data[1];
        this.total_plan_payment.datasets[0].data = data[2];

        this.subscription_line.labels=data[3][0];
        this.subscription_line.datasets[0].data=data[3][1];

        this.payments_line.labels=data[4][0];
        this.payments_line.datasets[0].data=data[4][1];

      })
    },
    calendar(item) {
      if(item=='week') {
        this.showMonth='week'
        let itemWeek= {
          request_view: 'week',
          week_request: {
            start: moment(this.start_week).format('YYYY-MM-DD'),
            end :  moment(this.end_week).format('YYYY-MM-DD'),
          },
        };
        this.checkSubscription(itemWeek)
      }
      else if(item=='year') {
        this.showMonth='year'
        let itemMonth= {
          request_view: 'year',
          month_request: this.current_date,
        };
        this.checkSubscription(itemMonth)
      }
      else {
        alert("year")
      }
    },
    increment() {
      if(this.showMonth=='week'){
        this.current_date  = moment(this.current_date, 'YYYY-MM-DD').add('1', 'weeks');
        this.start_week= moment(this.current_date).startOf('week').format('MMMM-DD-YYYY');
        this.end_week= moment(this.current_date).endOf('week').format('MMMM-DD-YYYY');
        this.calendar(this.showMonth)
      } 
      else if(this.showMonth=='year') {
        let addMonth = moment(this.current_date, "YYYY-MM-DD").add(1, 'years').format('YYYY-MM-DD');
        this.current_date = addMonth;
        this.calendar(this.showMonth)
      }
      else {
        alert('error')
      }
    },
    decrement() {
      if(this.showMonth=='week'){
        this.current_date = moment(this.current_date, 'YYYY-MM-DD').subtract('1', 'weeks');
        this.start_week= moment(this.current_date).startOf('week').format('MMMM-DD-YYYY');
        this.end_week= moment(this.current_date).endOf('week').format('MMMM-DD-YYYY');
      }
      else if (this.showMonth=='year') {
        let subtractMonth = moment(this.current_date, "YYYY-MM-DD").subtract(1, 'years').format('YYYY-MM-DD');
        this.current_date = subtractMonth;
      }
      this.calendar(this.showMonth)
    }
  },
};
</script>
