<template>
  <div v-if="!loading">
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
          <v-card height="208">
            <div class="client-info text-center pt-6">
              <h2 class="font-weight-bold mb-4">{{client.full_name}}</h2>
              <div class="caption">
                registered since
                <span class="font-weight-bold">{{frFormat(client.created_at)}}</span>
              </div>
              <div class="caption">
                subscribed since
                <span class="font-weight-bold">{{active_subscription ? frFormat(active_subscription.start_date) : 'none'}}</span>
              </div>
              <div class="caption">
                active_subscription
                <span class="font-weight-bold"> {{ active_subscription ?  computePlanPrice2(active_subscription.price) : 'none'}}</span>
              </div>
            </div>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-container>
            <v-row>
              <v-flex
                xs12
                class="mb-2"
              >
                <v-card height="100">
                  <div class="text-center pt-5">
                    <p class="font-weight-medium text-capitalize formula-text">next calls</p>
                    <div class="font-weight-bold">
                      {{frFormat(client.created_at)}}
                    </div>
                  </div>
                </v-card>
              </v-flex>
              <v-flex
                xs4
                class="pr-2"
              >
                <v-card
                  height="100"
                  class="d-flex align-center text-center px-4"
                >
                  <div>
                    <p class="font-weight-bold text-capitalize ">Faire un feedback</p>
                  </div>
                </v-card>
              </v-flex>
              <v-flex xs4>
                <v-card height="100">
                  <div
                  class="center-number"
                  >51</div>
                  <div class="center-desc">Feedbacks</div>
                </v-card>
              </v-flex>
               <v-flex xs4 class="pl-2">
                <v-card height="100">
                  <div
                  class="center-number"
                  >51</div>
                  <div class="center-desc">Feedbacks</div>
                </v-card>
              </v-flex>
            </v-row>
          </v-container>

        </v-flex>
        <v-flex
          xs4
          class="px-3"
        >
          <v-card height="208">
            <div class="client-info text-center pt-6">
              <h2 class="font-weight-bold mb-4">{{client.full_name}}</h2>
              <div class="caption">
                registered since
                <span class="font-weight-bold">{{frFormat(client.created_at)}}</span>
              </div>
              <div class="caption">
                subscribed since
                <span class="font-weight-bold">{{active_subscription ? frFormat(active_subscription.start_date) : 'none'}}</span>
              </div>
              <div class="caption">
                active_subscription
                <span class="font-weight-bold"> {{ active_subscription ?  computePlanPrice2(active_subscription.price) : 'none'}}</span>
              </div>
            </div>
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
import feedBackForm from "~/components/clients/coaching/feedback/form.vue"
export default {
  name: 'Global',
  components: {
    feedBackForm,
  },
  mixins: [
    priceHelperVue,
    dateHelper
  ],
  data () {
    return {
      client: {},
      loading: false,
      active_subscription: {},
      type:'global',
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
  created () {
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
<style scoped>
.center-number{
  margin: 0;
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: x-large;
  font-weight: bold;
}
.center-desc{
      font-size: smaller;
    position: absolute;
    font-weight: 200;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
