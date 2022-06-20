<template>
  <v-navigation-drawer
    v-model="sidebarStatus"
    :mini-variant="miniVariantStatus"
    fixed
    app
    class="left-sidebar"
  >
    <div :style="{ backgroundImage: `url(/images/profile_back_image.png)` }" class="profile-logo">
      <div class="profile-content">
        <img src="https://randomuser.me/api/portraits/women/85.jpg"/>
        <p>{{$auth.user.name}}</p>
        <small>ADMIN</small>
        <v-app-bar-nav-icon @click.stop="toggleSidebar" />
      </div>
    </div>
    <v-list>
      <template v-for="(item, i) in items">
        <v-list-item
          :key="i"
          :to="{name:item.to}"
          router
          v-if="!item.submenus"
          exact
          :class="['main-menu', $route.path.includes(item.to) ? 'active' : '']"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          :key="i"
          v-else
          no-action
          :prepend-icon="item.icon"
          append-icon="mdi-chevron-down"
          v-model="item.showSubmenu"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(menu, i) of item.submenus"
            :key="i"
            link
            :to="{name:menu.to}"
            :class="hasActiveSubmenu(menu.parent, item)"
          >
            <!-- <v-list-item-title>
              {{$route.name}}
            </v-list-item-title> -->
            <v-list-item-title v-text="menu.title"></v-list-item-title>
            <!-- <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon> -->
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import mainHeader from '~/components/layout/mainHeader.vue'
export default {
  components: { mainHeader },
  name: 'DefaultLayout',
  data () {
    return {
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
      items: [
        {
          icon: 'mdi-monitor-dashboard',
          title: 'Dashboard',
          to: 'dashboard'
        },
        // {
        //   icon: 'mdi-account-arrow-right-outline',
        //   title: 'Clients semaine',
        //   to: 'new-client'
        // },
        {
          icon: 'mdi-account-group-outline',
          title: 'Clients',
          to: 'client'
        },
        {
          icon: 'mdi-account-reactivate-outline',
          title: 'Abonnements',
          to: 'subscription'
        },
        {
          icon: 'mdi-credit-card-settings-outline',
          title: 'Paiements',
          to: 'payments'
        },
         {
          icon: 'mdi-post-outline',
          title: 'Blogs',
          to: 'blog'
        },
        {
          icon: 'mdi-bell-badge-outline',
          title: 'Pushs',
          to: 'announcement'
        },
        {
          icon: 'mdi-chart-bar-stacked',
          title: 'Statistiques',
          to: 'statistic'
        },
        {
          icon: 'mdi-cog-refresh-outline',
          title: 'Parameters',
          to: '/',
          showSubmenu:false,
          submenus:[
            {
              title:'Document utiles',
              to: 'settings-documents'
            },
            {
              title:'Liens utiles',
              to: 'settings-links'
            },
            {
              title:'Phototeque',
              to: 'settings-photos'
            },
            {
              title:'Formation',
              to: 'settings-formations'
            },
            {
              title:'Coachs',
              to: 'settings-coaches'
            },
            {
              title:'Abonnements',
              to: 'settings-plans'
            },
            {
              title:'Address',
              to: 'settings-address-countries',
              parent:'settings-address'
            },
            {
              title:'Others',
              to: 'settings-others-tags'
            }
          ],
        },
      ],
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
