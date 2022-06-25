<template>
  <div>
    <v-container grid-list-md>
      <form-drawer :comment="comment" :drawerStatus="drawer1" @closeDrawer="drawer1 = !drawer1"
        @addRecord="addRecord($event)"
        @updateRecord="updateRecord($event)"
        @addComment="addComment"
        @updateComment="updateComment"
        :selectedItem="selectedItem"
      />
      <v-layout row wrap>
        <v-flex xs12 class="pb-5">
        <div class="toolbar-container">
          <v-toolbar  flat outlined color="primary" dark>
            <v-toolbar-title class="title-header">Photos</v-toolbar-title>
            <v-spacer></v-spacer>
            <div style="width: 400px;">
              <v-text-field
                clearable
                filled
                v-model="search"
                rounded
                hide-details=""
                placeholder="Search items by title, description ..."
                height="10"
                dense
                append-icon="mdi-magnify"
              ></v-text-field>
            </div>
            <v-icon
              class="mx-2"
              @click="default_view = !default_view"
            >
              {{!default_view ? 'mdi-view-grid-outline' : 'mdi-format-list-bulleted'}}
            </v-icon>
            <v-icon class="mx-2" @click="newPhoto">mdi-plus</v-icon>
            <!-- <pinned-messages/> -->
          </v-toolbar>
        </div>
        </v-flex>

      </v-layout>
      <template v-if="data.length">
        <default-view
          v-if="default_view"
          :data="data"
          @openDetails="openDetails"
          @download="downloadImage"
        />
        <list-view
          v-else
          :data="data"
          @openDetails="openDetails"
          @download="downloadImage"
        />
      </template>
       <v-flex xs12 v-else>
          <empty-data></empty-data>
        </v-flex>
    </v-container>
  </div>
</template>
<script>
import formDrawer from "~/components/clients/photos/form.vue";
import defaultView from "~/components/clients/photos/view/default.vue";
import listView from "~/components/clients/photos/view/list.vue";
import emptyData from "~/components/error/empty_data.vue"

// import pinnedMessages from '@/components/clients/chats/pinnedMessages.vue'
export default {
  components: {
    formDrawer,
    defaultView,
    listView,
    emptyData
    // pinnedMessages,
  },
    data(){
    return {
      search:'',
      awaitingSearch: false,
      default_view:true,
      drawer1:false,
      selectedItem:{},
      data:[],
      comment: [],
      isEdit2: false
    }
  },
  watch: {
    search(val) {
      if (!this.awaitingSearch) {
          setTimeout(() => {
            this.searchPhotos()
            this.awaitingSearch = false;
          }, 1500); // 1.5 sec delay
        }
        this.awaitingSearch = true;
    },
  },
  mounted(){
    this.initialize()
    console.log(this.imageUrl('clients', 6, 'test' ), 'urlsss')
    //console.log(this.drawer1,'drawer')
  },
  methods:{
    newPhoto() {
      this.isEdit2 = 1
      this.drawer1 = true
    },
    initialize(){
      this.id = this.$route.params.id
      this.getDatas()
    },
    getDatas(){
      this.$axios.get(`${this.$clients}/${this.id}/photos`).then(({data}) => {
        this.data = data
      })
    },
    searchPhotos(){
      console.log('test')
    },
    openDetails(item={}){
      this.drawer1 = !this.drawer1
      this.selectedItem = this.cloneVariable(item)
      this.drawer1 = true
    },
    // openDetails(item={}){
    //   this.drawer1 = !this.drawer1
    //   this.selectedItem = this.cloneVariable(item)
    // },
    downloadImage(payload){
      payload['client_id'] = this.$route.params.id
      this.$axios.post(`${this.$images}/download`, payload).then(({data}) => {
        console.log(data)
        this.download(data, payload)
      })
    },
    addComment(payload){
      this.$axios.post(`coaches/add-comment`, payload).then(({data}) => {
        this.comment = data
        console.log(data, 'data')
        this.initialize()
      })
    },
    updateComment(payload){
      this.$axios.put(`coaches/update-comment`, payload).then(({data}) => {
        this.comment = data
        console.log(this.comment, 'comment')
        this.initialize()
      })
    },
    addRecord(payload){
      payload['client_id'] = this.$route.params.id
      this.$axios.post(`${this.$clients}/addPhoto`, payload).then(({data}) => {
        // this.successNotification(payload, "save","coach","coaches","title")
        this.initialize()
        console.log(data, 'addPhoto')
      })
    },
    updateRecord(payload){
      payload['client_id'] = this.$route.params.id
      this.$axios.put(`${this.$images}/${payload.id}`, payload).then(({data}) => {
          // this.successNotification(data, 'updated', 'country', 'countries', 'short_name')
          this.initialize()
          console.log(data,'update')
        })
    }
  }
}
</script>
