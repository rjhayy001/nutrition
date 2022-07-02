<template>
  <v-layout row wrap id="test" >
    <v-layout v-if="files.length != 0">
      <v-flex xs1 class="pb-0 flex-wrap" v-for="(item,index) in files" :key="index" >
        <v-card class="text-center mx-auto pa-1" @click="showdialog(true, item)"> 
          <img v-if="checkFile(item.file_type)  == 'image'"
            :src="imageUrl2('documents/coach', $auth.user.id, item.file_name)"
            @contextmenu.stop="show"
            class="ma-auto file"
            id="imgfile"
          >
          <video id="video-preview" v-else-if="checkFile(item.file_type) == 'video'" controls :src="imageUrl2('documents/coach', $auth.user.id, item.file_name)"/>
          <a target="_blank" v-else-if="checkFile(item.file_type)  == 'link'" :href="item.file_name">
          <img 
            :src="iconSelector(item)"
            @contextmenu.stop="show"
            class="ma-auto file"
            contain
            id="imgfile"
          >
          </a>
            <img v-else
            :src="iconSelector(item)"
            @contextmenu.stop="show"
            class="ma-auto file"
            contain
            id="imgfile">
          <div class="file-name">{{item.file_name}}</div>
          
        </v-card>
      </v-flex>
    </v-layout>
  
    <div class="pa-2 mt-50 _nofeedback" v-else>
          <v-icon class="mx-2" style="font-size: 100px;">mdi-alert</v-icon>
          <p class="title mr-1">
            No documents
          </p>
    </div>

    <v-row justify="center" v-if ="dialogdata.length > 0">
      <v-dialog v-model="dialog" persistent :max-width="checkFile(dialogdata[0].file_type) == 'application'?1300:800">   
          <v-card  :height="checkFile(dialogdata[0].file_type) == 'application'?1000:''" :id="checkFile(dialogdata[0].file_type) == 'application'?'v-card-wrapper':''">
            <v-toolbar class="text-h5 grey lighten-2 " flat dense d-flex>
              <v-btn small  @click="showdialog(false)">back</v-btn>
              <v-spacer></v-spacer>
              <span class="subtitle-1 text-capitalize font-weight-bold">{{dialogdata[0].file_name}}</span>
            </v-toolbar>
            <v-card-text class="pa-0" id="v-card-text-wrraper" :style="checkFile(dialogdata[0].file_type) == 'application'?'height:100%':''">
              <v-container>
                <div id="cont-wrapper"> 
                  <img v-if="checkFile(dialogdata[0].file_type)  == 'image'"
                  :src="imageUrl2('documents/coach', $auth.user.id, dialogdata[0].file_name)"
                  @contextmenu.stop="show"
                  class="ma-auto file"
                  id="imgfile"
                  >
                  <video id="video-preview" v-if="checkFile(dialogdata[0].file_type) == 'video'" controls :src="imageUrl2('documents/coach', $auth.user.id, dialogdata[0].file_name)"/>
                 <!-- <embed src="http://localhost:9292/documents/coach/1/1_84.pdf" width="100%" height="100%"> -->

                 <iframe :src="imageUrl2('documents/coach', $auth.user.id, dialogdata[0].file_name)"  v-if="checkFile(dialogdata[0].file_type) == 'application'"  width="500" height="500" />
                </div>
              </v-container>
            </v-card-text>

          </v-card>
        </v-dialog>
    </v-row>
    <select-menu
      :dialog="showMenu"
      :options="menu_options"
      @close="showMenu=false"
    />
  </v-layout>
</template>
<script>
import iconHelper from '@/mixins/iconHelper'
import selectMenu from '@/components/clients/documents/selectMenu.vue'
import uploadForm from '@/components/clients/documents/uploadFiles.vue'
import UploadFiles from '../clients/documents/uploadFiles.vue'
import Daily from '../clients/coaching/tracking/daily.vue'

export default {
  mixins: [iconHelper],
  props:['files'],
  components:{
    selectMenu,
    UploadFiles,
    Daily
},
  data(vm){
    return {
      showMenu: false,
      dialog:false,
      dialogdata:[],
      menu_options:{
        x:0,
        y:0,
        in_item_click:true
      },
    }
  },
  // mounted(){
  //   window.open('Https://Flyclipart.Com/Chain-Link-Share-Url-Icon-Chain-Link-Png-612605');
  // },
  methods: {
    iconSelector(item){
      const getype = item.file_type.split("/");
      console.log(this.types);
      // let srcIcon = this.types.find(type => type.type == item.type)
      let srcIcon = this.types.find(type => type.type == getype[1])
      if(item.type =='image'){
        return item.data
      }
      return srcIcon ? srcIcon.icon : this.unverifyIcon
    },
    show(e){
      e.preventDefault()
      this.showMenu = false
      this.menu_options.x = e.clientX
      this.menu_options.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    checkFile(file) {
      const type = file.split("/");
        return type[0];
     },
    
    selected(e){
        e.target.classList.add("is_active")
    },
    deselect(e){
        e.target.classList.remove("is_active")
    },
    showdialog(bool, item=''){
        const thiss = this;
        if(item.file_type !='link/url'){
          if(bool == true){
            this.dialogdata.push(item);
          setTimeout(function(scope) {
            thiss.dialog = bool;
          },500, this);
        }
        else{
          this.dialog = bool;
          this.dialogdata=[];
        }
      }
    }
  }
}
</script>
<style scoped>
.file-name{
  white-space: nowrap;
  overflow: hidden;
  margin-top: 5px;
  text-overflow: ellipsis;
}
/* .is_active .file{
  background: #c3bcbc !important;
  border: solid 1px;
} */

.is_active{
  /* color: white; */
  /* background:#7c94de; */
  border: solid 1px;
}
#video-preview{
  width: 120px;
  height: 100px;
  object-fit: fill;
}
.mouseOver{
  background-color: #ebebeb;
}
#imgfile{
  width: 120px;
  height: 100px;
  object-fit: contain;
}
#cont-wrapper *{
    width: 100%;
    height: 100%;
    object-fit: fill;
}
._nofeedback{
  width: 100%;
  text-align: center;
  margin-top: 18%;
}
#test .layout{
  flex-wrap: wrap !important;
  width: 100%;
}

</style>
<style >
#v-card-wrapper > div#v-card-text-wrraper *{
  height: 100%;
}
</style>
