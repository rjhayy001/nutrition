<template>
  <v-container>
     <!-- v-if="active_subscription.coaching_started == 1" -->
    <v-row>
      <v-flex
        xs12
        class="mb-2 px-2"
      >
        <v-card height="100">
          <div class="text-center pt-5">
            <p class="font-weight-medium text-capitalize formula-text">next calls</p>
            <div class="font-weight-bold">
              {{frFormat(client.created_at)}}
            </div>
          </div>
        </v-card>
      </v-flex>
      <v-flex
        xs4
        class="px-2"
      >
        <v-card height="100">
          <v-btn width="100%" height="100%">
            <span style="text-transform: capitalize; font-weight: bold">
              Faire un<br>
              feedback
            </span>
          </v-btn>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card height="100">
          <div class="center-number">51</div>
          <div class="center-desc">Feedbacks</div>
        </v-card>
      </v-flex>
      <v-flex
        xs4
        class="px-2"
      >
        <v-card height="100">
          <div class="center-number">51</div>
          <div class="center-desc">Hebdomadaires</div>
        </v-card>
      </v-flex>
    </v-row>
    <!-- <v-row v-else>
      <v-flex xs12
          class="px-3">
        <v-card height="208">
          <empty-data></empty-data>
        </v-card>
      </v-flex>
    </v-row> -->
  </v-container>
</template>
<script>
import emptyData from "~/components/error/empty_data.vue"
export default {
  components: {
    emptyData
  },
  props:[
    'client',
    'loading',
    'active_subscription'
  ],
  watch:{
    loading(val){
      if(!val){
        this.initialize()
      }
    }
  },
  mounted() {
    // alert('test')
  },
  methods: {
    initialize() {
      // this.$axios.get(`${this.$subscriptions}/${this.active_subscription.id}?relations=food_preference,client_info`).then(({ data }) => {
      //   console.log(data, 'tessts callsss')
      // })
    },
  }
}
</script>
<style scoped>
.center-number{
  margin: 0;
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: x-large;
  font-weight: bold;
}
.center-desc{
      font-size: smaller;
    position: absolute;
    font-weight: 200;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
