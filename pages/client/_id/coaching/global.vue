<template>
  <div v-if="!loading">
    active subscription :   ( {{ active_subscription ?  computePlanPrice2(active_subscription.price) : 'none'}} ) <br/>
    Coach : {{ active_subscription ? active_subscription.coach.full_name : 'none'}} <br/>
    subscription duration: {{ active_subscription ? active_subscription.duration : 'none' }} <br/>
    feedback count: 0, <br/>
    next meeting: date
    {{active_subscription}}
  </div>
</template>
<script>
import priceHelperVue from "@/mixins/priceHelper.vue";
export default {
  name: 'Global',
  components: {
  },
  mixins: [
    priceHelperVue,
  ],
  data(){
    return{
      client:{},
      loading: false,
      active_subscription: {}
    }
  },
  created () {
    this.initialize();
  },
  methods: {
     initialize () {
      this.loading = true
       this.$axios
        .get(
          `${this.$clients}/${this.$route.params.id}/edit?relations=country,city,zipcode,subscriptions`
        )
        .then(({ data }) => {
          console.log(data, 'test')
          this.client = data;
          this.active_subscription = data.active_subscription ? data.active_subscription[0] : {}
          console.log(this.active_subscription, 'subs')
          this.loading = false
        });
    },
  }
}
</script>
