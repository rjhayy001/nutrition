<template>
  <div>
    <v-card
      class="mt-2"
      height="690"
      style="overflow:overlay;"
    >
      <v-toolbar
        dense
        flat
        class="pt-2"
      >
        <v-toolbar-title class="font-weight-bold text-capitalize">
          {{ this.$t('dashboard.newSubscribers') }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-select
          style="width: 100px;"
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
              xs12
              class="px-5 py-2"
              v-for="subscription in subscriptions"
              :key="subscription.id"
            >
              <v-card
                height="90"
                class="d-flex"
              >
                <div
                  style="display:grid; width:28%; "
                  class="my-2 text-center"
                >
                  <div>
                    <v-avatar
                      class="pointer px-1"
                      tile
                      size="50"
                      color="#f8f8f8"
                      @click="editRecord(subscription.client)"
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
                  style=" width:32%;line-height:0;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                >
                  <span
                    class="overline font-weight-bold mb-0"
                    style="font-size:10px !important; color:#7c94de !important;"
                  >{{subscription.client.full_name}} </span>
                  <!-- <div>
                    <v-icon small>mdi-heart</v-icon>
                    <v-icon small>mdi-pencil</v-icon>
                    <v-icon small>mdi-file-image</v-icon>
                    <v-icon small>mdi-tape-measure</v-icon>
                    <v-icon small>mdi-heart</v-icon>
                  </div> -->
                </div>
                <div
                  style="width: 40% !important; position: relative;"
                  class="mt-4 pr-3"
                >
                  <div class="text-right">
                    <v-icon @click="goTo('client-id-chat', {id: subscription.client_id})">mdi-message-text-outline</v-icon>
                    <br>
                  </div>
                  <div style="position: absolute; bottom: 0;">
                     <p
                      class="font-weight-bold  overline underline pointer"
                      style="font-size:10px !important"
                      @click="startCoaching(subscription)"
                      v-if="subscription.form_status"
                    >
                      <u>start coaching</u>
                    </p>
                    <p v-else
                      class="font-weight-bold  overline underline pointer"
                      style="font-size:8px !important; color:red;"
                    >
                      <u>form not completed</u>
                    </p>
                  </div>
                </div>
              </v-card>
            </v-flex>
          </template>
          <template v-else>
            <v-flex
              xs12
              class="px-3 py-2"
            >
              <empty-data />
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
  methods: {
    initialize () {
      this.getSubscriptions()
      this.getPlans()
    },
    getSubscriptions () {
      this.$axios.get(`${this.$subscriptions}?relations=price.plan,client,coach&plan_id=${this.type}&coaching_status=0`).then(({ data }) => {
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
    editRecord (item) {
      this.goTo("client-id-profile", { id: item.id });
    },
    startCoaching(subs){
      this.goTo("client-id-coaching-tracking", {id: subs.client_id})
      // this.$axios.get(`${this.$subscriptions}/start_coaching/${id}`).then(({ data }) => {
      //   this.fullNotification(data)
      //   this.$store.commit('updateTrackingFlag', true)
      //   this.initialize()
      // })
    }
  }
}
</script>
