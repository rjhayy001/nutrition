<template>
  <div class="text-center">
    <v-menu
      offset-y
      left
      v-model="menu"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-badge
            color="primary"
            :value="count"
            :content="count"
          >
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-card width="200">
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="readNotification(item)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>

    </v-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menu:false,
      count:0,
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }
  },
  mounted () {
    this.activateNotification()
  },
  methods:{
    readNotification(item){
      console.log(item)
      this.count = this.count-1
    }
  }
}
</script>
