<template>
   <v-menu 
    bottom left offset-y 
    tile
    min-width="200"
    nudge-left="0" 
    nudge-top="-8"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        dense
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props: {
    items: {
      type: Array,
      default:() => {
        return []
      }
    }
  }
}
</script>