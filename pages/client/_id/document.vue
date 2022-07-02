<template>
 <v-container grid-list-md class="main-container" >
    <v-layout row wrap>
      <v-flex xs12 class="pb-5">
        <!-- <div class="toolbar-container">
          <v-toolbar  dense >
            <v-toolbar-title class="title-header">Documents</v-toolbar-title>
          </v-toolbar>
        </div> -->
         <div class="d-flex align-center py-2 data-table-cus">
          <p class="title mr-1">
            Documents
          </p>
          <v-spacer></v-spacer>
        </div>
        <hr />
      </v-flex>
    </v-layout>

    <v-layout d-flex id="drag_container" >
      <div class="_container"  id="dragover" >
         <v-card color="grey lighten-4" flat tile >
            <v-toolbar dense id="header_toolbar">
              <v-toolbar-title>Shared resources</v-toolbar-title>
              <v-spacer></v-spacer>
                <div style="width: 180px;">
              <v-text-field
                clearable
                filled
                rounded
                hide-details=""
                placeholder="Search"
                dense
                v-model="shrdr.search1"
                append-icon="mdi-magnify"
                @input="searchList('sharedfield')"
              ></v-text-field>
             </div>
             <div style="width: 150px;" id="types">
                <v-select
                  clearable
                  rounded
                  :items="type"
                  label="type"
                  dense
                  outlined
                  v-model="shrdr.shared_rtype"
                  @change="searchList('sharedfield')"
                ></v-select>
             </div>
            </v-toolbar>
        </v-card>
        <v-card tile style="border-top: solid 1px #d8cfcf; height: 100%;position:relative">
          <div v-if="startdrag" id="overlay" @dragenter.prevent="DragActive" @dragleave.prevent="deleteDragActive" @dragover.prevent @drop="onDrop" ></div>
          <div id="item-drag-wrapper"  :class="dragactive?'drag-active':''"> 
              <ul class="list" v-if="sharedFiles">
                    <li class="top:card small:left:card bottom:margin-2" v-for="(item, index) in sharedFiles" :key="index">
                      <figure class="card-figure" >
                          <img :src="imageUrl2('documents/coach', $auth.user.id, item.documents.file_name)" v-if="checkFile(item.documents.file_type) == 'image'" draggable="false">
                          <a target="_blank" v-else-if="checkFile(item.documents.file_type)  == 'link'" :href="item.documents.file_name" draggable="false">
                              <img  :src="iconSelector(item.documents)" @contextmenu.stop="show" class="ma-auto file" contain id="imgfile" draggable="false">
                          </a> 
                          <video draggable="false" id="video-preview" v-else-if="checkFile(item.documents.file_type) == 'video'" controls :src="imageUrl2('documents/coach', $auth.user.id, item.documents.file_name)"/>
                          <img draggable="false" v-else :src="iconSelector(item.documents)" @contextmenu.stop="show" class="ma-auto file" contain id="imgfile">
                          
                          <figcaption class="card-caption" >{{item.documents.file_name}}</figcaption>

                          <v-icon id="deleteShare" @click="deleteShare(item.documents.id)">mdi-delete</v-icon>
                      </figure>
                    </li>
              </ul>
        
            <v-progress-circular v-if="showloader" :size="100" color="primary" indeterminate id="loader"></v-progress-circular>
          </div>
        </v-card>
      </div>
      <div class="_container">
          <v-card color="grey lighten-4" flat tile >
            <v-toolbar dense id="header_toolbar">
              <v-toolbar-title>All resources</v-toolbar-title>
              <v-spacer></v-spacer>
                <div style="width: 150px;">
              <v-text-field
                clearable
                filled
                rounded
                hide-details=""
                placeholder="Search"
                dense
                v-model="allr.search2"
                @input="searchList('allrfield')"
                append-icon="mdi-magnify"
              ></v-text-field>
             </div>
             <div style="width: 150px;" id="types">
                <v-select
                  ref="searchAllfr"
                  clearable
                  rounded
                  :items="type"
                  label="type"
                  dense
                  v-model="allr.all_rtype"
                  outlined
                  @change="searchList('allrfield')"
                ></v-select>
             </div>
             <!-- <div style="width: 150px;" id="types">
                <v-select
                  clearable
                  rounded
                  :items="is_shared"
                  item-text="status"
                  item-value="id"
                  label="status"
                  dense
                  v-model="allr.all_rtype"
                  outlined
                ></v-select>
             </div> -->
            </v-toolbar>
        </v-card>
        <v-card tile style="border-top: solid 1px #d8cfcf; height: 100%;" >
            <div id="item-drag-wrapper">
              <ul class="list">
               <li class="top:card small:left:card bottom:margin-2" v-for="(item, index) in files" :key="index">
                    <figure class="card-figure" @click="showdialog(true, item)">
                        <v-tooltip left v-if="item.share_documents.length">
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon  id="isHared" color="green" v-on="on" v-bind="attrs">mdi-check-circle</v-icon>
                          </template>
                          <span>Shared</span>
                        </v-tooltip>
                        <img :src="imageUrl2('documents/coach', $auth.user.id, item.file_name)" v-if="checkFile(item.file_type) == 'image'" :draggable="item.share_documents.length== 0? true:false" @dragstart="onDragStart()" @dragend="onDragEnd(item.id)">
                        <video id="video-preview" :draggable="item.share_documents.length== 0? true:false"  @dragstart="onDragStart()" @dragend="onDragEnd(item.id)" v-else-if="checkFile(item.file_type) == 'video'" controls :src="imageUrl2('documents/coach', $auth.user.id, item.file_name)"/>
                        <a target="_blank" v-else-if="checkFile(item.file_type)  == 'link'" :href="item.file_name"  :draggable="item.share_documents.length== 0? true:false">
                          <img  :src="iconSelector(item)" @contextmenu.stop="show" class="ma-auto file" contain id="imgfile" :draggable="item.share_documents.length== 0? true:false" @dragstart="onDragStart()" @dragend="onDragEnd(item.id)">
                        </a> 
                        <img v-else :src="iconSelector(item)" @contextmenu.stop="show" class="ma-auto file" contain id="imgfile" :draggable="item.share_documents.length== 0? true:false" @dragstart="onDragStart()" @dragend="onDragEnd(item.id)">
                       <figcaption class="card-caption" >{{item.file_name}}</figcaption>
                    </figure>
                </li>
            </ul>
            </div>
        </v-card>
      </div>
      <v-dialog v-model="deletedialog" max-width="500px">
        <v-card>
          <v-card-title class="font-weight-light">
            Delete Confirmation
          </v-card-title>
          <v-card-text>
            <div class="my-5">
              <p class="font-weight-light" style="color:#000;font-size: 17px;">
                Are you sure to delete this shared documents?
              </p>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              color="green"
              text
              @click="deletedialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="red"
              text
              @click="confirmDelete()"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
    </v-layout>
       <v-row justify="center" v-if ="dialogdata.length > 0">
      <v-dialog v-model="dialog" persistent :max-width="checkFile(dialogdata[0].file_type) == 'application'?1300:800">   
          <v-card  :height="checkFile(dialogdata[0].file_type) == 'application'?1000:''" :id="checkFile(dialogdata[0].file_type) == 'application'?'v-card-wrapper':''">
            <v-toolbar class="text-h5 grey lighten-2 " flat dense d-flex>
                 <v-btn small  @click="dialog=false, dialogdata=[]">back</v-btn>
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
                 <iframe :src="imageUrl2('documents/coach', $auth.user.id, dialogdata[0].file_name)"  v-if="checkFile(dialogdata[0].file_type) == 'application'"  width="500" height="500" />
                </div>
              </v-container>
            </v-card-text>

          </v-card>
        </v-dialog>
    </v-row>
   </v-container>
</template>
<script>

import iconHelper from '@/mixins/iconHelper'

export default {
  mixins: [iconHelper],
  data(vm){
    return {
      showMenu: false,
      dragIndex: '',
      showloader:false,
      files:[],
      sharedFiles:[],
      drag:false,
      active:false,
      default_view:false,
      dragactive:false,
      startdrag:false,
      deletedialog: false,
      dialog:false,
      dialogdata:[],
      todeleteid:'',
      shrdr:{
        shared_rtype:'',
        search1:'',
      },
      allr:{
        all_rtype:'',
        search2:'',
      },
      type: ['image', 'video', 'link', 'application'],
      is_shared: [
        {id:'1',status:'shared'},
        {id:'0',status:'not shared'},
      ],
    }
  },
  mounted(){
    this.getDocuments();
    this.getSharedDocuments();
  },
  methods: {
     iconSelector(item){
      const getype = item.file_type.split("/");
      let srcIcon = this.types.find(type => type.type == getype[1])
      if(item.type =='image'){
        return item.data
      }
      return srcIcon ? srcIcon.icon : this.unverifyIcon
    },
    checkFile(file) {
      const type = file.split("/");
        return type[0];
     },
    getDocuments () {
    this.$axios
      .get(`documents/getClientDocument/`+this.$auth.user.id+'?client_id='+`${this.$route.params.id}`
      )
      .then(({ data }) => {
        this.files =data;
      });
    },
    
    getSharedDocuments () {
    this.$axios
      .get(`documents/getSharedDocuments/`+`${this.$route.params.id}`+'?coach_id='+this.$auth.user.id
        )
      .then(({ data }) => {
        console.log(data);
        this.sharedFiles = data;
         this.showloader = false;
      });
    },

    onDragEnd(id){
     this.dragIndex = id;
     this.startdrag = false;
    },
    onDragStart(event){
     this.drag = true;
     this.startdrag = true;
    },
     onDrop(e){
      this.drag = false;
      this.showloader = true;
      const thiss = this;
      setTimeout(function(scope) {
        return thiss.submitShareDoc(thiss.dragIndex);
      },500, this);
      this.dragactive = false;
      this.startdrag = false;
    },
    submitShareDoc(id){
      this.$axios
      .post(`documents/shareDocuments/`,{
          id_document : id,
          client_id : `${this.$route.params.id}`,
        }
      )
      .then(({ data }) => {
        this.showloader = false;
        this.getSharedDocuments();
        if(this.allr.search2 !=null || this.allr.all_rtype !=null){
          this.searchList('allrfield')
        }
        else{
          this.getDocuments();
        }
      });
    },
    deleteShare(id){
     this.todeleteid = id;
     this.deletedialog = true;
    },
    confirmDelete(){
      this.showloader = true;
      this.deletedialog = false;
      this.$axios
      .delete(`documents/deleteshareDocuments/`+this.todeleteid
      )
      .then(({ data }) => {
        this.todeleteid ='';
        this.getSharedDocuments();
        if(this.allr.search2 !=null || this.allr.all_rtype !=null){
          this.searchList('allrfield')
        }
        else{
          this.getDocuments();
        }
      });
    },
    DragActive(){
     this.dragactive = true;
    },
    deleteDragActive(){
       this.dragactive = false;
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
    },
    searchList(string){
       if(string =='allrfield'){
          if(this.allr.search2 ==null && this.allr.all_rtype ==null){
              this.getDocuments();
              return;
          }
          this.$axios
            .post(`documents/searchFilter/`,{
                search : this.allr.search2,
                type : this.allr.all_rtype,
                client_id:`${this.$route.params.id}`,
                coach_id:this.$auth.user.id,
              }
            )
            .then(({ data }) => {
              this.files =data;
            });
       }
       else{
         if(this.shrdr.search1 ==null && this.shrdr.shared_rtype ==null){
              this.getSharedDocuments();
              return;
          }
          this.$axios
            .post(`documents/searchSharedFilter/`,{
                search : this.shrdr.search1,
                type : this.shrdr.shared_rtype,
                id_client : `${this.$route.params.id}`
              }
            )
          .then(({ data }) => {
            this.sharedFiles =data;
          });
       }
    }
  }
}
</script>
<style scoped>
.drag-active{
  background-color: #e6e6e6;
}

._container{
  width: 100%;
    height: 600px;
}
._container div#item-drag-wrapper{
  height: 100%;
  padding: 10px;
  overflow: auto;
  position: relative;
  
}
._container div#item-drag-wrapper:first-of-type{
  display: flex !important;
}
#drag_container{
 gap: 4%;
 padding:5px;
}
figure.card-figure{
  position: relative;
  width: 120px !important;
}
figure.card-figure:hover button#deleteShare{
  display: block;

}
figure.card-figure img{
    width: 120px;
    height: 100px;
    border-radius: 4px;
    object-fit: contain;
}
figcaption.card-caption{
    color:#000;
    font-size: 15px;
}
ul.list{
  list-style: none;
  display: flex;
  gap:4px;
  flex-wrap: wrap;
  height:fit-content !important;
  padding-left: 0 !important;
}
ul.list li{
  height: fit-content !important;
  border: solid 1px #d8cfcf;
  border-radius: 5px;
  padding: 2px;
}

#barprogress{
  height: 50px !important;
  width: 50px !important;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
  top: 0;
}
#check{
    position: absolute;
    margin: 0 !important;
    top: 0;
    right: 0;
    font-size: 34px;
    color: #27ea27;
    transition: 2s;
}
.v-dialog .v-card{
    padding-bottom: 15px !important;
}
#video-preview{
  width: 120px;
  height: 100px;
  object-fit: fill;
}
#loader{
  height: 100px;
  width: 100px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
#deleteShare{
  position: absolute;
  top: 0;
  right: 0;
  display: none;
  cursor: pointer;
  /* transition: .5s; */
}
#deleteShare:hover{
color:var(--blue);
}
#header_toolbar{
  height: unset !important;
  padding: 8px !important;
}
#types{
  position: relative;
  top: 12px;
  margin-left: 8px;
}
.mouseOver{
  background-color: #ececec !important;
}
.card-caption{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#overlay{
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 9999999;
}
#isHared{
  font-size: 20px;
  position: absolute;
  top: -7px;
  right: -8px;
  margin: 0;
}

</style>
<style scoped>
.file-name{
  white-space: nowrap;
  overflow: hidden;
  margin-top: 5px;
  text-overflow: ellipsis;
  width: 220px;

}

#cont-wrapper *{
    width: 100%;
    height: 100%;
    object-fit: fill;
}
</style>
<style >
#v-card-wrapper > div#v-card-text-wrraper *{
  height: 100%;
}
</style>
