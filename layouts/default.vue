<template>
  <v-app dark>
    <side-bar></side-bar>
    <main-header></main-header>
    <v-main :style="this.$store.getters.sidebarStatus ? 'padding: 64px 0px 0px 231px !important;' : ''">
      <Nuxt />
    </v-main>
    <popup-dialog ref="dialog"></popup-dialog>
    <!-- <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
  </v-app>
</template>
<script>
import mainHeader from '~/components/layout/mainHeader.vue'
import sideBar from '~/components/layout/sideBar.vue'
import popupDialog from '~/components/ui/popupDialog.vue'
export default {
  components: { mainHeader, sideBar, popupDialog },
  name: 'DefaultLayout',
  data () {
    return {
      right: null,
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
  mounted() {
    this.$root.dialog = this.$refs.dialog.open
  }
}
</script>
