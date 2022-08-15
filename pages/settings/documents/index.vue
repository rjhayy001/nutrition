<template>
   <!-- <v-container grid-list-md class="main-container" @contextmenu.prevent="show" > -->
   <v-container grid-list-md class="main-container" >
    <v-layout row wrap >
      <v-flex xs12 class="mb-4">
        <div class="d-flex align-center py-2 data-table-cus">
          <p class="title mr-1">
            {{ this.$t('coaches.documents') }}
          </p>
          <v-spacer></v-spacer>
          <div style="width: 400px;">
          <v-text-field
            clearable
            filled
            @input="findDocuments"
            rounded
            hide-details=""
            outlined
<<<<<<< HEAD
            :placeholder="this.$t('coaches.search')"
=======
            :placeholder="this.$t('global.search')"
>>>>>>> 6c5d7959b388caba0845ac2c89b3a53815c48a79
            dense
            v-model="param.search"
            append-icon="mdi-magnify"
          ></v-text-field>
          </div>
          <div style="width: 200px;" id="types">
            <v-select
              @change="getSelectedFilter"
              rounded
              :items="type"
<<<<<<< HEAD
              :label="this.$t('coaches.types')"
              item-text="text"
              item-value="id"
=======
              label="type"
              item-text="label"
              item-value="key"
>>>>>>> 6c5d7959b388caba0845ac2c89b3a53815c48a79
              clearable
              dense
              outlined
              hide-details ="true"
              v-model="param.idfilter"
            ></v-select>
            
          </div>
           <v-icon
              class="mx-2"
              @click.stop="defaultView"
            >
              {{!default_view ? 'mdi-view-grid-outline' : 'mdi-format-list-bulleted'}}
            </v-icon>
            <v-icon class="mx-2" @click="show">mdi-plus</v-icon>
        </div>
        <hr />
      </v-flex>
    </v-layout>
    <input type="file" multiple ref="file_input" class="d-none">
    <file-viewer v-if="default_view == false"
      :files="Files"
      @deleteDoc= "deleteDoc"
      @getDocuments= "getDocuments"

    />
    <list-view v-if="default_view == true"  ref="fileViewer" :files="Files" :loaders ="loader" @showDocument ="showDocument" @getDocuments = "getDocuments"/>
    <select-menu
      :dialog="showMenu"
      :options="menu_options"
      @close="showMenu=false"
      @addDocuments="addDocuments"
      @addUrl="addUrl"
    />
    <upload-form :showUploadForm="showUploadForm" @hideForm="hideForm" ></upload-form>
    <add-url
      :showAddurl="showAddurl"
      @close="showAddurl=false"
      @showDocument ="showDocument"
    />
   </v-container>
   
   
</template>
<script>
import fileViewer from '@/components/ui/fileViewer.vue'
import listView from '@/components/ui/listView.vue'
import selectMenu from '@/components/clients/documents/selectMenu.vue'
import uploadForm from '@/components/clients/documents/uploadFiles.vue'
import addUrl from '@/components/clients/documents/addUrl.vue'
export default {
  components:{
    fileViewer,
    selectMenu,
    listView,
    uploadForm,
    addUrl
  },
  data(){
    return{
      showMenu: false,
      loader: true,
      File: [],
      Files: [],
      menu_options:{
        x:0,
        y:0,
        in_item_click:false
      },
      default_view:false,
      showUploadForm:false,
      showAddurl:false,
<<<<<<< HEAD
      // type: [ this.$t('coaches.image'),this.$t('coaches.video'), this.$t('coaches.link'),this.$t('coaches.application')],
      type: [
        {id:0 , text: this.$t('coaches.image')},
        {id:1 , text: this.$t('coaches.video')},
        {id:2 , text: this.$t('coaches.link')},
        {id:3 , text: this.$t('coaches.application')},
      ],
      forFilter: [ 'image','video', 'link','application'],

=======
      // type: [ 'image','video', 'link','application'],
      type: [
        {key: 'image', label: 'Image'},
        {key: 'video', label: this.$t('global.video')},
        {key: 'link', label: this.$t('global.link')},
        {key: 'application', label: 'Application'},
      ],
>>>>>>> 6c5d7959b388caba0845ac2c89b3a53815c48a79
      param:{
        search:'',
        idfilter:'',
      }
    }
  },
  watch: {
      File: function(value) {
        this.Files = this.File;
      }
    },
  mounted(){
    this.getDocuments();
  },
  methods:{
    addDocuments(){
      this.showUploadForm = true;
    },
    addUrl(){
      this.showAddurl = true;
    },
    showDocument(){
      this.getDocuments();
      this.showAddurl = false;
    },
    findDocuments(){

      this.searchFilter();
    },
    getSelectedFilter(){
     this.searchFilter(this.idfilter);
    },
    show (e) {
      e.preventDefault()
      this.showMenu = false
      this.menu_options.x = e.clientX
      this.menu_options.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    getDocuments () {
      this.$axios
        .get(`documents/`+this.$auth.user.id
         )
        .then(({ data }) => {
          this.File =data;
        });
    },
    deleteDoc (id) {
      this.$axios
        .delete(`documents/`+id +'?coach_id='+this.$auth.user.id
         )
        .then(({ data }) => {
        this.getDocuments();
        this.successDeleteNotification("delete");
      });
    },
    hideForm() {
      this.showUploadForm = false;
      
      this.getDocuments();
    },
    defaultView() {
      if(this.default_view){
        this.default_view = false;
      }
      else{
         this.default_view = true;
      }
      this.getDocuments();
    },
    searchFilter(){
      // console.log(this.param.search)
      // console.log(this.param.idfilter)
      // console.log(this.forFilter[this.param.idfilter]);
      // return
      if(this.param.search == null && this.param.idfilter == ''){
        this.getDocuments();
        return;
      }
      this.$axios
        .post(`documents/searchFilter/`,{
            search : this.param.search,
            type : this.forFilter[this.param.idfilter],
            // type : this.param.idfilter,
            client_id:`${this.$route.params.id}`,
            coach_id:this.$auth.user.id,
          }
        )
        .then(({ data }) => {
          console.log('test');
          this.File =data;
        });
    }
  }
}
</script>
<style scoped>
.main-container {
  min-height: 92vh !important;
}
#types{
  position: relative;
  top: -3px;
  margin-left: 18px;
}
#header_toolbar{
  height: unset !important;
  padding: 8px !important;
}

</style>
