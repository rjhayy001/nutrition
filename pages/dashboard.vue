<template>
  <div>
    <v-container class="px-8">
      <!--  Header for Dashboard -->
      <v-row>
        <v-flex xs12>
          <div>
            <v-toolbar flat>
              <v-toolbar-title style="font-size: 30px;">
                Bonjour <span class="font-weight-bold">{{$auth.user.full_name}}!</span>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <div style="width:200px;">
              <v-select
                :items="items"
                label="Solo field"
                dense
                hide-details="auto"
                v-model="item"
                class="pt-7"
                solo
              ></v-select>
              </div>
            </v-toolbar>
          </div>
        </v-flex>
      </v-row>
      <!--  Body for Dashboard -->
      <v-row>
        <v-flex xs4>
          <calendar></calendar>
        </v-flex>
        <v-flex
          xs5
          class="px-2 pl-3"
        >
          <tracker></tracker>
        </v-flex>
        <v-flex
          xs3
          class="px-2 pr-3 "
        >
          <v-card
            class="mt-2 d-flex"
            height="690"
          >
             <transition name="slide-fade" mode="out-in">
            <div class="mr-2" :key="value">
              {{parseFloat(value-0.2).toFixed(1)}}
            </div>
            </transition>
             <transition name="slide-fade" mode="out-in">

            <div class="mr-2" @click="minusWeight" :key="value">
              {{parseFloat(value-0.1).toFixed(1)}}
            </div>
            </transition>

            <div class="mr-2" >
              {{value}}
            </div>
             <transition name="slide-left" mode="out-in">

            <div class="mr-2" @click="addWeight" :key="value">
              {{parseFloat(value+0.1).toFixed(1)}}
            </div>
            </transition>
             <transition name="slide-left" mode="out-in">

            <div class="mr-2" :key="value">
              {{parseFloat(value+0.2).toFixed(1)}}
            </div>
            </transition>

          </v-card>
        </v-flex>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import tracker from '~/components/dashboard/subscribers_tracker.vue'
import calendar from '~/components/dashboard/calendar.vue'
export default {
  data: () => ({
    items: ['All', 'Myriam', 'Fizz', 'Buzz'],
    user: 'Myriam',
    item: 'Myriam',
    value:30,
    picker: ''
  }),
  components: {
    tracker,
    calendar
  },
  methods: {
    addWeight(){
      this.value = this.addDecimal(this.value,0.1)
    },
    minusWeight(){
      this.value = Math.round((this.value - 0.1) * 1e12) / 1e12
    },
    addDecimal(dec1, dec2){
     return Math.round((dec1 + dec2) * 1e12) / 1e12
    },
  }
}
</script>
<style scoped>
.v-select {
  width: 400px;
}
.card-sub {
  line-height: 15px;
  opacity: 0.4;
  position:absolute;
  bottom: 7px;
}
</style>

