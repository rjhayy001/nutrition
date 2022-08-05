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
                 {{ food_preference ? food_preference[list.value] : $t('clients.notSpecified')}}
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
              >{{ $t('clients.standardDay') }}</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
             <div
              class="px-4 py-5"
            >
              <div class="d-flex mb-2" style="    justify-content: space-between;">
                <div class="type-title mr-5 overline">
                  {{ $t('clients.breakfast') }}:
                </div>
                <div class="font-weight-bold overline type-value">
                 {{ food_preference ? food_preference.typical_day_food.breakfast : this.$t('clients.notSpecified') }}
                </div>
              </div>
              <div class="d-flex mb-2" style="    justify-content: space-between;">
                <div class="type-title mr-5 overline">
                  {{ $t('clients.morningSnack') }}:
                </div>
                <div class="font-weight-bold overline type-value">
                  {{ food_preference ? food_preference.typical_day_food.morning_snack : this.$t('clients.notSpecified') }}
                </div>
              </div>
              <div class="d-flex mb-2" style="    justify-content: space-between;">
                <div class="type-title mr-5 overline">
                  {{ $t('clients.lunch') }}:
                </div>
                <div class="font-weight-bold overline type-value">
                    {{ food_preference ? food_preference.typical_day_food.lunch : this.$t('clients.notSpecified') }}
                </div>
              </div>
              <div class="d-flex mb-2" style="    justify-content: space-between;">
                <div class="type-title mr-5 overline">
                  {{ $t('clients.afternoonSnack') }}:
                </div>
                <div class="font-weight-bold overline type-value">
                    {{ food_preference ? food_preference.typical_day_food.afternoon_snack : this.$t('clients.notSpecified') }}
                </div>
              </div>
              <div class="d-flex mb-2" style="    justify-content: space-between;">
                <div class="type-title mr-5 overline">
                  {{ $t('clients.dinner') }}:
                </div>
                <div class="font-weight-bold overline type-value">
                    {{ food_preference ? food_preference.typical_day_food.dinner  : this.$t('clients.notSpecified') }}
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
          text: this.$t('clients.foodPreference'),
          value: 'food_preference'
        },
        {
          text: this.$t('clients.mealsPerDay'),
          value: 'meals_per_day'
        },
        {
          text: this.$t('clients.followDrasticDiet'),
          value: 'follow_drastic_diet'
        },
        {
          text: this.$t('clients.caloriesToday'),
          value: 'calories_today'
        },
        {
          text: 'allergies',
          value: 'allergies'
        },
        {
          text: this.$t('clients.foodIntolerances'),
          value: 'intolerances'
        },
        {
          text: this.$t('clients.culturalAdaptationDiet'),
          value: 'cultural_adaptations_diet'
        },
        {
          text: this.$t('clients.waterPerDay'),
          value: 'water_per_day'
        },
        {
          text: this.$t('clients.drinksOtherThanWater'),
          value: 'drink_other_than_water'
        },
        {
          text: this.$t('clients.coffeePerDay'),
          value: 'coffee_per_day'
        },
        {
          text: this.$t('clients.alcoholPerWeek'),
          value: 'alcohol_per_week'
        },
        {
          text: this.$t('clients.foodSupplement'),
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
