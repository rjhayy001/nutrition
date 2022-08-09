<template>
  <v-row justify="center">
    <v-dialog
      v-model="showDialog"
      persistent
      max-width="860px"
    >   
      <v-card>
      <v-toolbar class="text-h5 grey lighten-2 mb-5" flat dense>
        <v-btn small  @click="dialog(false)">{{this.$t('coaches.back')}}</v-btn>
      </v-toolbar>
      <v-card-text class="pa-0">
        <v-container @dragover.prevent @drop.prevent id="drag_drop">
          <div @drop="dragFile" id="drag_drops" @click="SelecteFile"> 
              <ul class="list">
                  <li class="top:card small:left:card bottom:margin-2" v-for="(item, index) in File" :key="index">
                    <v-card class="card-figure pa-1 ">
                        <v-icon class="mx-2" id="check" v-if="value[index] == false">mdi-check-circle</v-icon>
                          <img :src="item.file" v-if="checkFile(item.type) == 'image'">
                          <video id="video-preview" v-else-if="checkFile(item.type) == 'video'" controls :src="item.file"/>
                           <img v-else
                              :src="iconSelector(item)"
                              @contextmenu.stop="show"
                              class="ma-auto file"
                              contain
                              id="imgfile"
                            >
                          <figcaption class="card-caption ml-1" >{{item.name| truncate(9, '...')}}</figcaption>
                          <!-- <figcaption class="card-caption" >{{formatBytes(item.size)}} </figcaption> -->
                            <v-menu
                              top
                              :close-on-content-click="closeOnContentClick"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                 <v-icon  v-bind="attrs"
                                  v-on="on" id="actionGroup">mdi-dots-vertical</v-icon>
                              </template>

                              <v-list id="v-list-wrapper">
                                <v-list-item
                                  v-for="(action, key) in items"
                                  :key="key"
                                  link
                                >
                                  <v-list-item-title @click="groupAction(action.id, index, item)">{{ action.title }}</v-list-item-title>
                                </v-list-item>
                              </v-list>
                            </v-menu>
                            <v-progress-circular id="barprogress" v-if="value[index] == true"
                              indeterminate
                              color="primary" 
                            > {{ progressBar(index) }}</v-progress-circular>
                      </v-card>
                  </li>
              </ul>
              <div id="tips" v-if="File.length==0">
                  <span><strong>{{this.$t('coaches.Dropfiles')}}</strong></span>
                  <span>{{this.$t('coaches.orclick')}}</span>
              </div>
              <input type="file" multiple ref="file_input" class="d-none" accept="image/*, video/*, application/pdf" @change="getFiles">
          </div>
        </v-container>
      </v-card-text>
      <v-toolbar class="text-h5 grey lighten-2 text-end d-flex justify-end" flat dense>
        <v-btn small  @click="submit" :disabled="saveDoc">{{this.$t('coaches.save')}}</v-btn>
      </v-toolbar>
      </v-card>
    </v-dialog>
     <v-dialog width="400" v-model="editFile" persistent>
        <v-card>
          <v-toolbar class="text-h5 grey lighten-2" flat dense>
            <v-btn small @click="editFile=false, newname=''">{{this.$t('coaches.cancel')}}</v-btn>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <span class="subtitle-1  font-weight-normal">Edit name</span>
          </v-toolbar>
          <v-card-text class="pa-4 ">
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
              <v-btn small @click="saveNewName()" >{{this.$t('coaches.save')}}</v-btn>
          </v-toolbar>
          <!-- <v-card-actions class="justify-end">
              <v-btn small @click="save()">Save</v-btn>
          </v-card-actions> -->
        </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { returnStatement } from '@babel/types';
import iconHelper from '@/mixins/iconHelper'

  export default {
   mixins: [iconHelper],

    props: {
        showUploadForm:{
            type:Boolean,
        }
    },
    data(){
        return{
            showDialog :false,
            editFile :false,
            saveDoc:true,
            File:[],
            preview:[],
            value: [],
            newname:'',
            editindex:'',
            fileRequire :['video','image','application'],
            items: [
              { id:1,title: this.$t('coaches.edit') },
              { id:2, title: this.$t('coaches.delete') },
            ],
            closeOnContentClick: true,
            nameRules: [
              v => !!v || 'New Name is required',
            ],
        }
    },
    watch: {
      showUploadForm: function(value) {
        this.showDialog = this.showUploadForm;
        },
    },
    mounted(){
        this.showDialog = this.showUploadForm;
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
    methods: {
        dialog(bool){
            this.showDialog = bool;
            this.$emit('hideForm',bool);
        },
        dragFile(e) {
            var input = e.dataTransfer;
            if (input.files) {
              for(var i=0;i<input.files.length;i++){
                var split = input.files[i]['type'].split("/");
                if(this.fileRequire.includes(split[0])){
                  if(input.files[i]['size'] <=5000000)
                  {
                      var data = {
                        type : input.files[i]['type'],
                        size : input.files[i]['size'],
                        name : input.files[i]['name'],
                      }
                      var val = true;
                    var reader = new FileReader();
                    reader.onload = (e) => {
                      data['image'] = e.target.result,
                      this.value.push(val);
                      this.File.push(data);
                    };
                    reader.readAsDataURL(input.files[i]);
                  }
                  else{
                    this.ErrorFileTooBigNotification(input.files[i]['name'])
                  }
                }
                else{
                  this.ErrorCoachSchedNotification('Unsupported format files, only <strong> Video, application, image </strong> are allowed')
                }
              }
            }
        },
        SelecteFile() {
            this.$refs.file_input.click()
        },
        progressBar(index) {
          this.saveDoc = true;
          const thiss = this;
            setTimeout(function(scope) {
               thiss.value.splice(index, 1);
               thiss.value.splice(index, 0, false);
                thiss.saveDoc = false;
               return;
            },2000, this);
        },
        formatBytes(bytes, decimals = 2) {
              if (bytes === 0) return '0 Bytes';
              const k = 1024;
              const dm = decimals < 0 ? 0 : decimals;
              const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
              const i = Math.floor(Math.log(bytes) / Math.log(k));
              return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        },
        checkFile(file) {
          const type = file.split("/");
            return type[0];
        },
         getFiles(event) {
            var input = event.target;
            if (input.files) {
              for(var i=0;i<input.files.length;i++){
                var split = input.files[i]['type'].split("/");
                if(this.fileRequire.includes(split[0])){
                  if(input.files[i]['size'] <=5000000)
                  {
                    var data = {
                        type : input.files[i]['type'],
                        size : input.files[i]['size'],
                        name : input.files[i]['name'],
                      }
                    var val = true;
                    var reader = new FileReader();
                    reader.onload = (e) => {
                      data['file'] = e.target.result,
                      this.value.push(val);
                      this.File.push(data);
                      // this.submit(data);
                    };
                    reader.readAsDataURL(input.files[i]);
                  }
                  else{
                    this.ErrorFileTooBigNotification(input.files[i]['name'])
                  }
                }
                else{
                  this.ErrorCoachSchedNotification('Unsupported format files, only <strong> Video, application, image </strong> are allowed')
                }
              }
          }
        },
        submit(){
          var ctr = 0;
          this.File.forEach((value, index) => {
            this.$axios
              .post(`documents`,{
                  coach_id :  this.$auth.user.id,
                  file : value.file,
                  file_type : value.type,
                  file_size : value.size,
                  file_name : value.name,
                  }
              )
              .then(({ data }) => {

                  ctr++;
                  if(ctr==this.File.length){
                    this.showDialog = false;
                    this.$emit('hideForm',false);
                    this.File =[];
                    this.successdocumentsNotification("added");
                  }               
              });
          });
        },
        groupAction(id,index, item){
          if(id ==2){
            this.File.splice(index, 1);
          }
          else{
            this.editindex = index;
            this.editFile = true;
            this.newname = item.name;
          }
        },
        saveNewName(){
          if(this.$refs.form.validate() == false){
            return;
          }
          var data = {
              type : this.File[this.editindex]['type'],
              size : this.File[this.editindex]['size'],
              name : this.newname,
              file : this.File[this.editindex]['file'],
           }
          this.successdocumentsNotification("update");
          this.File[this.editindex] =data ;
          this.editFile = false;
          this.newname = '';
        },
        iconSelector(item){
     
          const getype = item.type.split("/");
          console.log(this.types);
          // let srcIcon = this.types.find(type => type.type == item.type)
          let srcIcon = this.types.find(type => type.type == getype[1])
          if(item.type =='image'){
            return item.data
          }
          return srcIcon ? srcIcon.icon : this.unverifyIcon
        },
        
    }
  }
</script>
<style scoped>
#drag_drop{
    padding: 0;
    overflow: auto;
}
#drag_drop  #drag_drops{
    width: 100%;
    display: flex;
    height: 450px;
}
#drag_drop #drag_drops div{
    margin: auto;
}
#drag_drop #drag_drops span strong{
    font-size: 63px !important;
}
#tips{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 17px;
}
#tips span:last-child{ 
    font-size: 24px;
    font-weight: 500;
}

.card-figure{
  position: relative;
}
.card-figure img{
     width: 120px;
    height: 100px;
    border-radius: 4px;
    object-fit: contain;
}
figcaption.card-caption{
    /* position: absolute;
    bottom: 25px;
    right: 25px; */
    color:#000;
    font-size: 15px;
}
ul.list{
  list-style: none;
  display: flex;
  gap:10px;
  flex-wrap: wrap;
  padding-left: 19px !important;
}
ul.list li{
  height: fit-content !important;
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
#video-preview{
  width: 120px;
  height: 100px;
  object-fit: fill;
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