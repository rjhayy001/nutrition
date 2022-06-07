<template>
   <v-navigation-drawer permanent clipped class="left-sidebar sub-side">
    <!-- <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Application
        </v-list-item-title>
        <v-list-item-subtitle>
          subtext
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider> -->
    <!-- <v-list
      dense
      nav
    >
      <v-list-item
        v-for="(item, index) in submenus"
        :key="index"
        :to="{name: item.to}"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
        <template v-if="item.total_records">
          <span class="count-records">
            {{item.total_records}}
          </span>
        </template>
      </v-list-item>
    </v-list> -->

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
export default {
  data() {
    return {
      
    }
  },
  props: {
    items: {
      type:Array,
      default: () => {
        return []
      }
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