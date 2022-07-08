<template>
   <!-- <v-container grid-list-md class="main-container" @contextmenu.prevent="show" > -->
   <v-container grid-list-md class="main-container" >
    <v-layout row wrap>
      <v-flex xs12 class="pb-5">
        <div class="toolbar-container">
          <v-toolbar  dense id="header_toolbar" >
            <v-toolbar-title class="title-header">Documents</v-toolbar-title>
            <v-spacer></v-spacer>
             <div style="width: 400px;">
              <v-text-field
                clearable
                filled
                @input="findDocuments"
                rounded
                hide-details=""
                placeholder="Search"
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
                  label="type"
                  item-text="type"
                  item-value="id"
                  clearable
                  dense
                  outlined
                  v-model="param.idfilter"
                ></v-select>
                
             </div>
            <!-- <v-icon class="mx-2">mdi-format-list-checkbox</v-icon> -->
            <v-icon
              class="mx-2"
              @click="default_view = !default_view"
            >
              {{!default_view ? 'mdi-view-grid-outline' : 'mdi-format-list-bulleted'}}
            </v-icon>
            <!-- <v-icon class="mx-2">mdi-phone-outline</v-icon>
            <v-icon class="mx-2">mdi-video-outline</v-icon> -->
            <v-icon class="mx-2" @click="show">mdi-plus</v-icon>
            <!-- <pinned-messages/> -->
          </v-toolbar>
        </div>
      </v-flex>
    </v-layout>
    <input type="file" multiple ref="file_input" class="d-none">
    <file-viewer v-if="default_view == false"
      :files="Files"
    />
    <list-view v-if="default_view == true"  :files="Files" @showDocument ="showDocument"/>
    <select-menu
      :dialog="showMenu"
      :options="menu_options"
      @close="showMenu=false"
      @addDocuments="addDocuments"
      @addUrl="addUrl"
    />
    <upload-form :showUploadForm="showUploadForm" @hideForm="hideForm"></upload-form>
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
      File: [],
      Files: [],
      menu_options:{
        x:0,
        y:0,
        in_item_click:false
      },
      // files:[
      //   {
      //     type: 'folder',
      //     link: 'folder1/',
      //     name: 'folderasdasdjasldjasl;kdjasl;djasl;djasl;djasl;djasl;dj',
      //     data: '',
      //   },
      //   {
      //     type: 'image',
      //     link: 'folder1/',
      //     name: 'image1',
      //     data: 'https://assets-global.website-files.com/5ec7dad2e6f6295a9e2a23dd/621367c9ae7ebd6cf845847c_upwork-profile-examples.jpeg',
      //   },
      //   {
      //     type: 'pdf',
      //     link: '',
      //     name: 'pdf',
      //     data: '',
      //   },
      //    {
      //     type: 'txt',
      //     link: '',
      //     name: 'text',
      //     data: '',
      //   },
      //   {
      //     type: 'docx',
      //     link: '',
      //     name: 'docs',
      //     data: '',
      //   },
      //   {
      //     type: 'zip',
      //     link: '',
      //     name: 'zip',
      //     data: '',
      //   },
      //   {
      //     type: 'html',
      //     link: '',
      //     name: 'html',
      //     data: '',
      //   },
      //   {
      //     type: 'mp3',
      //     link: '',
      //     name: 'mp3',
      //     data: '',
      //   },
      //   {
      //     type: 'ppt',
      //     link: 'folder1/',
      //     name: 'unverified',
      //     data: 'https://assets-global.website-files.com/5ec7dad2e6f6295a9e2a23dd/621367c9ae7ebd6cf845847c_upwork-profile-examples.jpeg',
      //   },
      // ],
      default_view:false,
      showUploadForm:false,
      showAddurl:false,
      type: [ 'image','video', 'link','application'],
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
    },
    findDocuments(){
      this.searchFilter(this.search);
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
    hideForm() {
      this.showUploadForm = false;
      
      this.getDocuments();
    },
    searchFilter(data){
      if(this.param.search == null || this.param.idfilter == ''){
        this.getDocuments();
        return;
      }
      this.$axios
        .post(`documents/searchFilter/`,{
            search : this.param.search,
            type : this.param.idfilter,
            client_id:`${this.$route.params.id}`,
            coach_id:this.$auth.user.id,
          }
        )
        .then(({ data }) => {
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
  top: 12px;
  margin-left: 18px;
}
#header_toolbar{
  height: unset !important;
  padding: 8px !important;
}

</style>
