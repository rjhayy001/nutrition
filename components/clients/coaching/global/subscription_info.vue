<template>
    <v-card height="208">
      <div class="client-info text-center pt-6">
        <div class="d-flex justify-center position-relative">
          <h2 class="font-weight-bold mb-4">{{client.full_name}}</h2>
          <v-icon class="position-absolute" style="top:-20px; left: 10px">
            mdi-diamond-outline
          </v-icon>
        </div>
        <!-- v-if="active_subscription.coaching_started === 1" -->
        <div >
          <div class="caption">
            registered since
            <span class="font-weight-bold">{{frFormat(client.created_at)}}</span>
          </div>
          <div class="caption">
            subscribed since
            <span class="font-weight-bold">{{active_subscription ? frFormat(active_subscription.start_date) : 'none'}}</span>
          </div>
          <div class="caption">
            active_subscription
            <span class="font-weight-bold"> {{ active_subscription ?  computePlanPrice2(active_subscription.price) : 'none'}}</span>
          </div>
        </div>
        <!-- <div
          class="text-center mt-6"
          v-else
        >
          <v-btn
            color="primary"
            large
            @click="startCoaching"
          >start coaching</v-btn>
        </div> -->
      </div>
    </v-card>
</template>
<script>
import priceHelperVue from "@/mixins/priceHelper.vue";
export default {
  props:[
    'client',
    'active_subscription',
  ],
  mixins: [
    priceHelperVue,
  ],
  methods:{
    startCoaching(){
      this.$axios.get(`${this.$subscriptions}/start_coaching/${this.active_subscription.id}`).then(({ data }) => {
        this.fullNotification(data)
        this.$emit('reload')
      })
    }
  }
}
</script>
