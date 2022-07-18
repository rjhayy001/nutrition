<template>
  <div>
    <client-info></client-info>
    <menu-tabs></menu-tabs>
    <feed-back-form :feedback_type="type"></feed-back-form>
  </div>
</template>
<script>
import clientInfo from '@/components/clients/coaching/formula/clientInfo.vue'
import menuTabs from '@/components/clients/coaching/formula/tabs.vue'
import feedBackForm from "~/components/clients/coaching/feedback/form.vue"
export default {
  components: {
    clientInfo,
    menuTabs,
    feedBackForm,
  },
  data(){
    return {
      client:{},
      active_subscription:{},
      type:'measures',
    }
  },

}
</script>
