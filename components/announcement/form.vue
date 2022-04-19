<template>
  <v-navigation-drawer
    temporary
    right
    fixed
    v-model="drawer"
    width="40%"
    hide-overlay
  >
    <p class="form-title pa-2 title font-weight-regular text-uppercase d-flex justify-space-between">
      Add New Notification
      <v-btn icon small @click="drawer = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </p>
    <v-divider class="mb-2"></v-divider>
    <ValidationObserver ref="form">
      <v-form class="form-box" @submit.prevent="saveForm">
        <v-container grid-list-md>
          <v-layout row wrap class="px-1">
            <v-flex xs12 style="height: 2em">
              <ValidationProvider slim>
                <div class="mb-1 d-flex">
                  <p class="subtitle-2 font-weight-regular my-auto" style="margin-bottom!important; margin-right: 0.85em">
                    <span>coach:</span>
                  </p>
                  <v-checkbox
                    class="user-checkbox"
                    v-model="selectedCoachType"
                    label="All Select Coaches"
                    value="all"
                    id="all"
                  ></v-checkbox>
                  <v-checkbox
                    class="user-checkbox"
                    v-model="selectedCoachType"
                    label="Have Client"
                    value="has-clients"
                    id="subscriber"
                  ></v-checkbox>
                  <v-checkbox
                    class="user-checkbox"
                    v-model="selectedCoachType"
                    label="Do not have Client"
                    value="dont-have-clients"
                    id="non-subscriber"
                  ></v-checkbox>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 style="height: 4em">
              <ValidationProvider slim>
                <div class="mb-1 d-flex">
                  <p class="subtitle-2 font-weight-regular my-auto" style="margin-bottom!important; margin-right: 1em">
                    <span>client:</span>
                  </p>
                  <v-checkbox
                    class="user-checkbox"
                    v-model="selectedClientType"
                    label="All Select Clients"
                    value="all"
                    id="all"
                  ></v-checkbox>
                  <v-checkbox
                    class="user-checkbox"
                    v-model="selectedClientType"
                    label="Subscriber Clients"
                    value="subscribed-clients"
                    id="subscriber"
                  ></v-checkbox>
                  <v-checkbox
                    class="user-checkbox"
                    v-model="selectedClientType"
                    label="Non-subscriber Clients"
                    value="non-subscriber"
                    id="not-subscribed-clients"
                  ></v-checkbox>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <div class="mb-1 d-flex">
                <p class="subtitle-2 font-weight-medium my-auto" style="margin-bottom!important; margin-right: 0.85em">
                  <span>coach:</span>
                </p>
                <v-checkbox
                  v-model="coachSelect"
                  class="user-checkbox"
                  label="Select All"
                ></v-checkbox>
              </div>
            </v-flex>
            <v-flex xs12>
              <ValidationProvider>
                <div class="mb-1">
                  <v-autocomplete
                    deletable-chips
                    class="user-option"
                    v-model="payload.coach"
                    :items="coaches"
                    placeholder="Select Coach ..."
                    dense
                    solo
                    chips
                    small-chips
                    clearable
                    hide-details="auto"
                    multiple
                    prepend-inner-icon="mdi-plus"
                    item-value="id"
                    :item-text="getItemText"
                  >
                    <template v-slot:selection="{ item, index }">
                      <v-chip v-if="index === 0">
                        <span>{{ item.full_name }}</span>
                      </v-chip>
                      <span
                        v-if="index === 1"
                        class="grey--text text-caption"
                      >
                        (+{{ payload.coach.length - 1 }} selected)
                      </span>
                    </template>
                  </v-autocomplete>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
             <div class="mb-1 d-flex">
                <p class="subtitle-2 font-weight-medium my-auto" style="margin-bottom!important; margin-right: 0.85em">
                  <span>client:</span>
                </p>
                <v-checkbox
                  v-model="clientSelect"
                  class="user-checkbox"
                  label="Select All"
                ></v-checkbox>
              </div>
            </v-flex>
            <v-flex xs12>
              <ValidationProvider>
                <div class="mb-1">
                  <v-autocomplete
                    class="user-option"
                    v-model="payload.client"
                    :items="clients"
                    placeholder="Select Client ..."
                    dense
                    solo
                    chips
                    clearable
                    small-chips
                    hide-details="auto"
                    multiple
                    prepend-inner-icon="mdi-plus"
                    :item-text="getItemText"
                    item-value="id"
                  >
                    <template v-slot:selection="{ item, index }">
                      <v-chip v-if="index === 0">
                        <span>{{ item.full_name }}</span>
                      </v-chip>
                      <span
                        v-if="index === 1"
                        class="grey--text text-caption"
                      >
                        (+{{ payload.client.length - 1 }} selected)
                      </span>
                    </template> 
                  </v-autocomplete>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 v-if="selectedClientType != 'non-subscriber'">
              <p class="subtitle-1 font-weight-medium">Subscription</p>
            </v-flex>
            <v-flex xs12 v-if="selectedClientType != 'non-subscriber'">
              <ValidationProvider slim>
                <div class="mb-1">
                  <v-select
                    v-model="payload.abonnement_id"
                    :items="subscribeOptions"
                    placeholder="Select Subscription ..."
                    item-value="id"
                    item-text="name"
                    hide-details="auto"
                    solo
                  ></v-select>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <p class="subtitle-1 font-weight-medium my-2 text-uppercase">
                Set-up
              </p>
            </v-flex>
            <v-flex xs12>
              <v-expansion-panels v-model="panel">
                <v-expansion-panel
                  v-for="(set_up, i) in payload.set_ups"
                  :key="i"
                >
                  <v-expansion-panel-header>
                    <div class="d-flex justify-space-between">
                      {{payload.type ? "Recurring" : "On Time Only"}}
                    </div>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="d-flex mb-2 justify-space-between">
                      <v-btn
                        :class="[!payload.type ? 'primary' : 'normal']"
                        style="width: 49%"
                        @click="payload.type = 0"
                      >
                        ONE TIME ONLY
                      </v-btn>
                      <v-btn
                        :class="[payload.type ? 'primary' : 'normal']"
                        style="width: 49%"
                        @click="payload.type = 1"
                      >
                        RECURRING
                      </v-btn>
                    </div>
                    <p class="subtitle-2 font-weight-regular mb-2">
                      <span>*</span>
                      Time Period
                    </p>
                    <v-col cols="12" class="pb-1 pt-2">
                      <v-menu
                        ref="time"
                        v-model="set_time"
                        :close-on-content-click="false"
                        :return-value.sync="payload.time"
                        transition="scale-transition"
                        offset-y
                        :nudge-right="40"
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn 
                            v-on="on" 
                            v-bind="attrs" 
                            width="100%" 
                            large
                            style="color:#909090; justify-content: initial;"
                          >
                            <v-icon class="mr-2">mdi-clock-outline</v-icon>
                            {{payload.time ? payload.time : "Choose the time"}}
                          </v-btn>
                        </template>
                        <v-time-picker
                          format="24hr"
                          :landscape="$vuetify.breakpoint.mdAndUp"
                          v-model="payload.time"
                          @click:minute="$refs.time[i].save(payload.time)"
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                    <template v-if="payload.type == 1">
                      <div class="mb-2">
                        <p class="subtitle-2 font-weight-regular mb-2">
                          <span>*</span>
                          Schedule Period
                        </p>
                        <v-select
                          v-model="set_up.schedule_period"
                          :items="periodOptions"
                          hide-details="auto"
                          solo
                          item-text="text"
                          item-value="id"
                        ></v-select>
                        <template v-if="set_up.schedule_period == 7">
                          <div class="mb-2">
                            <p class="subtitle-2 font-weight-regular mb-2">
                              <span>*</span>
                              Cycle Count
                            </p>
                            <v-text-field
                              placeholder="Type total cycle..."
                              type="text"
                              hide-details="auto"
                              solo
                              v-model="set_up.recycle_count"
                            ></v-text-field>
                          </div>
                          <div class="mb-2">
                            <p class="subtitle-2 font-weight-regular mb-2">
                              <span>*</span>
                              Cycle Type
                            </p>
                            <v-select
                              v-model="set_up.recycle_type"
                              :items="recycleOptions"
                              hide-details="auto"
                              solo
                              item-text="text"
                              item-value="id"
                            ></v-select>
                          </div>
                        </template>
                      </div>
                    </template>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-flex>
            <v-flex xs12>
              <ValidationProvider slim>
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">Title:</p>
                  <v-text-field
                    v-model="payload.title"
                    name="email_1"
                    placeholder="Type your Title ..."
                    hide-details="auto"
                    type="text"
                    solo
                  ></v-text-field>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <ValidationProvider slim>
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">Message:</p>
                  <v-text-field
                    v-model="payload.message"
                    name="email_1"
                    placeholder="Type your Message ..."
                    hide-details="auto"
                    type="text"
                    solo
                  ></v-text-field>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <v-btn class="success mt-1" block type="submit">
                <v-icon>mdi-content-save-outline</v-icon>
                SAVE
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </ValidationObserver>
  </v-navigation-drawer>
</template>
<script>
import moment from 'moment';
export default {
  data() {
    return {
      coachSelect: true,
      clientSelect: true,
      drawer: false,
      selectedClientType: "all",
      selectedCoachType: "all",
      subscribeOptions: ["sad", "sad2"],
      payload: {
        client: [],
        coach: [],
        abonnement_id: "",
        status: "",
        title: "",
        message: "",
        time:moment().format('HH:mm'),  
        type: 0,
        set_ups: [
          {
            schedule_period: 3,
            recycle_count: 2,
            recycle_type: 3,
          },
        ],
      },
      set_time: false,
      panel: 1,
      periodOptions: [
        { id: 1, text: "Daily" },
        { id: 2, text: "Weekly" },
        { id: 3, text: "Monthly" },
        { id: 4, text: "Every 3 months" },
        { id: 5, text: "Every 6 months" },
        { id: 6, text: "Every Year" },
        { id: 7, text: "Custom" },
      ],
      recycleOptions:[
        { id: 1, text: "Daily" },
        { id: 2, text: "Weekly" },
        { id: 3, text: "Monthly" },
      ],
      clients: [],
      coaches: [],
    };
  },
  props: {
    drawerStatus: {
      type: Boolean,
      default: () => false,
    },
    
    // selectedItem: {
    //   type:Object,
    //   default:() => {}
    // }
  },
  mounted() {
    this.getCoaches()
    this.getClients()
  },
  methods: {
    selectAllCoach() {
      if (this.coachSelect==true){
        this.payload.coach=[];
        const selectedCoachIds = this.coaches.map(({ id }) => id);
        this.payload.coach=selectedCoachIds;
      }
    },
    selectAllClient() {
      if (this.clientSelect==true){
        this.payload.client=[];
        const selectedClientIds = this.clients.map(({ id }) => id);
        this.payload.client=selectedClientIds;
        console.log("CLIENT",selectedClientIds)
      }
    },
    getPriceTitle(set_up) {
      return `${set_up.type ? set_up.type : "One Time Only"}`;
    },
    saveForm() {  
      this.$refs.form.validate().then(result => {
        if (!result) return
        if (this.payload.id) {
          this.$emit('updateRecord', this.payload)
        } else {
          this.$emit('addRecord', this.payload)
        }
      })
    },
    getClients(type) {
      this.$axios
      .get(`clients?type=${type}&no-paginate=true`)
      .then(({ data }) => {
        this.clients = data.data;
      });
    },
    getCoaches(type) {
      this.$axios
        .get(`coaches?type=${type}&no-paginate=true`)
        .then(({ data }) => {
          this.coaches = data.data;
        });
    },
    getItemText(item) {
      return `${item.first_name} ${item.last_name}`;
    },
  },
  watch: {
    drawerStatus(val) {
      if (val) this.drawer = val;

      if (val == true) {
        this.getClients(this.selectedClientType);
        this.getCoaches(this.selectedCoachType);
        this.selectAllCoach();
        this.selectAllClient();
      }
    },
    drawer(val) {
      if (!val) {
        this.$emit("closeDrawer");
      }
    },
    payload: {
      handler(val) {
        alert(val)
      }
    },
    selectedClientType: {
      handler(val) {
        this.getClients(val);
        return;
      },
    },
    selectedCoachType: {
      handler(val) {
        this.getCoaches(val);
        if(val){
          return;
        }
      },
    },
    coachSelect: {
      handler(val) {
        this.payload.coach=[];
        this.selectAllCoach();
      }
    },
    clientSelect: {
      handler(val) {
        this.payload.client=[];
        this.selectAllClient();
      }
    },

    
    // selected: {
    //   handler(val) {
    //     this.userCategoty()
    //   }
    // }
    // selectedItem: {
    //   handler(val) {
    //     if (!this.originalPayload) {
    //       this.originalPayload = this.cloneVariable(this.countryPayload)
    //     }
    //     this.countryPayload = this.cloneVariable(val)
    //   },
    //   deep:true
    // }
  },
};
</script>

<style scoped>
</style>