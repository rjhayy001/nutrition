<template>
  <div>
    <client-info></client-info>
    <menu-tabs></menu-tabs>
  </div>
</template>
<script>
import clientInfo from '@/components/clients/coaching/formula/clientInfo.vue'
import menuTabs from '@/components/clients/coaching/formula/tabs.vue'
export default {
  components: {
    clientInfo,
    menuTabs
  }

}
</script>
