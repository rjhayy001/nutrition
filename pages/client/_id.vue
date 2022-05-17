<template>
  <fragment>
    <sub-sidebar :submenus="submenus"></sub-sidebar>
    <v-container>
      <Nuxt />
    </v-container>
  </fragment>
</template>
<script>
import { Fragment } from 'vue-frag'
import subSidebar from '~/components/layout/subSidebar.vue'
export default {
  components: { subSidebar,Fragment },
  data() {
    return {
      submenus: [
        {
          title: 'Client',
          icon: 'mdi-account-multiple-outline',
          to:'client-id',
          total_records:'5'
        },
        {
          title: 'Chat',
          icon: 'mdi-chat-plus-outline',
          to:'client-id-chat',
        },
        {
          title: 'Objectives',
          icon: 'mdi-store-outline',
          to:'client-id-objectives',
        },
        // {
        //   title: 'Suivi',
        //   icon: 'mdi-car-shift-pattern',
        //   to:'new-client-follow',
        //   total_records:'7'
        // },
        {
          title: 'Photos',
          icon: 'mdi-image-multiple',
          to:'client-id-photos',
          total_records:'10'
        },
        // {
        //   title: 'Documents',
        //   icon: 'mdi-file-document-multiple-outline',
        //   to:'new-client-documents',
        // },
        // {
        //   title: 'Abonnement',
        //   icon: 'mdi-account-reactivate-outline',
        //   to:'new-client-subscription',
        // },
      ]
    }
  }
}
</script>
