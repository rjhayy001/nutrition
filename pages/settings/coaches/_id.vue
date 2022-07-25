<template>
  <fragment>
    <div class="main_sidemenus">
      <sub-sidebar :submenus="submenus"></sub-sidebar>
    </div>
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
          to:'settings-coaches-id-profile',
          total_records:'5'
        },
        // {
        //   title: 'Ressources',
        //   icon: 'mdi-image-multiple',
        //   to:'settings-coaches-id-resource',
        //   total_records:'10'
        // },
        // {
        //   title: 'Chat',
        //   icon: 'mdi-chat-plus-outline',
        //   to:'settings-coaches-id-chat',
        // },
        {
          title: 'Coaching',
          icon: 'mdi-account-multiple-outline',
          showSubmenu:false,
          submenus:[
            {
              title:'Client',
              to: 'settings-coaches-id-client'
            },
            {
              title:'Documents',
              to: 'settings-coaches-id-documents'
            },
            // {
            //   title:'Global',
            //   to: 'settings-coaches-id-global'
            // },
            // {
            //   title:'Formulaire',
            //   to: 'settings-coaches-id-formula'
            // },
            // {
            //   title:'Mesures',
            //   to: 'settings-coaches-id-measure'
            // },
            // {
            //   title:'Tracking',
            //   to: 'settings-coaches-id-tracking'
            // },
            // {
            //   title:'Photos',
            //   to: 'settings-coaches-id-photos'
            // },
            // {
            //   title:'Feedback',
            //   to: 'settings-coaches-id-feedback'
            // },
          ],
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
