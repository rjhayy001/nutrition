<template>
  <div>
    <v-container>
      <v-row  v-if="!loading">
        <v-flex
          xs8
          class="px-2"
        >
          <v-card min-height="500" class="pa-4">
           <div class="d-flex mb-2 list-holder" v-for="(list, index) of lists" :key="index">
                <div class="type-title mr-5 overline" style="width:40% !important;">
                  {{list.text}} :
                </div>
                <div class="font-weight-bold overline type-value">
                 {{ food_preference ? food_preference[list.value] : 'not specified'}}
                </div>
              </div>
          </v-card>
        </v-flex>
        <v-flex
          xs4
          class="px-2"
        >
          <v-card min-height="250">
            <v-toolbar
              dense
              flat
            >
              <v-toolbar-title
                class="text-uppercase font-weight-medium"
                style="font-size:17px;"
              >une journee type</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
             <div
              class="px-4 py-5"
            >
              <div class="d-flex mb-2" style="    justify-content: space-between;">
                <div class="type-title mr-5 overline">
                  Breakfast:
                </div>
                <div class="font-weight-bold overline type-value">
                 {{ food_preference ? food_preference.typical_day_food.breakfast : 'not specified'}}
                </div>
              </div>
              <div class="d-flex mb-2" style="    justify-content: space-between;">
                <div class="type-title mr-5 overline">
                  Morning snack :
                </div>
                <div class="font-weight-bold overline type-value">
                  {{ food_preference ? food_preference.typical_day_food.morning_snack : 'not specified'}}
                </div>
              </div>
              <div class="d-flex mb-2" style="    justify-content: space-between;">
                <div class="type-title mr-5 overline">
                  Lunch :
                </div>
                <div class="font-weight-bold overline type-value">
                    {{ food_preference ? food_preference.typical_day_food.lunch : 'not specified'}}
                </div>
              </div>
              <div class="d-flex mb-2" style="    justify-content: space-between;">
                <div class="type-title mr-5 overline">
                  Afternoon snack:
                </div>
                <div class="font-weight-bold overline type-value">
                    {{ food_preference ? food_preference.typical_day_food.afternoon_snack : 'not specified'}}
                </div>
              </div>
              <div class="d-flex mb-2" style="    justify-content: space-between;">
                <div class="type-title mr-5 overline">
                  Dinner :
                </div>
                <div class="font-weight-bold overline type-value">
                    {{ food_preference ? food_preference.typical_day_food.dinner  : 'not specified'}}
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
  components:{
    loader
  },
  data () {
    return {
      loading:true,
       client:{},
      food_preference:{},
      lists:[
        {
          text: 'food preference',
          value: 'food_preference'
        },
        {
          text: 'meals per day',
          value: 'meals_per_day'
        },
        {
          text: 'follow drastic diet',
          value: 'follow_drastic_diet'
        },
        {
          text: 'calories today',
          value: 'calories_today'
        },
        {
          text: 'allergies',
          value: 'allergies'
        },
        {
          text: 'food intolerances',
          value: 'intolerances'
        },
        {
          text: 'cultural adaptations diet',
          value: 'cultural_adaptations_diet'
        },
        {
          text: 'water per day',
          value: 'water_per_day'
        },
        {
          text: 'drinks other than water',
          value: 'drink_other_than_water'
        },
        {
          text: 'coffe per day',
          value: 'coffee_per_day'
        },
        {
          text: 'alcohol per week',
          value: 'alcohol_per_week'
        },
        {
          text: 'food supplement',
          value: 'food_supplement'
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
          `${this.$clients}/${this.$route.params.id}/edit?relations=activeSubscription.food_preference`
        )
        .then(({ data }) => {
          console.log(data, 'fooodsds')
          this.client = data;
          this.food_preference = data.active_subscription ? data.active_subscription[0].food_preference : {}
          this.loading = false
        });

    }
  }
}
</script>
<style scoped>
.type-title{
  opacity:0.6 !important;
  width:230px !important;
  line-height: 20px !important;
    margin-top: 6px !important;
}
.type-value{
     line-height: 20px !important;
    margin-top: 6px !important;
}
.list-holder:hover{
  background: whitesmoke !important;
}
</style>
