<template>
  <div>
    <!-- active subscription : ( {{ active_subscription ?  computePlanPrice2(active_subscription.price) : 'none'}} ) <br />
    Coach : {{ active_subscription ? active_subscription.coach.full_name : 'none'}} <br />
    subscription duration: {{ active_subscription ? active_subscription.duration : 'none' }} <br />
    feedback count: 0, <br />
    next meeting: date
    {{active_subscription}} -->
    <v-container class="mt-4">
      <v-row>
        <v-flex xs4 class="px-3">
          <subscription-info :client="client" :active_subscription="active_subscription" @reload="initialize">
          </subscription-info>
        </v-flex>
        <v-flex xs4>
          <calls-feedback @openFeedBack="form_value=true" :client="client" :loading="loading" :active_subscription="active_subscription">
          </calls-feedback>
        </v-flex>
        <!-- <v-flex xs4>
          <calls-feedback :client="client" :loading="loading" :active_subscription="active_subscription">
          </calls-feedback>
        </v-flex> -->
        <v-flex xs6 class="mt-4 px-2">
          <history :histories="histories"/>
        </v-flex>
        <v-flex xs6 class="mt-4 px-2">
          <v-toolbar flat dense>
            <v-toolbar-title class="font-weight-medium">Tous les points hebdomadaires</v-toolbar-title>
          </v-toolbar>
          <v-card style="overflow:auto" height="450" class="pa-3">
            <v-data-table :headers="headers" hide-default-footer hide-default-header :items="items" :items-per-page="-1"
              class="elevation-1 stripe-table">
              
                <template v-slot:item.date="{ item }">
                  <template>
                      {{item.coach_schedule.date}}
                  </template>
                </template>
                <template v-slot:item.day="{ item }">
                  <template>
                      {{getDay(item.coach_schedule.date)}}
                  </template>
                </template>
                <template v-slot:item.time="{ item }">
                  <template>
                      {{item.time}}
                  </template>
                </template>
              </v-data-table>
          </v-card>
        </v-flex>
      </v-row>
      <feed-back-form :form_value="form_value" @close="form_value=false" :feedback_type="type" @reload="initialize"></feed-back-form>
    </v-container>
  </div>
</template>
<script>
import priceHelperVue from "@/mixins/priceHelper.vue";
import dateHelper from "@/mixins/dateHelper.vue";
import subscriptionInfo from "~/components/clients/coaching/global/subscription_info.vue"
import callsFeedback from "~/components/clients/coaching/global/calls_feedback.vue"
import feedBackForm from "~/components/clients/coaching/feedback/form.vue"
import history from "~/components/clients/coaching/global/history.vue"
import moment from 'moment'

export default {
  name: 'Global',
  components: {
    feedBackForm,
    subscriptionInfo,
    callsFeedback,
    history
  },
  mixins: [
    priceHelperVue,
    dateHelper
  ],
  data() {
    return {
      form_value:false,
      client: {},
      loading: false,
      type: 'global',
      active_subscription: {
        coaching_started: 0,
        price:{
          price:0
        }
      },
      headers: [
        { text: 'Action', value: 'date' },
        { text: 'day', value: 'day' },
        { text: 'Date', value: 'time' },
      ],
      histories: [],
      items: [],
    }
  },
  mounted() {
    this.initialize();
    this.getAppointment();
  },
  methods: {
    initialize() {
      this.loading = true
      this.$axios
        .get(
          `${this.$clients}/${this.$route.params.id}/edit?relations=country,city,zipcode,subscriptions`
        )
        .then(({ data }) => {
          this.client = data;
          this.active_subscription = data.active_subscription ? data.active_subscription[0] : {}
          console.log(this.active_subscription, 'subs')
          this.loading = false
          this.getHistory();
        });
    },
    getHistory() {
      this.$axios
        .get(`${this.$history}/${this.active_subscription.id}`)
        .then(({ data }) => {
          this.histories = data
          console.log(data, 'data')
        });
    },
    cancelCall(item){
        this.confirmDelete = true;
        this.datas = item;
    },
    confirmDeletecall(){
        this.confirmDelete = false;
        this.$axios
        .delete(
          `coachappointment/`+this.datas.id
        )
        .then(({ data }) => {
          this.successDeleteCall('Call successfully deleted')
          this.getAppointment();
        });
    },
    getAppointment(){
        this.loader = true;
        this.items = [];
        this.$axios
        .get(
          `coachappointment/`+`${this.$route.params.id}`
        )
        .then(({ data }) => {
          console.log(data);
          // return;
          this.items = data;
          // this.loader = false;
        });
    },
    getDateAppoint(){
       this.getAppointment();
    },
    getDay(date){
      var weekDayName =  moment(date).format('dddd');
      return weekDayName;
    },
  }
}
</script>

