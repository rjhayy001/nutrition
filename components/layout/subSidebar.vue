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
    <v-list
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
    submenus: {
      type:Array,
      default: () => {
        return []
      }
    }
  }
}
</script>