<template>
  <v-layout row wrap id="test">

      <v-layout v-if="files.length != 0 && loads==true">
        <v-flex xs1 class="pb-0 flex-wrap" v-for="(item,index) in files" :key="index" >
          <v-card class="text-center mx-auto pa-1" @click="showdialog(true, item)"> 
            <img v-if="checkFile(item.file_type)  == 'image'"
              :src="imageUrl2('documents/coach', $auth.user.id, item.file_path)"
              @contextmenu.stop="show"
              class="ma-auto file"
              id="imgfile"
            >
            <video id="video-preview" v-else-if="checkFile(item.file_type) == 'video'" controls :src="imageUrl2('documents/coach', $auth.user.id, item.file_path)"/>
            <a target="_blank" v-else-if="checkFile(item.file_type)  == 'link'" :href="item.file_path">
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
            <div class="file-name">{{item.file_name | truncate(8, '...')}}</div>
            <div id="v-menu-wrap">
              <v-menu left :close-on-content-click="closeOnContentClick" min-width="128px">
                  <template v-slot:activator="{ on, attrs }">
                      <v-icon  v-bind="attrs"
                      v-on="on" id="actionGroup">mdi-dots-vertical</v-icon>
                  </template>
                  <v-list id="v-list-wrapper">
                    <v-list-item v-for="(action, key) in items":key="key"link>
                      <v-list-item-title @click="groupAction(action.id,item,index)" size="20">
                      {{ action.title }}
                      </v-list-item-title>
                      <v-icon size="20">{{action.icon}}</v-icon>
                    </v-list-item>
                  </v-list>
              </v-menu>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
  
       <div class="pa-2 mt-50 _nofeedback" v-if="files.length <= 0 && loads==true">
            <empty/>
        </div>
      <div v-if="loads==false">
        <loading/>
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
                    :src="imageUrl2('documents/coach', $auth.user.id, dialogdata[0].file_path)"
                    @contextmenu.stop="show"
                    class="ma-auto file"
                    id="imgfile"
                    >
                    <video id="video-preview" v-if="checkFile(dialogdata[0].file_type) == 'video'" controls :src="imageUrl2('documents/coach', $auth.user.id, dialogdata[0].file_path)"/>
                    <iframe :src="imageUrl2('documents/coach', $auth.user.id, dialogdata[0].file_path)"  v-if="checkFile(dialogdata[0].file_type) == 'application'"  width="500" height="500" />
                  </div>
                </v-container>
              </v-card-text>

            </v-card>
          </v-dialog>
          
      </v-row>
      <v-dialog width="400" v-model="editFile" persistent>
          <v-card>
            <v-toolbar class="text-h5 grey lighten-2" flat dense>
              <v-btn small @click="editFile=false, newname=''">{{this.$t('coaches.cancel')}}</v-btn>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <span class="subtitle-1  font-weight-normal">Edit name</span>
            </v-toolbar>
            <v-card-text class="px-4 py-2">
                <v-form ref="form" lazy-validation>
                <div>
                  <v-text-field
                  type="text"
                  v-model="newname"
                  label="New file name"
                  :rules="nameRules"
                  ></v-text-field>
                </div>
                </v-form>
            </v-card-text>
            <v-toolbar class="text-h5 grey lighten-2 d-flex justify-end" flat dense>
                <v-btn small @click="saveNewName()">{{this.$t('coaches.save')}}</v-btn>
            </v-toolbar>
          </v-card>
        </v-dialog>
      <select-menu
        :dialog="showMenu"
        :options="menu_options"
        @close="showMenu=false"
      />
      <v-dialog
        v-model="deletedialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title class="font-weight-light">
            {{this.$t('coaches.delete_confirm')}}
          </v-card-title>
          <v-card-text>
            <div class="my-5">
              <p class="font-weight-light" style="color:#000;font-size: 17px;">
                 {{this.$t('coaches.delete_doc')}}
              </p>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              color="green"
              text
              @click="deletedialog = false"
            >
              {{this.$t('coaches.no')}}
            </v-btn>
            <v-btn
              color="red"
              text
              @click="confirmDelete()"
            >
              {{this.$t('coaches.yes')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
  </v-layout>
</template>
<script>
import iconHelper from '@/mixins/iconHelper'
import selectMenu from '@/components/clients/documents/selectMenu.vue'
import uploadForm from '@/components/clients/documents/uploadFiles.vue'
import UploadFiles from '../clients/documents/uploadFiles.vue'
import Daily from '../clients/coaching/tracking/daily.vue'
import empty from '@/components/error/empty_data.vue'
import loading from '@/components/loader/default_loader.vue'
export default {
  mixins: [iconHelper],
  props:['files','loaders'],
  components:{
    selectMenu,
    UploadFiles,
    Daily,
    empty,
    loading
  },
  data(vm){
    return {
      showMenu: false,
      dialog:false,
      deleteId:'',
      deletedialog:false,
      dialogdata:[],
      loads:false,
      editindex:[],
      editFile:false,
      newname:'',
      closeOnContentClick: true,
      items: [
         { id:1,title: this.$t('coaches.edit') },
         { id:2, title: this.$t('coaches.delete') },
      ],
      menu_options:{
        x:0,
        y:0,
        in_item_click:true
      },
      nameRules: [
        v => !!v || 'New Name is required',
      ],
    }
  },
  filters: {
      truncate: function (text, length, suffix) {
          if (text.length > length) {
              return text.substring(0, length) + suffix;
          } else {
              return text;
          }
      },
  },
  // mounted(){
  //    this.loads = true;
  // },
  watch: {
      files: function(value) {
       this.loads = true;
      }
  },
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
    ????????return type[0];
     },
    
    selected(e){
        e.target.classList.add("is_active")
    },
    deselect(e){
        e.target.classList.remove("is_active")
    },
    groupAction(id,item,index){
       if(id ==2){
          this.deletedialog = true;
          this.deleteId = item.id;
      }
      else{
 
        this.editindex = item.id;
        this.newname =this.files[index].file_name;
        this.editFile = true;
      }
    },
    saveNewName(){
        if(this.$refs.form.validate() == false){
          return;
        }
     this.$axios
        .post(`documents/renameFile`,{
            id : this.editindex,
            name : this.newname,
            }
        )
        .then(({ data }) => {
           this.$emit('getDocuments')   
           this.editFile = false;
           this.newname='';
            this.successdocumentsNotification("update");

        });
    },
    confirmDelete(){
      this.$emit('deleteDoc', this.deleteId);
      this.deletedialog = false;
    },
    alertme(){
      alert('test');
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
  width: 100%;
  height: 100px;
  object-fit: fill;
}
.mouseOver{
  background-color: #ebebeb;
}
#imgfile{
  width: 100%;
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

#actionGroup{
    float: right;
    position: absolute;
    bottom: 4px;
    right: 0;
}
#v-list-wrapper .v-list-item {
  min-height: 30px !important;
}
</style>
<style >
#v-card-wrapper > div#v-card-text-wrraper *{
  height: 100%;
}

#v-list-wrapper div div.v-list-item__title{
  font-size: 15px !important;
}
</style>
