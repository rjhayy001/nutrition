<template>
  <fragment>
    <sub-sidebar :items="submenus"></sub-sidebar>
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
          title: 'Profil',
          icon: 'mdi-account-multiple-outline',
          to:'client-id-profile',
          total_records:'5'
        },
        {
          title: 'Client',
          icon: 'mdi-account-multiple-outline',
          showSubmenu:false,
          submenus:[
            {
              title:'Global',
              to: 'client-id-global'
            },
            {
              title:'Formulaire',
              to: 'client-id-formula'
            },
            {
              title:'Mesures',
              to: 'client-id-measure'
            },
            {
              title:'Tracking',
              to: 'client-id-tracking'
            },
            {
              title:'Photos',
              to: 'client-id-photos'
            },
            {
              title:'Feedback',
              to: 'client-id-feedback'
            },
          ],
        },
        {
          title: 'Objectives',
          icon: 'mdi-store-outline',
          to:'client-id-objectives',
        },
        {
          title: 'Abonnement',
          icon: 'mdi-account-reactivate-outline',
          to:'new-client-subscription',
        },
        {
          title: 'Ressources',
          icon: 'mdi-image-multiple',
          to:'client-id-resource',
          total_records:'10'
        },
        {
          title: 'Chat',
          icon: 'mdi-chat-plus-outline',
          to:'client-id-chat',
        },
      ]
    }
  },
  methods: {
    toggleSidebar() {
      let sidebarstatus = this.$store.getters.sidebarStatus
      this.$store.commit('updateSidebarStatus', !sidebarstatus)
    },
    hasActiveSubmenu(parent, menu) {
      if(this.$route.name.includes(parent)) {
        if (!menu.showSubmenu) menu.showSubmenu = true
        return 'subactive'
      } 
    }
  },
  computed: {
    sidebarStatus: {
      get() {
        return this.$store.getters.sidebarStatus
      },
      set(){}
    },
    miniVariantStatus: {
      get() {
        return this.$store.getters.miniVariant
      },
      set(){}
    }
  }
}
</script>
