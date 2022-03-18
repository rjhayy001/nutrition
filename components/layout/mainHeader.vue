<template>
   <v-app-bar
    :clipped-left="clipped"
    fixed
    app
    :style="this.$store.getters.sidebarStatus ? 'left: 230px' : '0px'"
  >
    <template v-if="!$store.getters.sidebarStatus">
      <v-app-bar-nav-icon @click.stop="toggleSidebar" />
    </template>
    <p class="title">NUTRITION ADMINISTRATION</p>
    <!-- <v-btn
      icon
      @click.stop="toggleMiniVariant"
    >
      <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
    </v-btn> -->
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
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-translate</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-account-circle-outline</v-icon>
    </v-btn>
    <v-btn icon @click="$auth.logout()">
      <v-icon>mdi-logout-variant</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
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