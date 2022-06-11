<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 class="pb-0">
        <div class="toolbar-container">
          <v-toolbar flat dense color="#f5f5f5">
            <v-toolbar-title class="title-header">@ Test</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon class="mx-2">mdi-magnify</v-icon>
            <v-icon class="mx-2">mdi-phone-outline</v-icon>
            <v-icon class="mx-2">mdi-video-outline</v-icon>
            <pinned-messages/>
          </v-toolbar>
        </div>
      </v-flex>
      <v-flex xs10>
        <v-list class="scrollable-element">
          <div v-for="(item, index) in 5" :key="index">
            <div class="date-divider ">
              <p class="px-2">March 23 2011</p>
            </div>
            <v-list-item>
              <v-list-item-avatar
                size="30"
              >
                <v-img :src="'https://cdn.vuetifyjs.com/images/lists/1.jpg'" ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="subtitle-2">John Doe</v-list-item-title>
                <v-list-item-subtitle class="pt-1" style="font-size:13px;">
                  Do you have Paris recommendations? Have you ever been?
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-avatar
                size="30"
              >
                <v-img :src="'https://cdn.vuetifyjs.com/images/lists/2.jpg'" ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="subtitle-2">John Doe2</v-list-item-title>
                <v-list-item-subtitle class="pt-1">
                 Secret !
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>
        <div class="text-field-container">
          <v-text-field
            filled
            placeholder="Message @test"
            rounded
            dense
            hide-details="auto"
          >
            <template v-slot:prepend-inner>
              <v-icon class="mr-1">mdi-upload</v-icon>
              <user-photos @confirm="confirmPhotos"></user-photos>
              <v-divider vertical class="mx-2"></v-divider>
            </template>
            <template v-slot:append>
              <v-icon color="#7c94de">mdi-send</v-icon>
            </template>
          </v-text-field>
        </div>
      </v-flex>
      <v-flex xs2 class="pt-0">
        <coach></coach>
      </v-flex>
      <confirm-photos
        :dialog="confirm_photos_dialog"
        @close="confirm_photos_dialog=false"
        :photos="tobe_sent_photos"
        @send="send"
      ></confirm-photos>
    </v-layout>
  </v-container>
</template>
<script>
  import userPhotos from '@/components/clients/chats/userPhotos.vue'
  import confirmPhotos from '@/components/clients/chats/confirmPhotos.vue'
  import coach from '@/components/clients/chats/coach.vue'
  import pinnedMessages from '@/components/clients/chats/pinnedMessages.vue'
  export default {
    components: {
      coach,
      pinnedMessages,
      userPhotos,
      confirmPhotos
    },
    data(){
      return {
        tobe_sent_photos: [],
        confirm_photos_dialog: false
      }
    },
    created(){
      this.initialize()
    },
    methods:{
      initialize(){
        console.log(this.$route.params.id)
      },
      send(){
        alert('test')
      },
      confirmPhotos(photos){
        this.tobe_sent_photos = photos
        this.$nextTick(() => {
          this.confirm_photos_dialog = true
        })
      }
    }
  }
</script>
<style scoped>
.scrollable-element {
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: auto;
    height:76vh;
    border-bottom: #dfdfdf;
}

.scrollable-element::-webkit-scrollbar {
  background-color: #dfdfdf;
  width: 8px;
  border-radius: 50px;
}

.scrollable-element::-webkit-scrollbar-thumb {
  background-color: #858383;
  border-radius: 50px;
}

.text-field-container {
  position: sticky;
    bottom: 20px;
}
.date-divider {
  position: relative !important;
  text-align: center;
  z-index: 5;
}
.date-divider p {
    width: fit-content;
    margin: 0 auto;
    background: white !important;
    font-size: 13px !important;
    font-weight: 200;
}
.date-divider::before {
  z-index: -1;
  position: absolute;
  content: '';
  width: 100%;
  height: 1px;
  background: #d9d9d9;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.toolbar-container {
  position: sticky;
  top: 76px;
  background:white;

}

.title-header{
  font-weight: 500;
  font-size: 17px;
}

</style>