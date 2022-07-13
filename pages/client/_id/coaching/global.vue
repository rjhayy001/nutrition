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
        <v-flex
          xs4
          class="px-3"
        >
          <subscription-info
            :client="client"
            :active_subscription="active_subscription"
            @reload="initialize"
          >
          </subscription-info>
        </v-flex>
        <v-flex xs4>
          <calls-feedback
            :client="client"
            :loading="loading"
            :active_subscription="active_subscription"
          ></calls-feedback>
        </v-flex>
        <v-flex
          xs4
        >
          <calls-feedback
            :client="client"
            :loading="loading"
            :active_subscription="active_subscription"
          ></calls-feedback>
        </v-flex>
        <v-flex
          xs6
          class="mt-4 px-2"
        >
          <v-card
            style="overflow:auto"
            height="450"
            class="pa-3"
          >
            <v-toolbar
              flat
              dense
            >
              <v-toolbar-title class="font-weight-medium">Dernier feedback il y a 7 jours</v-toolbar-title>
            </v-toolbar>
            <v-data-table
              :headers="headers"
              :items="desserts"
              hide-default-footer
              hide-default-header
              :items-per-page="-1"
              class="elevation-1 stripe-table"
            ></v-data-table>
          </v-card>
        </v-flex>
         <v-flex
          xs6
          class="mt-4 px-2"
        >
          <v-card
            style="overflow:auto"
            height="450"
            class="pa-3"
          >
            <v-toolbar
              flat
              dense
            >
              <v-toolbar-title class="font-weight-medium">Tous les points hebdomadaires</v-toolbar-title>
            </v-toolbar>
            <v-data-table
              :headers="headers"
              :items="desserts"
              hide-default-footer
              hide-default-header
              :items-per-page="-1"
              class="elevation-1 stripe-table"
            ></v-data-table>
          </v-card>
        </v-flex>
      </v-row>
    <feed-back-form :feedback_type="type"></feed-back-form>
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
  data () {
    return {
      client: {},
      loading: false,
      active_subscription: {
        coaching_started:0,
      },
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
      ],
    }
  },
  mounted () {
    this.initialize();
  },
  methods: {
    initialize () {
      this.loading = true
      this.$axios
        .get(
          `${this.$clients}/${this.$route.params.id}/edit?relations=country,city,zipcode,subscriptions`
        )
        .then(({ data }) => {
          console.log(data, 'test')
          this.client = data;
          this.active_subscription = data.active_subscription ? data.active_subscription[0] : {}
          console.log(this.active_subscription, 'subs')
          this.loading = false
        });
    },
  }
}
</script>

