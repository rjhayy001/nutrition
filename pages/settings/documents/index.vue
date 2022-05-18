<template>
   <v-container grid-list-md class="main-container" @contextmenu.prevent="show">
    <v-layout row wrap>
      <v-flex xs12 class="pb-5">
        <div class="toolbar-container">
          <v-toolbar  dense >
            <v-toolbar-title class="title-header">Documents</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon class="mx-2">mdi-format-list-checkbox</v-icon>
            <v-icon class="mx-2">mdi-phone-outline</v-icon>
            <v-icon class="mx-2">mdi-video-outline</v-icon>
            <pinned-messages/>
          </v-toolbar>
        </div>
      </v-flex>
    </v-layout>
    <input type="file" multiple ref="file_input" class="d-none">
    <file-viewer
      :files="files"
    />
    <select-menu
      :dialog="showMenu"
      :options="menu_options"
      @close="showMenu=false"
      @addDocuments="addDocuments"
    />
   </v-container>
</template>
<script>
import fileViewer from '@/components/ui/fileViewer.vue'
import selectMenu from '@/components/clients/documents/selectMenu.vue'
export default {
  components:{
    fileViewer,
    selectMenu
  },
  data(){
    return{
      showMenu: false,
      menu_options:{
        x:0,
        y:0,
        in_item_click:false
      },
      files:[
        {
          type: 'folder',
          link: 'folder1/',
          name: 'folderasdasdjasldjasl;kdjasl;djasl;djasl;djasl;djasl;dj',
          data: '',
        },
        {
          type: 'image',
          link: 'folder1/',
          name: 'image1',
          data: 'https://assets-global.website-files.com/5ec7dad2e6f6295a9e2a23dd/621367c9ae7ebd6cf845847c_upwork-profile-examples.jpeg',
        },
        {
          type: 'pdf',
          link: '',
          name: 'pdf',
          data: '',
        },
         {
          type: 'txt',
          link: '',
          name: 'text',
          data: '',
        },
        {
          type: 'docx',
          link: '',
          name: 'docs',
          data: '',
        },
        {
          type: 'zip',
          link: '',
          name: 'zip',
          data: '',
        },
        {
          type: 'html',
          link: '',
          name: 'html',
          data: '',
        },
        {
          type: 'mp3',
          link: '',
          name: 'mp3',
          data: '',
        },
        {
          type: 'ppt',
          link: 'folder1/',
          name: 'unverified',
          data: 'https://assets-global.website-files.com/5ec7dad2e6f6295a9e2a23dd/621367c9ae7ebd6cf845847c_upwork-profile-examples.jpeg',
        },
      ],
    }
  },
  methods:{
    addDocuments(){
      this.$refs.file_input.click()
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
  }
}
</script>
<style scoped>
.main-container {
  min-height: 92vh !important;
}
</style>
