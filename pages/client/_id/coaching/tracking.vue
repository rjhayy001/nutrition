<template>
  <v-container>
     <form-drawer :drawerStatus="drawer" @closeDrawer="drawer = !drawer"
        @addRecord="addRecord($event)"
        @updateRecord="updateRecord($event)"
        :selectedItem="selectedItem"
        :active_subs="active_subscription"
      />
    <v-row justify="center">
      <v-expansion-panels accordion  v-model="panel">
        <macro-view @openDrawer="drawer =! drawer" :active_subs="active_subscription"></macro-view>
        <daily-view></daily-view>
      </v-expansion-panels>
    </v-row>
    <feed-back-form :feedback_type="type"></feed-back-form>
  </v-container>
</template>
<script>
import macroView from '@/components/clients/coaching/tracking/macro.vue'
import formDrawer from "~/components/clients/coaching/tracking/macroForm.vue";
import dailyView from '@/components/clients/coaching/tracking/daily.vue'
import feedBackForm from "~/components/clients/coaching/feedback/form.vue"
export default {
  components: {
    macroView,
    formDrawer,
    dailyView,
    feedBackForm
  },
  data(){
    return{
      panel:0,
      type:'tracking',
      selectedItem:{},
      drawer:false,
      loading:false,
      client:{},
      active_subscription:{
        id:0
      }
    }
  },
  mounted(){
    this.initalize()
  },
  methods:{
    addRecord(payload){
      this.$axios
        .post(`${this.$macros}`, payload)
        .then(({ data }) => {
          console.log(data, 'tessst')
          this.initalize()
        })
        .finally(() => {
          this.$axios.get(`${this.$subscriptions}/start_coaching/${payload.subscription_id}`).then(({ data }) => {
          this.fullNotification(data)
          this.$store.commit('updateTrackingFlag', true)
          })
        })
    },
    initalize () {
      this.loading = true
      this.$axios
        .get(
          `${this.$clients}/${this.$route.params.id}/edit?relations=activeSubscription`
        )
        .then(({ data }) => {
          this.client = data
          this.active_subscription = data.active_subscription[0]
          console.log(data.active_subscription[0], 'macro')
          this.loading = false
        });

    }
  }
}
</script>
