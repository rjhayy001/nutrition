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
      <img
        src="/logo.svg"
        alt=""
        width="13%"
      >
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
        :placeholder="this.$t('header.search')"
        dense
        append-icon="mdi-magnify"
      ></v-autocomplete>
    </div>
    <v-btn
      @click="changeView"
      icon
      v-if="$isAdmin()"
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on">mdi-account-switch-outline</v-icon>
        </template>
        <span>
          switch to {{$view() == 'coach' ? 'Admin' : 'Coach'}} view
        </span>
      </v-tooltip>
    </v-btn>

    <notification></notification>

    <!-- <v-btn icon>
      <v-icon  @click.prevent.stop="changeLanguage">mdi-translate</v-icon>
    </v-btn> -->
    <v-menu
      bottom
      left
      offset-y
      tile
      min-width="200"
      nudge-left="0"
      nudge-top="-8"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-translate</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item-group
          v-model="active_language"
          color="primary"
        >
          <v-list-item
            v-for="(item, index) in language"
            :key="index.code"
            dense
            @click.prevent.stop="changeLanguage(item.code)"
            active
          >
            <v-list-item-avatar tile>
              <v-img :src="item.flag" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

      </v-list>
    </v-menu>
    <custom-list :items="accountLinks">
    </custom-list>
    <v-btn
      icon
      @click="$auth.logout()"
    >
      <v-icon>mdi-logout-variant</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
import customList from '~/components/ui/list.vue'
import notification from '~/components/layout/notification.vue'
export default {
  name: 'DefaultLayout',
  components: {
    customList,
    notification
  },
  data () {
    return {
      count: 0,
      clipped: false,
      accountLinks: [
        {
          title: 'Profile',
          icon: 'mdi-account'
        },
        { title: 'Click Me' },
      ],
      language: [
        {
          title: 'French',
          code: 'fr',
          flag: '/images/flags/france.png'
        },
        {
          title: 'English',
          code: 'en',
          flag: '/images/flags/usa.png'
        },
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

  computed: {
    active_language () {
      let curr_language = this.language.find(lang => {
        return lang.code === this.$i18n.locale
      });

      return this.language.indexOf(curr_language)
    },
  },
  methods: {
    changeView () {
      let view = this.$view() == 'coach' ? 'admin' : 'coach'

      localStorage.setItem('view', view)

      location.reload();
    },
    toggleSidebar () {
      let sidebarstatus = this.$store.getters.sidebarStatus
      this.$store.commit('updateSidebarStatus', !sidebarstatus)
    },
    toggleMiniVariant () {
      let miniVariant = this.$store.getters.miniVariant
      this.$store.commit('updateMiniVariant', !miniVariant)
    },
    changeLanguage (code) {

      this.$i18n.setLocale(code);
      location.reload();
    }
  }
}
</script>
