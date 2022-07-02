<template>
  <v-row justify="center">
    <v-dialog
      v-model="showDialog"
      persistent
      max-width="860px"
    >   
      <v-card>
      <v-toolbar class="text-h5 grey lighten-2 mb-5" flat dense>
        <v-btn small  @click="dialog(false)">back</v-btn>
      </v-toolbar>
        <v-card-text class="pa-0">
          <v-container @dragover.prevent @drop.prevent id="drag_drop">
            <div @drop="dragFile" id="drag_drops" @click="SelecteFile"> 
                <ul class="list">
                   <li class="top:card small:left:card bottom:margin-2" v-for="(item, index) in File" :key="index">
                        <v-card class="card-figure pa-1 text-center">
                          <v-icon class="mx-2" id="check" v-if="value[index] == false">mdi-check-circle</v-icon>
                            <img :src="item.file" v-if="checkFile(item.type) == 'image'">
                            <video id="video-preview" v-if="checkFile(item.type) == 'video'" controls :src="item.file"/>
                            <audio id="audio" controls v-if="checkFile(item.type) == 'audio'">
                              <source :src="item.file" id="src" />
                            </audio>
                            <figcaption class="card-caption" >{{formatBytes(item.size)}} </figcaption>
                              <v-progress-circular id="barprogress" v-if="value[index] == true"
                                indeterminate
                                color="primary" 
                              > {{ progressBar(index) }}</v-progress-circular>
                        </v-card>
                    </li>
                </ul>
                <div id="tips" v-if="File.length==0">
                    <span><strong>Drop Files</strong></span>
                    <span>or click to upload</span>
                </div>
                <input type="file" multiple ref="file_input" class="d-none" accept="image/*, video/*, application/pdf" @change="getFiles">
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { returnStatement } from '@babel/types';

  export default {
    props: {
        showUploadForm:{
            type:Boolean,
        }
    },
    data(){
        return{
            showDialog :false,
            File:[],
            preview:[],
            value: [],
        }
    },
    watch: {
      showUploadForm: function(value) {
        this.showDialog = this.showUploadForm;
        },
        // File: {
        //   handler(value) {
        //     value.forEach((item,index) => {
        //       this.submit(item, index).then(
        //       )
        //     });
        //   }
        // }
        // File: function(value) {
        //   console.log(value);
        // }
    },
    mounted(){
        this.showDialog = this.showUploadForm;
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
            }
        },
        SelecteFile() {
            this.$refs.file_input.click()
        },
        progressBar(index) {
          const thiss = this;
            setTimeout(function(scope) {
               thiss.value.splice(index, 1);
               thiss.value.splice(index, 0, false);
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
                    this.submit(data);
                  };
                  reader.readAsDataURL(input.files[i]);
              }
          }
        },
        submit(value){
          this.$axios
          .post(`documents`,{
              coach_id :  this.$auth.user.id,
              file : value.file,
              file_type : value.type,
              file_size : value.size,
              }
          )
          .then(({ data }) => {
              console.log(data);
          });
        }
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
    object-fit: cover;
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
</style>