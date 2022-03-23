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
          to:'new-clients',
          total_records:'5'
        },
        { 
          title: 'Chat', 
          icon: 'mdi-chat-plus-outline',
          to:'new-clients-chat',
        },
        { 
          title: 'Objectives', 
          icon: 'mdi-store-outline',
          to:'new-clients-objectives',
        },
        { 
          title: 'Suivi', 
          icon: 'mdi-car-shift-pattern',
          to:'new-clients-follow',
          total_records:'7'
        },
        { 
          title: 'Photos', 
          icon: 'mdi-image-multiple',
          to:'new-clients-photos',
          total_records:'10'
        },
        { 
          title: 'Documents', 
          icon: 'mdi-file-document-multiple-outline',
          to:'new-clients-documents',
        },
        { 
          title: 'Abonnement', 
          icon: 'mdi-account-reactivate-outline',
          to:'new-clients-subscription',
        },
      ]
    }
  }
}
</script>