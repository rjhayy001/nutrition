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
          <calls-feedback :client="client" :loading="loading" :active_subscription="active_subscription">
          </calls-feedback>
        </v-flex>
        <v-flex xs4>
          <calls-feedback :client="client" :loading="loading" :active_subscription="active_subscription">
          </calls-feedback>
        </v-flex>
        <v-flex xs6 class="mt-4 px-2">
          <v-toolbar flat dense>
            <v-toolbar-title class="font-weight-medium">Dernier feedback il y a 7 jours</v-toolbar-title>
          </v-toolbar>
          <v-card style="overflow:auto" height="450" class="pa-3">

            <v-data-table :headers="headers" :items="histories" hide-default-footer hide-default-header
              :items-per-page="-1" class="elevation-1 stripe-table">
              <template v-slot:item.created_at="{ item }">
                {{defaultDate(item.created_at)}}
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
        <v-flex xs6 class="mt-4 px-2">
          <v-toolbar flat dense>
            <v-toolbar-title class="font-weight-medium">Tous les points hebdomadaires</v-toolbar-title>
          </v-toolbar>
          <v-card style="overflow:auto" height="450" class="pa-3">
            <v-data-table :headers="headers" hide-default-footer hide-default-header :items-per-page="-1"
              class="elevation-1 stripe-table"></v-data-table>
          </v-card>
        </v-flex>
      </v-row>
      <feed-back-form :feedback_type="type" @reload="initialize"></feed-back-form>
    </v-container>
  </div>
</template>
<script>
import priceHelperVue from "@/mixins/priceHelper.vue";
import dateHelper from "@/mixins/dateHelper.vue";
import subscriptionInfo from "~/components/clients/coaching/global/subscription_info.vue"
import callsFeedback from "~/components/clients/coaching/global/calls_feedback.vue"
import feedBackForm from "~/components/clients/coaching/feedback/form.vue"
export default {
  name: 'Global',
  components: {
    feedBackForm,
    subscriptionInfo,
    callsFeedback
  },
  mixins: [
    priceHelperVue,
    dateHelper
  ],
  data() {
    return {
      client: {},
      loading: false,
      type: 'global',
      active_subscription: {
        coaching_started: 0,
      },
      headers: [
        { text: 'Action', value: 'logs' },
        { text: 'Date', value: 'created_at' },
      ],
      histories: [],
    }
  },
  mounted() {
    this.initialize();
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
  }
}
</script>

