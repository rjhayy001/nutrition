<template>
   <v-app-bar
    fixed
    app
    :style="this.$store.getters.sidebarStatus ? 'left: 230px' : '0px'"
  >
    <template v-if="!$store.getters.sidebarStatus">
      <v-app-bar-nav-icon @click.stop="toggleSidebar" />
    </template>
    <p class="title">
      <img src="/logo.svg" alt="" width="13%">
      RUN YOUR LIFE ADMINISTRATION
    </p>
    <v-spacer />
    <div style="width: 400px;">
      <v-autocomplete
        auto-select-first
        clearable
        filled
        rounded
        hide-details=""
        placeholder="Search items by name, age ..."
        dense
        append-icon="mdi-magnify"
      ></v-autocomplete>
    </div>
     <v-btn icon>
      <v-icon>mdi-account-switch-outline</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-translate</v-icon>
    </v-btn>
    <custom-list :items="accountLinks">
    </custom-list>
    <v-btn icon @click="$auth.logout()">
      <v-icon>mdi-logout-variant</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
import customList from '~/components/ui/list.vue'
export default {
  name: 'DefaultLayout',
  components: {
    customList
  },
  data () {
    return {
      clipped: false,
      accountLinks:[
        { 
          title: 'Profile',
          icon:'mdi-account'
        },
        { title: 'Click Me' },
      ],
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods: {
    toggleSidebar() {
      let sidebarstatus = this.$store.getters.sidebarStatus
      this.$store.commit('updateSidebarStatus', !sidebarstatus)
    },
    toggleMiniVariant() {
      let miniVariant = this.$store.getters.miniVariant
      this.$store.commit('updateMiniVariant', !miniVariant)
    }
  }
}
</script>