<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-capitalize">
      Les Daily
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-container>
        <v-row>
          <v-flex xs12 class="mb-4">
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
                    <v-icon @click="prevDay" color="primary">mdi-arrow-left-bold-circle</v-icon>
                    <p
                      v-bind="attrs"
                      v-on="on"
                      class="mx-6 mt-1"
                    >
                      {{frFormat(date)}}
                    </p>
                    <v-icon @click="nextDay" color="primary">mdi-arrow-right-bold-circle</v-icon>
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
            <stress-tracking></stress-tracking>
          </v-flex>
          <v-flex xs4>
            <sleep-tracking></sleep-tracking>
          </v-flex>
          <v-flex xs4>
            <v-card
              class="mx-2 mb-2 pa-3"
              height="196"
            >
              <v-progress-circular
                :rotate="360"
                :size="100"
                :width="15"
                :value="value"
                color="teal"
              >
                {{value}}
              </v-progress-circular>
            </v-card>
            <v-card
              class="mx-2 mt-2 pa-3"
              height="196"
            >
              sasd
            </v-card>
          </v-flex>
          <v-flex
            xs8
            class="mt-4"
          >
            <v-card
              class="mx-2 mb-2 pa-3"
              height="80"
            >
              sasd
            </v-card>
            <v-card
              class="mx-2 mb-2 pa-3"
              height="80"
            >
              sasd
            </v-card>
          </v-flex>
          <v-flex
            xs4
            class="mt-4"
          >
            <v-card
              class="mx-2 mb-2 pa-3"
              height="168"
            >
              sasd
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
  mixins:[dateHelper],
  components:{
    stressTracking,
    sleepTracking
  },
  data () {
    return {
      value:0,
      date_menu: false,
      date: moment().format("YYYY-MM-DD"),
    }
  },
  created(){
    setTimeout(() =>{
      this.value = 40
    }, 2000);
  },
  methods: {
    nextDay(){
      this.date = moment(this.date).add(1, 'days').format("YYYY-MM-DD");
      this.value = 80
    },
    prevDay() {
      this.date = moment(this.date).subtract(1, 'days').format("YYYY-MM-DD");
    }
  }
}
</script>
