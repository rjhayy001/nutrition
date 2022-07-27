<template>
  <div>
    <v-container grid-list-md>
      <form-drawer :comment="comment" :drawerStatus="drawer1" @closeDrawer="drawer1 = !drawer1"
        @addRecord="addRecord($event)"
        @updateRecord="updateRecord($event)"
        @addComment="addComment"
        @download="downloadImage"
        @updateComment="updateComment"
        :selectedItem="selectedItem"
      />
      <v-layout row wrap>
        <v-flex xs12 class="pb-5">
        <div class="toolbar-container">
          <!-- <v-toolbar  flat outlined color="primary" dark> -->
          <v-toolbar  flat  color="none" >
            <v-toolbar-title class="title-header">Photos</v-toolbar-title>
            <v-spacer></v-spacer>
            <div style="width: 300px;">
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
            <!-- <v-icon class="mx-2" >mdi-filter-menu-outline</v-icon> -->
            <v-menu
              transition="slide-y-transition"
              bottom
              left
              offset-y
              :close-on-content-click="false"
              min-width="200"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="mx-2"
                v-bind="attrs"
                v-on="on"
                >
                  mdi-filter-menu-outline
                </v-icon>
              </template>
              <v-list class="pa-2">
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="320px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    class="pa-3"
                      v-model="date"
                      label="Filter by Month"
                      prepend-icon="mdi-calendar"
                      readonly
                      hide-details="true"
                      append-icon="mdi-refresh"
                      v-bind="attrs"
                      outlined
                      dense
                      v-on="on"
                      @click:append="$router.go()"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    type="month"
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="modal = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(date),filterMonth(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-list>
            </v-menu>
            <!-- <v-icon class="mx-2" @click="newPhoto">mdi-plus</v-icon> -->
            <!-- <pinned-messages/> -->
          </v-toolbar>
        </div>
          <hr />

        </v-flex>

      </v-layout>
      <template v-if="data.length">
        <default-view
          v-if="default_view"
          @initialize="initialize"
          :photos="data"
          :month="month"
          :search="search"
          @clearSearch="search=null"
          @openDetails="openDetails"
          @download="downloadImage"
        />
        <list-view
          v-else
          @initialize="initialize"
          :photos="data"
          :month="month"
          :search="search"
          @clearSearch="search=null"
          @openDetails="openDetails"
          @download="downloadImage"
        />
      </template>
       <v-flex xs12 v-else>
          <empty-data></empty-data>
        </v-flex>
         <feed-back-form :feedback_type="type"></feed-back-form>
    </v-container>
  </div>
</template>
<script>
import formDrawer from "~/components/clients/photos/form.vue";
import defaultView from "~/components/clients/photos/view/default.vue";
import listView from "~/components/clients/photos/view/list.vue";
import emptyData from "~/components/error/empty_data.vue"
import feedBackForm from "~/components/clients/coaching/feedback/form.vue"
// import pinnedMessages from '@/components/clients/chats/pinnedMessages.vue'
export default {
  components: {
    formDrawer,
    defaultView,
    listView,
    emptyData,
    feedBackForm
    // pinnedMessages,
  },
    data(){
    return {
      search:'',
      type:'photos',
      awaitingSearch: false,
      default_view:true,
      drawer1:false,
      selectedItem:{},
      data:[],
      constant: [],
      comment: [],
      isEdit2: false,
      // date: new Date().toISOString().substr(0, 7),
      date: new Date().toISOString().slice(0, 7),
      month: null,
      modal: false,
    }
  },
  watch: {
    search(val) {
      this.search = val
      // if (!this.awaitingSearch) {
      //   setTimeout(() => {
      //     this.searchPhotos()
      //     this.awaitingSearch = false;
      //   }, 1500); // 1.5 sec delay
      // }
      // this.awaitingSearch = true;
    },
  },
  mounted(){
    this.initialize()
    //console.log(this.drawer1,'drawer')
  },
  methods:{
    filterMonth(val){
      this.month = val
    },
    // filterMonth(val){
    //   this.date = val
    //   this.month = val
    //   let filtered = []
    //   let month = this.$moment(this.date).format('MMMM YYYY')
    //   this.constant.forEach(element => {
    //     let photoMonth = this.$moment(element.created_at).format('MMMM YYYY')
    //     if(month == photoMonth){
    //       filtered.push(element)
    //     }
    //   });
    //   this.data = filtered
    //   // console.log(this.$moment(val).format('MMMM YYYY'))
    // },
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
        this.constant = data
      })
    },
    // searchPhotos(){
    //   console.log('test')
    // },
    openDetails(item={}){
      this.drawer1 = !this.drawer1
      this.selectedItem = this.cloneVariable(item)
      this.drawer1 = true
    },
    downloadImage(payload){
      this.$axios({
          url: `images/download?&client=${payload.pivot.imagable_id}&file=${payload.pivot.images_id}`,
          method: 'GET',
          responseType: 'blob',
      }).then((response) => {
        this.downloadClientPhoto(response, payload)
          // const url = window.URL.createObjectURL(new Blob([response.data]));
          // const link = document.createElement('a');
          // link.href = url;
          // link.setAttribute('download', payload.file_name); //or any other extension
          // document.body.appendChild(link);
          // link.click();
      });
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
