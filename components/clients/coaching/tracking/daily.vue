<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-capitalize">
      Les Daily
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-container>
        <v-row>
          <v-flex
            xs12
            class="mb-4"
          >
            <v-toolbar
              flat
              dense
            >
              <v-spacer></v-spacer>
              <v-menu
                v-model="date_menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <div style="display:flex;">
                    <v-icon
                      @click="prevDay"
                      color="primary"
                    >mdi-arrow-left-bold-circle</v-icon>
                    <p
                      v-bind="attrs"
                      v-on="on"
                      class="mx-6 mt-1"
                    >
                      {{defaultDate(date)}}
                    </p>
                    <v-icon
                      @click="nextDay"
                      color="primary"
                    >mdi-arrow-right-bold-circle</v-icon>
                  </div>
                </template>
                <v-date-picker
                  v-model="date"
                  color="primary"
                  @input="date_menu = false"
                ></v-date-picker>
              </v-menu>
              <v-spacer></v-spacer>
            </v-toolbar>
          </v-flex>
          <v-flex xs4>
            <stress-tracking
              :date="date"
              :data="data"
            ></stress-tracking>
          </v-flex>
          <v-flex xs4>
            <sleep-tracking :data="data"></sleep-tracking>
          </v-flex>
          <v-flex xs4>
            <v-card
              class="mx-2 mb-2 pa-3"
              height="196"
              style="position:relative;"
            >
              <div class="ml-2 text-capitalize font-weight-medium">
                smoke
              </div>
              <div
                v-if="data.smoke"
                class="text-center"
                style="position:absolute; left:50%; top:50%; transform:translate(-50%, -50%);"
              >
                <template v-if="data.smoke == 'no'">
                  <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-on="on"
                        v-bind="attrs"
                        size="80"
                        color="error"
                      >mdi-close-circle-outline</v-icon>
                    </template>
                    <span>did not smoke</span>
                  </v-tooltip>
                </template>
                <template v-else>
                  <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        size="80"
                        v-on="on"
                        v-bind="attrs"
                        color="primary"
                      >mdi-check-circle-outline</v-icon>
                    </template>
                    <span>smoke</span>
                  </v-tooltip>
                </template>

              </div>
              <div v-else>
                <empty-data></empty-data>
              </div>
              <!-- <v-progress-circular
                :rotate="360"
                :size="100"
                :width="15"
                :value="value"
                color="teal"
              >
                {{value}}
              </v-progress-circular> -->
            </v-card>
            <v-card
              class="mx-2 mt-2 pa-3"
              height="196"
              style="position:relative;"
            >
              <div class="ml-2 text-capitalize font-weight-medium">
                alcohol
              </div>
              <div style="position:absolute; color: rgb(124, 148, 222); font-weight:600;  left:50%; top:50%; transform:translate(-50%, -50%);">
                {{data.alcohol ? data.alcohol : 'Not Set Yet' }}
              </div>
            </v-card>
          </v-flex>
          <v-flex
            xs8
            class="mt-4"
          >
            <v-card
              class="mx-2 mb-2 pa-3"
              height="80"
              style="position:relative;"
            >
              <div class="ml-2 text-capitalize font-weight-medium">
                medication
              </div>
              <div style="position:absolute; color: rgb(124, 148, 222); font-weight:600;  left:50%; top:50%; transform:translate(-50%, -50%);">
                {{data.medication ? data.medication : 'Not Set Yet' }}
              </div>
            </v-card>
            <v-card
              class="mx-2 mb-2 pa-3"
              height="80"
              style="position:relative;"
            >
              <div class="ml-2 text-capitalize font-weight-medium">
                complement alimentaires
              </div>
              <div style="position:absolute; color: rgb(124, 148, 222); font-weight:600;  left:50%; top:50%; transform:translate(-50%, -50%);">
                {{data.supplements ? data.supplements : 'Not Set Yet' }}
              </div>
            </v-card>
          </v-flex>
          <v-flex
            xs4
            class="mt-4"
            style="position:relative;"
          >
            <v-card
              class="mx-2 mb-2 pa-3"
              height="168"
            >
              <div class="ml-2 text-capitalize font-weight-medium">
                training
              </div>
              <div style="position:absolute; color: rgb(124, 148, 222); font-weight:600;  left:50%; top:50%; transform:translate(-50%, -50%);">
                {{data.training ? data.training : 'Not Set Yet' }}
              </div>
            </v-card>
          </v-flex>
        </v-row>
      </v-container>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import moment from "moment";
import stressTracking from '@/components/clients/coaching/tracking/daily/stressTracking.vue'
import sleepTracking from '@/components/clients/coaching/tracking/daily/sleepTracking.vue'
import dateHelper from "~/mixins/dateHelper.vue";
export default {
  mixins: [dateHelper],
  components: {
    stressTracking,
    sleepTracking
  },
  data () {
    return {
      value: 0,
      date_menu: false,
      date: moment().format("YYYY-MM-DD"),
      data: {
        stress: 0,
        sleep: 0
      }
    }
  },
  props: {
    active_subs: {
      type: Object,
      default: () => {
      },
    },
  },
  created () {
    setTimeout(() => {
      this.value = 40
      this.initialize();
    }, 2000);
  },
  methods: {
    nextDay () {
      this.date = moment(this.date).add(1, 'days').format("YYYY-MM-DD");
      this.initialize()
    },
    prevDay () {
      this.date = moment(this.date).subtract(1, 'days').format("YYYY-MM-DD");
      this.initialize()
    },
    initialize () {
      let payload = {
        date: this.date,
        subscription_id: this.active_subs.id
      }
      this.$axios.post(`${this.$trackings}/get_by_date`, payload)
        .then(({ data }) => {
          console.log(data, 'data tracking')
          this.data = data
        });
    }
  }
}
</script>
