<template>
  <div>
    <v-container>
      <v-row v-if="!loading">
        <v-flex
          xs8
          class="px-2"
        >
          <v-card
            min-height="250"
            class="pa-4"
          >
            <div class="d-flex mb-2 list-holder">
              <div
                class="type-title mr-5 overline"
                style="width:40% !important;"
              >
                practice sports:
              </div>
              <div class="font-weight-bold overline type-value">
                {{ sports ? sports['practice_sport'] : 'not specified'}}
              </div>
            </div>
            <template v-if="sports.practice_sport === 'yes'">
              <div
                class="d-flex mb-2 list-holder"
                v-for="(list, index) of lists"
                :key="index"
              >
                <div
                  class="type-title mr-5 overline"
                  style="width:40% !important;"
                >
                  {{ list.text }} :
                </div>
                <div class="font-weight-bold overline type-value">
                  {{ sports ? sports[list.value] : 'not specified'}}
                </div>
              </div>
            </template>
          </v-card>
        </v-flex>
        <v-flex
          xs4
          class="px-2"
        >
          <v-card min-height="500">
            <div v-if="sports.practice_sport === 'no'">
              <v-toolbar
                dense
                flat
              >
                <v-toolbar-title
                  class="text-uppercase font-weight-medium"
                  style="font-size:17px;"
                >Sport hindrances</v-toolbar-title>
              </v-toolbar>
              <div class="px-4 pt-2 pb-3 overline">
                1 : It was never an obstacle<br />
                5 : it is very often an obstacle
              </div>
              <v-divider></v-divider>
              <div class="px-4 pb-5 pt-2">
                <div
                  class="d-flex mb-2"
                  v-for="(hindrance, index) of no_sports"
                  :key="index+'hindrance'"
                >
                  <div class="type-title mr-5 overline">
                    {{hindrance.text}} :
                  </div>
                  <div class="font-weight-bold overline type-value">
                    <v-chip
                      :color="colorStatus(sports.no_sports[hindrance.value])"
                      label
                      dense
                      small
                    >
                      {{ sports.no_sports[hindrance.value] ? sports.no_sports[hindrance.value] : 0}}
                    </v-chip>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <v-toolbar
                dense
                flat
              >
                <v-toolbar-title
                  class="text-uppercase font-weight-medium"
                  style="font-size:17px;"
                >Sports Types</v-toolbar-title>
              </v-toolbar>
              <v-divider></v-divider>
              <div class="px-4 pb-5 pt-2">
                <div
                  class="d-flex mb-2"
                  v-for="(type, index) of sports.sports_type"
                  :key="index+'types'"
                >
                  <div class="type-title mr-5 overline">
                    {{index+1+'. ' +type.name}}
                  </div>
                  <div class="font-weight-bold overline type-value">
                    <v-chip
                      :color="colorStatus(type.duration || 0)"
                      label
                      dense
                      small
                    >
                      {{type.duration || 0}} hr
                    </v-chip>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-row>
      <v-row v-else>
        <loader></loader>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import loader from '~/components/loader/default_loader.vue'
export default {
  components: {
    loader
  },
  data () {
    return {
      loading: true,
      client: {},
      sports: {},
      lists: [
        {
          text: 'sporting activity level',
          value: 'sporting_activity_level'
        },
        {
          text: 'activity outside sport level',
          value: 'activity_outside_sport_level'
        },
        {
          text: 'training recovery',
          value: 'training_recovery'
        },
        {
          text: 'no. of training day',
          value: 'no_training_day'
        },
        {
          text: 'pain',
          value: 'pain'
        },
      ],
      no_sports: [
        {
          text: 'confident on athletic ability',
          value: 'confident_on_athletic_ability'
        },
        {
          text: 'comfortable place',
          value: 'comfortable_place'
        },
        {
          text: 'place to practice',
          value: 'place_to_practice'
        },
        {
          text: 'energy to practice',
          value: 'energy_to_practice'
        },
        {
          text: 'time',
          value: 'time'
        },
        {
          text: 'motivation',
          value: 'motivation'
        },

      ]
    }
  },
  mounted () {
    this.initalize()
  },
  methods: {
    initalize () {
      this.loading = true
      this.$axios
        .get(
          `${this.$clients}/${this.$route.params.id}/edit?relations=activeSubscription.sport`
        )
        .then(({ data }) => {
          this.client = data;
          this.sports = data.active_subscription ? data.active_subscription[0].sport : {}
          this.loading = false
          console.log(this.sports, 'sport')
        });

    }
  }
}
</script>
<style scoped>
.type-title {
  opacity: 0.6 !important;
  width: 70% !important;
  line-height: 20px !important;
  margin-top: 6px !important;
}

.type-value {
  line-height: 20px !important;
  margin-top: 6px !important;
}

.list-holder:hover {
  background: whitesmoke !important;
}
</style>

