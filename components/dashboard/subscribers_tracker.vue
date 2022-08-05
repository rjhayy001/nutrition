<template>
  <div>
    <v-card
      class="mt-2"
      height="690"
    >
      <v-toolbar
        dense
        flat
        class="pt-2"
      >
        <v-toolbar-title class="font-weight-bold text-capitalize">
          {{ this.$t('dashboard.subscribersTracking') }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-select
          style="width: 0px;"
          :items="plans"
          label="Solo field"
          dense
          item-text="name"
          item-value="id"
          hide-details="auto"
          v-model="type"
          class=" custom-width"
          @change="getSubscriptions"
          solo
        >
        </v-select>
      </v-toolbar>
      <v-divider class="mt-5"></v-divider>
      <v-container>
        <v-row class="pt-2">
          <template v-if="subscriptions.length">
            <v-flex
              xs6
              class="px-3 py-2 pointer"
              v-for="subscription in subscriptions"
              :key="subscription.id"
              @click="toFormula(subscription)"
            >
              <v-card
                height="90"
                class="d-flex"
              >
                <div
                  style="display:grid; width:33%; "
                  class="my-2 text-center"
                >
                  <div>
                    <v-avatar
                    class="pointer px-1"
                      tile
                      size="50"
                      color="#f8f8f8"
                      @click.stop="editRecord(subscription.client)"
                    >
                      <v-img
                        contain
                        :src="subscription.client.logo || '/logo.svg'"
                        alt="John"
                      />
                    </v-avatar>
                  </div>
                  <span
                    class="font-weight-bold  overline"
                    style="font-size:10px !important"
                  >{{defaultNumberDate(subscription.start_date)}}</span>
                </div>
                <div
                  class="mt-4"
                  style=" width:37%;line-height:0;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                >
                  <span
                    class="overline font-weight-bold mb-0"
                    style="font-size:10px !important; color:#7c94de !important;"
                  >{{subscription.client.full_name}} </span>
                  <div>
                    <v-icon
                      small
                    >mdi-heart</v-icon>
                    <v-icon small>mdi-pencil</v-icon>
                    <v-icon small>mdi-file-image</v-icon>
                    <v-icon small>mdi-tape-measure</v-icon>
                    <v-icon small>mdi-heart</v-icon>
                  </div>
                </div>
                <div
                  style="width: 30% !important; display:grid;"
                  class="mt-2 pr-3"
                >
                  <div class="text-right" style="height: 50px">
                    <v-icon @click.stop="goTo('client-id-chat', {id: subscription.client_id})">mdi-message-text-outline</v-icon>
                  </div>
                  <span
                    class="font-weight-bold  overline"
                    style="font-size:10px !important"
                  >1 day ago</span>
                </div>
              </v-card>
            </v-flex>
          </template>
          <template v-else>
          <v-flex
            xs12
            class="px-3 py-2"
          >
            <empty-data/>
          </v-flex>
        </template>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import emptyData from "~/components/error/empty_data.vue"
export default {
  components: {
    emptyData
  },
  data () {
    return {
      plans: ['all', 'macro solo', '100% accompagne'],
      type: 0,
      subscriptions: [],
    }
  },
  mounted () {
    this.initialize()
  },
  computed: {
    flag () {
      return this.$store.getters.trackingFlag
    }
  },
   watch: {
    flag (val) {
      if (val) {
        this.initialize();
        this.$store.commit('updateTrackingFlag', false)
      }
    },
  },
  methods: {
    initialize () {
      this.getSubscriptions()
      this.getPlans()
    },
    getSubscriptions () {
      this.$axios.get(`${this.$subscriptions}?relations=price.plan,client,coach&plan_id=${this.type}&coaching_status=1`).then(({ data }) => {
        console.log(data, 'tessts')
        this.subscriptions = data.data
      })
    },
    getPlans () {
      this.$axios
        .get(`${this.$plans}?relations=prices`)
        .then(({ data }) => {
          this.$arrayupdater(this.select_addOn, data.data)
          this.plans = data.data
        });
    },
    editRecord(item) {
      this.goTo("client-id-profile", { id: item.id });
    },
    toFormula(item){
      this.goTo("client-id-coaching-formula-food", {id: item.client_id})
    }
  }
}
</script>
