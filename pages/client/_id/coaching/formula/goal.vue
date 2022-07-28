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
            <div
              class="d-flex mb-2 list-holder"
              v-for="(list, index) of lists"
              :key="index"
            >
              <div
                class="type-title mr-5 overline"
                style="width:40% !important;"
              >
                {{list.text}} :
              </div>
              <div class="font-weight-bold overline type-value">
                {{ goal ? goal[list.value] : 'not specified'}}
              </div>
            </div>
          </v-card>
        </v-flex>
        <v-flex
          xs4
          class="px-2"
        >
          <v-card min-height="500">
            <v-toolbar
              dense
              flat
            >
              <v-toolbar-title
                class="text-uppercase font-weight-medium"
                style="font-size:17px;"
              >Goal hindrances</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
              <template v-if="goal && goal.goal_hindrances">
            <div class="px-4 pt-2 pb-3 overline">
              1 : It was never an obstacle<br />
              5 : it is very often an obstacle
            </div>
            <v-divider></v-divider>
            <div class="px-4 pb-5 pt-2">
              <div
                class="d-flex mb-2"
                v-for="(hindrance, index) of hindrances"
                :key="index+'hindrance'"
              >
                <div class="type-title mr-5 overline">
                  {{hindrance.text}} :
                </div>
                <div class="font-weight-bold overline type-value">
                  <v-chip
                    :color="colorStatus(goal.goal_hindrances[hindrance.value])"
                    label
                    dense
                    small
                  >
                    {{ goal.goal_hindrances[hindrance.value] ? goal.goal_hindrances[hindrance.value] : 0}}
                  </v-chip>
                </div>
              </div>
            </div>
              </template>
              <empty-data v-else/>
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
      goal: {},
      food_preference: {},
      lists: [
        {
          text: 'Goal',
          value: 'goal'
        },
        {
          text: 'desired weight',
          value: 'desired_weight'
        },
        {
          text: 'date to reach the goal',
          value: 'date_to_reach_goal'
        },
        {
          text: 'goal importance',
          value: 'goal_importance'
        },
      ],
      hindrances: [
        {
          text: 'what to eat',
          value: 'what_to_eat'
        },
        {
          text: 'how much to eat',
          value: 'how_much_to_eat'
        },
        {
          text: 'plan meals',
          value: 'plan_meals'
        },
        {
          text: 'time to cook',
          value: 'time_to_cook'
        },
        {
          text: 'drink alcohol',
          value: 'drink_alcohol'
        },
        {
          text: 'cravings',
          value: 'cravings'
        },
        {
          text: 'emotional void',
          value: 'emotional_void'
        },
        {
          text: 'eat when not hungry',
          value: 'eat_when_not_hungry'
        },
        {
          text: 'always hungry',
          value: 'always_hungry'
        },
        {
          text: 'not hungry',
          value: 'not_hungry'
        },
        {
          text: 'guilty to eat',
          value: 'guilty_to_eat'
        },
        {
          text: 'access to healthy food',
          value: 'access_to_healthy_food'
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
          `${this.$clients}/${this.$route.params.id}/edit?relations=activeSubscription.goal`
        )
        .then(({ data }) => {
          console.log(data, 'goalss')
          this.client = data;
          this.goal = data.active_subscription ? data.active_subscription[0].goal : {}
          this.loading = false
        });

    },
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
