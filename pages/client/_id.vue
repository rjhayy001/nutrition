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
  components: { subSidebar, Fragment },
  data () {
    return {
      submenus: [
        {
          title: 'Profile',
          icon: 'mdi-account-multiple-outline',
          to: 'client-id-profile',
          total_records: '5'
        },
        {
          title: 'Coaching',
          icon: 'mdi-heart-outline',
          to: 'client-id-subscription',
          showSubmenu: false,
          submenus: [
            {
              title: 'Global',
              to: 'client-id-coaching-global',
            },
            {
              title: 'Formulaire',
              to: 'client-id-coaching-formula-food',
            },
            {
              title: 'Measures',
              to: 'client-id-coaching-measure',
            },
            {
              title: 'Tracking',
              to: 'client-id-coaching-tracking',
            },
            {
              title: 'Photos',
              to: 'client-id-coaching-photos',
            },
            // {
            //   title: 'Objective',
            //   to: 'client-id-coaching-objective',
            // },
            {
              title: 'Feedback',
              to: 'client-id-coaching-feedback',
            },
          ]
        },
        {
          title: 'Chat',
          icon: 'mdi-chat-plus-outline',
          to: 'client-id-chat',
        },
        // {
        //   title: 'Photos',
        //   icon: 'mdi-image-multiple',
        //   to: 'client-id-photos',
        //   total_records: '10'
        // },
        // {
        //   title: 'Documents',
        //   icon: 'mdi-file-document-multiple-outline',
        //   to:'new-client-documents',
        // },
        {
          title: 'Abonnement',
          icon: 'mdi-account-reactivate-outline',
          to: 'client-id-subscription',
        },
      ]
    }
  }
}
</script>
