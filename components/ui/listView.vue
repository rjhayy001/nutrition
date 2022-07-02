<template>
  <div>
    <div class="test">
      <v-data-table
        scrollable
        :headers="headers"
        :items="files"
        width="500"
        @click:row="showdialog"
        :calculate-widths="true"
        class="elevation-1">
  

        <template v-slot:item.id="{ item }">
            <template  style="padding:10px;">
                <img v-if="checkFile(item.file_type)  == 'image'"
                :src="imageUrl2('documents/coach', $auth.user.id, item.file_name)"
                class="ma-auto file mt-2"
                id="imgfile"
              >
              <video id="video-preview" class="mt-2" v-else-if="checkFile(item.file_type) == 'video'" controls :src="imageUrl2('documents/coach', $auth.user.id, item.file_name)"/>
              <a target="_blank" v-else-if="checkFile(item.file_type)  == 'link'" :href="item.file_name">
                <img 
                  :src="iconSelector(item)"

                  class="ma-auto file  mt-2"
                  contain
                  id="imgfile"
                >
              </a>
                <img v-else
                :src="iconSelector(item)"
                class="ma-auto file  mt-2"
                contain
                id="imgfile">
            </template>
          </template>
          <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon class="ml-2" @click="deleteList(item.id)" v-on="on"
                    >mdi-trash-can
                  </v-icon>
                </template>
                <span >Delete</span>
              </v-tooltip>
          </template>
          <template v-slot:item.file_name="{ item }">
              <div class="file-name">{{item.file_name}}</div>
          </template>

      </v-data-table>
    </div>
    <v-dialog
      v-model="deletedialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title class="font-weight-light">
          Delete Confirmation
        </v-card-title>
        <v-card-text>
          <div class="my-5">
            <p class="font-weight-light" style="color:#000;font-size: 17px;">
              Are you sure to delete this documents?
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
                 <!-- <embed src="http://localhost:9292/documents/coach/1/1_84.pdf" width="100%" height="100%"> -->

                 <iframe :src="imageUrl2('documents/coach', $auth.user.id, dialogdata[0].file_name)"  v-if="checkFile(dialogdata[0].file_type) == 'application'"  width="500" height="500" />
                </div>
              </v-container>
            </v-card-text>

          </v-card>
        </v-dialog>
    </v-row>
     
 
  </div>
</template>


<script>
import iconHelper from '@/mixins/iconHelper'

  export default {
   mixins: [iconHelper],
   props:['files'],
   data(vm){
      return {
         showAction: '',
         deletedialog: false,
         dialog:false,
         dialogdata:[],
         headers: [
        {
          text: "File",
          align: "start",
          sortable: false,
          value: "id",
        },
        {
          text: "File Name",
          align: "start",
          sortable: false,
          value: "file_name",
        },
        {
          text: "File type",
          align: "start",
          sortable: false,
          value: "file_type",
        },
        {
          text: "File size",
          align: "start",
          sortable: false,
          value: "size",
        },
        {
          text: "Actions",
          align: "center",
          sortable: false,
          value: "actions",
          width: "8%"
        },
      ],
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
        return type[0];
     },
    
    selected(e){
        e.target.classList.add("is_active")
    },
    deselect(e){
        e.target.classList.remove("is_active")
    },
    showActions(id){
      this.showAction = id;
    },
    deleteList(id){
      this.deletedialog = true;
    },
    confirmDelete(){
      this.deletedialog = true;

      this.$axios
      .delete(`documents/`+this.showAction
      )
      .then(({ data }) => {
         this.$emit('showDocument');
         this.deletedialog = false;
      });
    },
    showdialog(item){
      const thiss = this;
      if(item.file_type !='link/url'){
          this.dialogdata.push(item);
          setTimeout(function(scope) {
            thiss.dialog = true;
          },500, this);
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
  width: 220px;

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
  width: 80px;
  height: 70px;
  object-fit: fill;
}
.mouseOver{
  background-color: #ebebeb;
}
#imgfile{
  width: 80px;
  height: 70px;
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
   width: 100% !important;
}

</style>
<style >
#v-card-wrapper > div#v-card-text-wrraper *{
  height: 100%;
}
</style>
