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
                        <figure class="card-figure">
                            <img :src="item.image">
                            <!-- <figcaption class="card-caption">{{formatBytes(item.size)}}</figcaption> -->
                            <figcaption class="card-caption">{{item.size}}{{value}}{{index}}</figcaption>
                              <v-progress-circular id="barprogress"
                              :rotate="360"
                              :size="100"
                              :width="15"
                              :value="progressBar(index)"
                              color="teal"
                            >
                              {{ progressBar(item,index) }}
                           
                            </v-progress-circular>
                        </figure>
                    </li>
                </ul>
                <div id="tips" v-if="File.length==0">
                    <span><strong>Drop Files</strong></span>
                    <span>or click to upload</span>
                </div>
                <input type="file" multiple ref="file_input" class="d-none" @change="getFiles">
            </div>
          </v-container>
        </v-card-text>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog(false)"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog(false)"
          >
            Save
          </v-btn> -->
        <!-- </v-card-actions> -->
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
            value: {},
        }
    },
    watch: {
      showUploadForm: function(value) {
        this.showDialog = this.showUploadForm;
        },
      // File: {
      //   handler(value) {
      //     value.forEach((item,index) => {
      //       this.submit(item, index).then()
      //     });
      //   }
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
            this.File = e.dataTransfer.files;
            console.log(this.File);
        },
        SelecteFile() {
            this.$refs.file_input.click()
           
        },
        progressBar(item, index) {
            return this.value[index];
        },  
       formatBytes(bytes, decimals = 2) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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
                  var reader = new FileReader();
                  reader.onload = (e) => {
                    data['image'] = e.target.result,
                    this.File.push(data);
                  };
                  reader.readAsDataURL(input.files[i]);
                //    this.submit(data, i);
            }
          }
        },
        async submit(value,index){
          let formData = new FormData();
          formData.append('file', value.image);
          formData.append('coach_id',this.$auth.user.id);
          const test = await this.$axios
              .post(`documents`,formData,{
                  onUploadProgress: function( progressEvent ) {
                    const total = progressEvent.total;
                    const totalLength = progressEvent.lengthComputable ? total:null;
                    if(totalLength != null){
                      this.value[index] = Math.round( ( progressEvent.loaded * 100 )/ totalLength );
                      this.preview.push(value);
                    }
                  }.bind(this)
              })
        console.log(this.value);
        return test.data;
      }
    }
  }
</script>
<style scoped>
#drag_drop{
    padding: 0;
}
#drag_drop  #drag_drops{
    width: 100%;
    display: flex;
    height: 302px;
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

figure.card-figure{
  position: relative;
}
figure.card-figure img{
    width: 137px;
    height: auto;
    border-radius: 4px;
}
figcaption.card-caption{
    /* position: absolute;
    bottom: 25px;
    right: 25px; */
    color:#000;
    font-size: 20px;
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
  border: solid 1px #000;
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
  color: #fff !important;
}
</style>