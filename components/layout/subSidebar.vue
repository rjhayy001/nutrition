<template>
  <v-navigation-drawer
    permanent
    clipped
    class="left-sidebar sub-side"
  >
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
    <v-list
      dense
      nav
    >
      <template v-for="(item, index) in submenus">
        <v-list-item
          :key="index"
          :to="{name: item.to}"
          v-if="!item.submenus"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}
              {{item.submenus}}</v-list-item-title>
          </v-list-item-content>
          <template v-if="item.total_records">
            <span class="count-records">
              {{item.total_records}}
            </span>
          </template>
        </v-list-item>
        <v-list-group
          class="dropdown_menu"
          :key="index"
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
  data () {
    return {

    }
  },
  props: {
    submenus: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    hasActiveSubmenu (parent, menu) {
      if (this.$route.name.includes(parent)) {
        if (!menu.showSubmenu) menu.showSubmenu = true
        return 'subactive'
      }
    }
  }
}
</script>