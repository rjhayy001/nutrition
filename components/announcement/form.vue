<template>
  <v-navigation-drawer
    temporary
    right
    fixed
    v-model="drawer"
    width="40%"
    hide-overlay
  >
    <p
      class="
        form-title
        pa-2
        title
        font-weight-regular
        text-uppercase
        d-flex
        justify-space-between
      "
    >
      Add New Notification
      <v-btn icon small @click="drawer = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </p>
    <v-divider ></v-divider>
    <ValidationObserver ref="form">
      <v-form class="form-box" @submit.prevent="sendForm(true)">
        <v-container grid-list-md>
          <v-layout row wrap class="px-1">
            <v-flex xs12>
              <ValidationProvider slim>
                <div class="mb-1 d-flex announce-text-field">
                  <p
                    class="subtitle-2 font-weight-regular my-auto mr-1"
                  >
                    <span>coach:</span>
                  </p>
                  <v-checkbox
                    class="user-checkbox"
                    v-model="selectedCoachType"
                    label="All Select Coaches"
                    value="all"
                    @change="getCoaches($event)"
                    id="all"
                  ></v-checkbox>
                  <v-checkbox
                    class="user-checkbox"
                    v-model="selectedCoachType"
                    label="Have Client"
                    value="have-clients"
                    @change="getCoaches($event)"
                    id="subscriber"
                  ></v-checkbox>
                  <v-checkbox
                    class="user-checkbox"
                    v-model="selectedCoachType"
                    label="Do not have Client"
                    value="dont-have-clients"
                    @change="getCoaches($event)"
                    id="non-subscriber"
                  ></v-checkbox>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <ValidationProvider slim class="announce-text-field">
                <div class="mb-1 d-flex ">
                  <p
                    class="subtitle-2 font-weight-regular my-auto mr-2"
                  >
                    <span>client:</span>
                  </p>
                  <v-checkbox
                    class="user-checkbox"
                    v-model="selectedClientType"
                    label="All Select Clients"
                    value="all"
                    @change="getClients($event)"
                    id="all"
                  ></v-checkbox>
                  <v-checkbox
                    class="user-checkbox"
                    v-model="selectedClientType"
                    label="Subscriber Clients"
                    value="subscribed"
                    @change="getClients($event)"
                    id="subscriber"
                  ></v-checkbox>
                  <v-checkbox
                    class="user-checkbox"
                    v-model="selectedClientType"
                    label="Non-subscriber Clients"
                    value="not-subscribed"
                    @change="getClients($event)"
                    id="not-subscribed-clients"
                  ></v-checkbox>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <div class="mb-1 d-flex announce-text-field">
                <p
                  class="subtitle-2 font-weight-medium my-auto mr-1"
                >
                  <span>coach:</span>
                </p>
                <v-checkbox
                  v-model="taggleAllCoach"
                  class="user-checkbox"
                  label="Select All"
                ></v-checkbox>
              </div>
            </v-flex>
            <v-flex xs12>
              <ValidationProvider  class="announce-text-field">
                <div class="mb-1">
                  <v-autocomplete
                    deletable-chips
                    class="user-option"
                    v-model="payload.coaches"
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
                      <span v-if="index === 1" class="grey--text text-caption">
                        (+{{ payload.coaches.length - 1 }} selected)
                      </span>
                    </template>
                  </v-autocomplete>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <div class="mb-1 d-flex announce-text-field">
                <p
                  class="subtitle-2 font-weight-medium my-auto mr-1"
                >
                  <span>client:</span>
                </p>
                <v-checkbox
                  v-model="taggleAllClient"
                  class="user-checkbox"
                  label="Select All"
                ></v-checkbox>
              </div>
            </v-flex>
            <v-flex xs12>
              <ValidationProvider class="announce-text-field">
                <div class="mb-1">
                  <v-autocomplete
                    class="user-option"
                    v-model="payload.clients"
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
                      <span v-if="index === 1" class="grey--text text-caption">
                        (+{{ payload.clients.length - 1 }} selected)
                      </span>
                    </template>
                  </v-autocomplete>
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
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <div class="d-flex justify-space-between">
                      <strong>{{
                        payload.type==1 ? "Recurring" : "On Time Only"
                      }}</strong>
                    </div>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="d-flex mb-2 justify-space-between">
                      <v-btn
                        :class="[!payload.type ? 'primary' : 'normal']"
                        width="49%"
                        @click="payload.type = 0"
                      >
                        ONE TIME ONLY
                      </v-btn>
                      <v-btn
                        :class="[payload.type ? 'primary' : 'normal']"
                        width="49%"
                        @click="payload.type = 1"
                      >
                        RECURRING
                      </v-btn>
                    </div>
                    <template v-if="payload.type == 0">
                      <div
                        class="d-flex flex-row "
                      >
                        <div class="col-sm">
                          <p class="subtitle-2 font-weight-regular mb-2">
                            <span>*</span>
                            Time Period
                          </p>
                          <v-menu
                            ref="time"
                            v-model="time"
                            :close-on-content-click="false"
                            :return-value.sync="payload.time"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="payload.time"
                                dense
                                solo
                                prepend-inner-icon="mdi-clock-time-four-outline"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :hide-details="true"
                                class="mb-2"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              format="24hr"
                              :landscape="$vuetify.breakpoint.mdAndUp"
                              v-model="payload.time"
                              @click:minute="$refs.time[i].save(payload.time)"
                            ></v-time-picker>
                          </v-menu>
                        </div>
                        <div class="col-sm">
                          <p class="subtitle-2 font-weight-regular mb-2">
                            <span>*</span>
                            Date
                          </p>
                          <v-menu
                            ref="date"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="payload.date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="payload.date"
                                dense
                                solo
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :hide-details="true"
                                class="mb-2"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="payload.date"
                              no-title
                              scrollable
                            >
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="menu = false">
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.date[i].save(payload.date)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </div>
                      </div>
                    </template>
                    <template v-if="payload.type == 1">
                      <div class="mb-2">
                        <p class="subtitle-2 font-weight-regular mb-2">
                          <span>*</span>
                          Schedule Period
                        </p>
                        <v-select
                          v-model="payload.schedule_period"
                          :items="periodOptions"
                          hide-details="auto"
                          solo
                          item-text="text"
                          item-value="id"
                        ></v-select>
                      </div>
                      <template v-if="payload.schedule_period == 7">
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
                            v-model="payload.cycle_count"
                          ></v-text-field>
                        </div>
                        <div class="mb-2">
                          <p class="subtitle-2 font-weight-regular mb-2">
                            <span>*</span>
                            Cycle Type
                          </p>
                          <v-select
                            v-model="payload.cycle_type"
                            :items="cycleOptions"
                            hide-details="auto"
                            solo
                            item-text="text"
                            item-value="id"
                          ></v-select>
                        </div>
                      </template>
                    </template>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-flex>
            <v-flex xs12>
              <ValidationProvider
                slim
                name="title"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="mb-1">
                  <v-flex xs12>
                    <p class="subtitle-1 font-weight-medium text-uppercase">
                      Title:
                    </p>
                  </v-flex>
                  <v-text-field
                    v-model="payload.title"
                    placeholder="Type your Title ..."
                    hide-details="auto"
                    type="text"
                    :error-messages="errors"
                    solo
                  ></v-text-field>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <ValidationProvider>
                <div class="mb-1">
                  <v-flex xs12>
                    <p class="subtitle-1 font-weight-medium text-uppercase">
                      Message:
                    </p>
                  </v-flex>
                  <v-text-field
                    v-model="payload.message"
                    name="message"
                    placeholder="Type your Message ..."
                    hide-details="auto"
                    type="text"
                    solo
                  ></v-text-field>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <div
                class="d-flex mb-2 justify-space-between w-100"
              >
                <v-btn
                  class="success mt-1"
                  @click="sendForm(false)"
                  width="49%"
                  type="submit"
                >
                  <v-icon>mdi-content-save-outline</v-icon>
                  {{ payload.id ? "Update" : "Save" }}
                </v-btn>
                <v-btn
                  @click="sendForm(true)"
                  class="success mt-1"
                  width="49%"
                >
                  <v-icon>mdi-content-save-outline</v-icon>
                  Send
                </v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </ValidationObserver>
  </v-navigation-drawer>
</template>
<script>
import moment from "moment";
const is_ricurring = 1;
export default {
  data() {
    return {
      time: false,
      menu: false,
      taggleAllCoach: true,
      taggleAllClient: true,
      selectedClientType: "all",
      selectedCoachType: "all",
      payload: {
        clients: [],
        coaches: [],
        status: "",
        is_sent: 0,
        title: "",
        message: "",
        time: moment().format("HH:mm"),
        date: moment().format("YYYY-MM-DD"),
        type: 0,
        schedule_period: 3,
        cycle_count: 2,
        cycle_type: 3,
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
      cycleOptions: [
        { id: 1, text: "Daily" },
        { id: 2, text: "Weekly" },
        { id: 3, text: "Monthly" },
      ],
      clients: [],
      coaches: [],
      drawer: false,
      originalPayload: null,
    };
  },
  props: {
    drawerStatus: {
      type: Boolean,
      default: () => false,
    },

    selectedItem: {
      type:Object,
      default:() => {}
    }
  },

  mounted() {
    this.initialize()
  },
  methods: {
    initialize () {
      this.selectAllCoach();
      this.selectAllClient();
      this.getClients();
      this.getCoaches();
    },
    sendForm(is_sent) {
      this.$refs.form.validate().then((result) => {
        if (!result) return;
        this.payload.is_sent = is_sent;
        if(is_sent) {
          if(this.payload.id) {
            this.payload.status = 0;
            this.$emit("updateRecord", this.payload);
          }else{
            this.payload.status = 1;
            this.$emit("addRecord", this.payload);
          }
        }else{
          this.payload.status = 0;
          this.$emit("saveRecord", this.payload)
        }
      });
    },
    selectAllCoach() {
      if (this.taggleAllCoach == true) {
        const selectedCoachIds = this.coaches.map(({ id }) => id);
        this.payload.coaches = selectedCoachIds;
      } else {
        this.payload.coaches = [];
      }
    },
    selectAllClient() {
      if (this.taggleAllClient == true) {
        const selectedClientIds = this.clients.map(({ id }) => id);
        this.payload.clients = selectedClientIds;
      } else {
        this.payload.clients = [];
      }
    },
    getClients(type) {
      this.$axios
        .get(`clients?type=${type}&no-paginate=true`)
        .then(({ data }) => {
          this.clients = data.data;
          console.log(this.clients,"clients")
          this.selectAllClient()
        });
    },
    getCoaches(type) {
      this.$axios
        .get(`coaches?type=${type}&no-paginate=true`)
        .then(({ data }) => {
          this.coaches = data.data;
          this.selectAllCoach()
        });
    },
    getItemText(item) {
      return `${item.first_name} ${item.last_name}`;
    },
  },
  watch: {
    taggleAllCoach: {
      handler(val) {
        this.selectAllCoach(val);
      },
    },
    taggleAllClient: {
      handler(val) {
        this.selectAllClient(val);
      },
    },
    // '$store.state.resetForm'(val) {
    //   if(val) {
    //     this.payload = this.cloneVariable(this.originalPayload)
    //     this.$store.commit('resetForm', false)
    //   }
    // },
    drawerStatus(val) {
      if (val && !this.originalPayload) 
        this.originalPayload = this.cloneVariable(this.payload);
        this.drawer = val;
    },
    drawer(val) {
      if (!val) {
        if (this.payload.id)
          this.payload = this.cloneVariable(this.originalPayload);
        this.$emit("closeDrawer");
      }
    },
    selectedItem: {
      handler(val) {
        this.payload = this.cloneVariable(val);

        const selectedClientIds = this.payload.clients.map(({ id }) => id);
        this.payload.clients = selectedClientIds; 

        const selectedCoachesIds = this.payload.coaches.map(({ id }) => id);
        this.payload.coaches = selectedCoachesIds;
      },
      deep: true,
    }
  },
};
</script>