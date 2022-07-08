<template>
  <div class="text-center">
    <v-menu
      offset-y
      right
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
      <v-card
        width="400"
        height="800"
      >
        <v-toolbar
          dense
          flat
          style="position:sticky; top:0; background-color:white; z-index:2;"
        >
          <v-toolbar-title class="font-weight-medium">Notifications</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn small color="primary" text @click="markAllAsRead" >
                mark as read
             </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list two-line>

            <template v-for="(item, index) in items">
              <v-list-item
                :style="item.is_read == 0 ? 'background-color:#7c94de; color:white;': ''"
                :key="index+'test'"
                @click="readNotification(item)"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-avatar>
                    <v-img :src="!item.sender.logo ?  default_profile : item.sender.logo "></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.sender.full_name"></v-list-item-title>

                    <v-list-item-subtitle
                      :style="item.is_read == 0 ? 'color:white;': ''"
                      v-text="item.title"
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle :style="item.is_read == 0 ? 'color:white;': ''" v-text="item.message"></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text :style="item.is_read == 0 ? 'color:white;': ''" v-text="fromDate(item.created_at)"></v-list-item-action-text>

                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                v-if="index < items.length - 1"
                :key="index"
              ></v-divider>
            </template>
        </v-list>
      </v-card>

    </v-menu>
  </div>
</template>
<script>
import default_profile from "@/static/images/empty_person.png";

export default {
  data () {
    return {
      default_profile,
      menu: false,
      count: 0,
      selected:[],
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }
  },
  watch:{
    menu: {
      handler(val) {
       if(val){
        this.initialize()
       }
      },
    },
  },
  mounted () {
    this.activateNotification()
    this.initialize()
  },
  methods: {
    routeChanger(item){
      let route = "client-id-coaching-"+item.table_type

      this.goTo(route, {id: item.sender_id})
      this.menu = false
    },
    readNotification (item) {
      if(item.is_read == 0){
        this.$axios
        .get(`${this.$coaches}/mark_read/${item.id}`)
        .then(({ data }) => {
          console.log(data, 'readddd')
          this.initialize()
        });
      }
      this.routeChanger(item)
      // this.count = this.count - 1
    },
    initialize () {
      this.$axios
        .get(`${this.$coaches}/${this.$auth.user.id}?&relations=notifications`)
        .then(({ data }) => {
          this.items = data.notifications
          this.countUnRead()
          console.log(this.items, 'notifi')
        });
    },
    countUnRead(){
      this.count = 0
      this.items.forEach(item => {
        if(item.is_read == 0){
          this.count = this.count+1
        }
      })
    },
    markAllAsRead(){
      this.$axios
        .get(`${this.$coaches}/mark_read_all_notification/${this.$auth.user.id}`)
        .then(({ data }) => {
          console.log(data, 'readddd')
          this.initialize()
        });
    }
  }
}
</script>
