<template>
  <v-container grid-list-md>
    <v-layout row wrap v-if="loads == true">
      <v-flex xs12 class="pb-0">
        <div class="toolbar-container">
          <v-toolbar flat dense color="#f5f5f5" id="header_toolbar">
            <v-toolbar-title class="title-header">@ {{client_name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-icon class="mx-2">mdi-magnify</v-icon> -->
            <!-- <v-icon class="mx-2">mdi-phone-outline</v-icon>
            <v-icon class="mx-2">mdi-video-outline</v-icon> -->
            <div style="width: 300px;">
                <v-text-field
                clearable
                filled
                rounded
                hide-details=""
                placeholder="Search"
                dense
                v-model="f.msg"
                @input="searchMessage"
                append-icon="mdi-magnify"
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
                  v-model="f.type"
                  @change="searchMessage"
                ></v-select>
            </div>

            <pinned-messages @getPinnedMessage="getPinnedMessage" :pinned="pinMessages"/>
          </v-toolbar>
        </div>
      </v-flex>

      <v-flex xs12>
        <div class="scrollable-element" id="scrollable-element" ref="chat" v-if="chatList!=''">
          <!-- <div v-for="item in chatList"  :key="item.id"> -->
          <div v-for="(item, index) in chatList" :key="item.id">
            <div class="date-divider ">
              <p class="px-2">{{ChangeDateformat(index)}}</p>
            </div>
            <v-list-item id="datalist" v-for="(listChat, key) in item" :key="listChat.id">
              <v-list-item-avatar size="30">
                <v-img v-if="listChat.logo != ''" :src="listChat.logo?listChat.logo:default_profile" ></v-img>
                <v-img v-else  src='https://cdn.vuetifyjs.com/images/lists/1.jpg' ></v-img>
                <!-- <v-img :src="'https://cdn.vuetifyjs.com/images/lists/1.jpg'" ></v-img> -->
              </v-list-item-avatar>
              <v-list-item-content  @mouseenter="hoverInd = key" @mouseleave="hoverInd = null">
                <v-list-item-title class="subtitle-2">{{listChat.fullname}}</v-list-item-title>
                <v-list-item-subtitle v-if="listChat.type == 'text'" class="pt-1" style="font-size:13px;">
                 {{listChat.message}}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else class="pt-1" style="font-size:13px;">
                <div class="imagemesssage">
                  <div v-for="(image, key) in decodeMessage(listChat.message)" :key="image.id" id="file-holder">
                      <img :src="image.file" style="height:auto; width:120px; margin:auto;" v-if="checkFile(image.file) == 'data:image'"/>
                      <video id="video-preview" v-else-if="checkFile(image.file) == 'data:video'" controls :src="image.file" style="height:auto; width:150px;"/>
                      <v-img v-else
                        :src="iconSelector(image.file)" contain id="imgfile"
                        style="height:auto; width:120px;"
                      >
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                              <a :href="image.file" download v-bind="attrs" @click.stop
                              v-on="on">
                                <v-icon class="mx-2" style="width:100%">
                                mdi-download
                                </v-icon>
                              </a>
                          </template>
                          <span>Download</span>
                        </v-tooltip>
                       </v-img>
                       <p v-if="image.file.length > 0 && checkFile(image.file) =='data:application'" class="text-center mt-1">{{image.file_name}}</p>
                  </div>
                </div>
                </v-list-item-subtitle>

              </v-list-item-content>
                <v-card ref="cardShowMore"
                  class="mx-auto moreCard"
                  tile v-if="is_pinned == key" >
                  <v-list >
                    <v-list-item-group
                      color="primary" class="d-flex flex-column"
                    >
                      <v-list-item >
                       <p id="pinMessage" class="d-flex justify-space-between" @click = "pinMessage(listChat)" style="width:100%;">Pin Message<v-icon class="ml-2">mdi-pin</v-icon></p>
                      </v-list-item>
                      <v-list-item v-if="listChat.sender_type == 'coach'">
                      <p id="pinMessage" class="d-flex justify-space-between" @click = "deleteMessage(listChat)" style="width:100%;">Delete Message<v-icon class="ml-2">mdi-delete</v-icon></p>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
                  <v-tooltip left >
                    <template v-slot:activator="{ on, attrs }" >
                      <button @click.stop = "showMore(key)" v-on="on" rel="1" class="morebtn" > <v-icon class="mr-1">mdi-dots-horizontal</v-icon></button>
                    </template>
                    <span>More</span>
                  </v-tooltip>
            </v-list-item>

          </div>

        </div>
        <div class="scrollable-element" id="scrollable-element" ref="chat" v-else>
            <empty></empty>
        </div>
        <div class="text-field-container">
          <div v-if="image_selecteds.length > 0">
            <div class="d-flex flex-row g-10" id="img-wrapper">
              <div id="img-holder"  class="d-flex flex-column"  v-for="(selectedFile, index) in image_selecteds" :key="selectedFile.id">
                  <v-icon id="deleteImg" @click="removeSelectedImg(selectedFile, index)">mdi-delete</v-icon>
                  <img :src="selectedFile.file" v-if="checkFile(selectedFile.file) == 'data:image'"/>
                  <video id="video-preview" v-else-if="checkFile(selectedFile.file) == 'data:video'" controls :src="selectedFile.file" style="height:120px; width:120px;"/>
                  <v-img v-else
                    :src="iconSelector(selectedFile.file)" contain id="imgfile"
                    style="height:100px; width:100px;"
                  >
                  </v-img>
                  <span>{{selectedFile.name | truncate(13, '')}}</span>
              </div>
            </div>
          </div>
          <v-text-field
            filled
            placeholder="Message @test"
            rounded
            dense
            hide-details="auto"
            v-model="message"
          >
            <template v-slot:prepend-inner>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon class="mr-1" v-bind="attrs" v-on="on"  @click="handleFileImport">mdi-upload</v-icon>
                </template>
                <span>Upload</span>
              </v-tooltip>
              <input accept="image/png, image/gif, image/jpeg, video/*, application/pdf"
                    ref="uploader"
                    type="file"
                    @change="onFileChange"
                    class="d-none"
                    multiple
              />
                <user-photos @confirm="confirmPhotos"  :sdata="sdata"></user-photos>

              <v-divider vertical class="mx-2"></v-divider>
            </template>
            <template v-slot:append>
              <v-icon color="#7c94de" @click="sendMessage">mdi-send</v-icon>
            </template>
          </v-text-field>
        </div>
      </v-flex>

      <v-flex xs2 class="pt-0">
        <!-- <coach></coach> -->
      </v-flex>
      <div class="text-center">
      </div>
      <confirm-photos
        :dialog="confirm_photos_dialog"
        @close="confirm_photos_dialog=false"
        :photos="tobe_sent_photos"
        @send="send"
      ></confirm-photos>
       <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    </v-layout>
    <v-layout v-else>
      <loading/>
    </v-layout>


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
              Are you sure to delete this chat?
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
              @click="deleteChat()"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
  import userPhotos from '@/components/clients/chats/userPhotos.vue'
  import confirmPhotos from '@/components/clients/chats/confirmPhotos.vue'
  import coach from '@/components/clients/chats/coach.vue'
  import pinnedMessages from '@/components/clients/chats/pinnedMessages.vue'
  import default_profile from "@/static/images/empty_person.png";
  import iconHelper from '@/mixins/iconHelper'
  import empty from '@/components/error/empty_data.vue'
  import loading from '@/components/loader/default_loader.vue'

  import moment from 'moment'
  export default {
    mixins: [iconHelper],
    components: {
      coach,
      empty,
      pinnedMessages,
      userPhotos,
      confirmPhotos,
      loading
    },
    data(){
      return {
        tobe_sent_photos: [],
        confirm_photos_dialog: false,
        message :'',
        showMoreCard :false,
        is_pinned : null,
        chatList : [],
        snackbar: false,
        deletedialog: false,
        text: '',
        loads:false,
        timeout: 2000,
        pinMessages: [],
        default_profile,
        client_name :'',
        msg :'',
        image_selected : {
          name:'',
          file:'',
        },
        f : {
          type:'',
          msg:'',
        },
        type: ['all','text', 'files',],
        image_selecteds : [],
        rules: [
          value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
        ],
        sdata:[],
        ddata:'',
        hoverInd :'',
      }
    },
    created(){
    },
    mounted(){
      const thiss = this;
      window.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
          thiss.sendMessage();
        }
        if (event.keyCode === 27) {
           thiss.is_pinned = null;
        }
      });
      window.addEventListener('click', function(event) {
           thiss.is_pinned = null;
      });
      this.activateNotification()
      this.getChats();
      this.getPinnedMessage();
    },

    watch: {
        chatList: function(value) {
          this.scrollInto();
        }
    },
    methods:{
      initialize(){
        console.log(this.$route.params.id)
        this.getChats()
      },
      changeS(key){
        setTimeout(function(scope) {
        document.getElementById("chats"+key).focus();
        }, 200, this);
      },
      scrollInto(){
        setTimeout(function() {
         if(document.getElementById("scrollable-element")){
            var objDiv = document.getElementById("scrollable-element");
            objDiv.scrollTop = objDiv.scrollHeight;
          }
        }, 500, this);
        // var intVal = setInterval(function() {
        //   if(document.getElementById("scrollable-element")){
        //     var objDiv = document.getElementById("scrollable-element");
        //     objDiv.scrollTop = objDiv.scrollHeight + 20;
        //     clearInterval(intVal);
        //   }
        // }, 500);
      },
      send(data){
        this.$axios
          .post(`chat/addChatDocuments/`,{
              client_id : `${this.$route.params.id}`,
              message : data,
              sender_id : this.$auth.user.id,
              sender_type : 'coach',
              selected : 'coach',
              type : 'files'
              }
          )
          .then(({ data }) => {

            this.sdata = data;
            this.getPinnedMessage();
            this.message ='';
            this.getChats();
            this.confirm_photos_dialog = false;
          });
      },
      confirmPhotos(photos){
        this.tobe_sent_photos = photos
        this.$nextTick(() => {
          this.confirm_photos_dialog = true
        })
      },
      showMore(id){
        if(this.is_pinned == id){
          this.is_pinned = null;
        }
        else{
          this.is_pinned = id;
        }
      },

      sendMessage(){
        if(this.message !=''){
          this.$axios
          .post(`chat/addChat/`,{
              client_id : `${this.$route.params.id}`,
              message : this.message,
              sender_id : this.$auth.user.id,
              sender_type : 'coach',
              selected : 'coach',
              type : 'text'
              }
          )
          .then(({ data }) => {

            this.message ='';
            this.getPinnedMessage();
            this.getChats();
            this.image_selecteds = [];
          });
        }
        if(this.image_selecteds.length > 0 ){
          this.$axios
          .post(`chat/addChat/`,{
              client_id : `${this.$route.params.id}`,
              message : this.image_selecteds,
              sender_id : this.$auth.user.id,
              sender_type : 'coach',
              selected : 'coach',
              type : 'files'
              }
          )
          .then(({ data }) => {
            // this.chatList = data.data;
            this.getPinnedMessage();
            this.message ='';
            this.getChats();
            this.image_selecteds = [];
          });
        }
      },
      pinMessage(item){
        const thiss = this;
        this.$axios
        .put(`chat/pinMessage/`+item.id+'?to=1'
         )
        .then(({ data }) => {
          thiss.is_pinned = null;
          thiss.getPinnedMessage();
          this.chatNotification('pinned', 'Chat')
        });
      },
      deleteMessage(item){
        this.deletedialog = true;
        this.ddata = item;
      },
      deleteChat(){
        const thiss = this;
        this.$axios
        .delete(`chat/deleteMessage/`+this.ddata.id
         )
        .then(({ data }) => {
          thiss.is_pinned = null;
          thiss.getChats();
          thiss.getPinnedMessage();
          this.chatNotification('deleted','Chat')
          this.deletedialog = false;
        });
      },
      getChats(){
        this.$axios
        .get(`chat/getChat/`+`${this.$route.params.id}`
         )
        .then(({ data }) => {

          this.chatList = data.data;
          this.client_name = data.name;
          this.loads = true;
        });
      },
      checkFile(base64Data){
        var type = base64Data.split(';')[0].split('/');
        return type[0];
      },
      iconSelector(item){
        var gettype = item.split(';')[0].split('/');

        let srcIcon = this.types.find(type => type.type == gettype[1])
        if(item.type =='image'){
          return item.data
        }
        return srcIcon ? srcIcon.icon : this.unverifyIcon
      },
      ChangeDateformat(date){
       var currentDate = new Date();

       var formatted_date = new Date().toJSON().slice(0,10).replace(/-/g,'-');

        if(date == formatted_date){
            return 'Today';
        }
        else{
            return moment(date).format('MMM DD YYYY');
        }
      },
      getPinnedMessage(){
      const thiss = this;
        this.$axios
        .get(`chat/getPinnedMessage/?client_id=`+`${this.$route.params.id}`
         )
        .then(({ data }) => {
          this.pinMessages = data;
        });
      },
      handleFileImport() {
        window.addEventListener("focus", () => {}, { once: true });
        this.$refs.uploader.click();
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;

        for(var i=0;i<files.length;i++){
          this.createImg(files[i],i);

        }
      },
      createImg(file,index) {
        var image = new Image();
        var reader = new FileReader();
        reader.onload = (e) => {
          var image = e.target.result;
          this.image_selected ={
            name:file['name'],
            file: image
          }
           this.image_selecteds.push(this.image_selected);
          // this.image_selected[index] =image;
        };
        reader.readAsDataURL(file);
      },
      removeSelectedImg(item , index) {
        this.image_selecteds.splice(index, 1);
      },
      decodeMessage(message) {
       return JSON.parse(message);
      },
      scrollIntoView() {
        var container = document.querySelector("#scrollable-element");
        var scrollHeight = container.scrollHeight
        container.scrollTop  = scrollHeight;
        // alert(scrollHeight);
        // alert(container.scrollTop);
        container.scrollTo({ top:container.scrollHeight, behavior: 'smooth'});
      },
      searchMessage(){
        if(this.f.msg == '' && (this.f.type =='' || this.f.type =='all')){
          this.getChats();
          return;
        }
        this.$axios
        .post(`chat/searchChat`,{
            types : this.f,
            client_id : +`${this.$route.params.id}`,
            }
        )
        .then(({ data }) => {
          this.chatList = data.data;
        });
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
    }
  }

</script>
<style>
#file-holder{
  display: flex;
  flex-direction: column;
}
#file-holder div#imgfile div.v-responsive__content a{
  display: flex !important;
  height:100%;
  width: 100%;
  text-decoration: none;
}
#file-holder div#imgfile div.v-responsive__content a:hover{
  transform:scale(1.2)
}
</style>
<style scoped>
.scrollable-element {
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: auto;
    height:76vh;
    scroll-behavior: smooth;
    border-bottom: #dfdfdf;
}

.scrollable-element::-webkit-scrollbar {
  background-color: #dfdfdf;
  width: 8px;
  border-radius: 50px;
}

.scrollable-element::-webkit-scrollbar-thumb {
  background-color: #858383;
  border-radius: 50px;
}

.text-field-container {
  position: sticky;
    bottom: 20px;
}
.date-divider {
  position: relative !important;
  text-align: center;
  z-index: 5;
}
.date-divider p {
    width: fit-content;
    margin: 0 auto;
    background: white !important;
    font-size: 13px !important;
    font-weight: 200;
}
.date-divider::before {
  z-index: -1;
  position: absolute;
  content: '';
  width: 100%;
  height: 1px;
  background: #d9d9d9;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.toolbar-container {
  position: sticky;
  top: 76px;
  background:white;

}

.title-header{
  font-weight: 500;
  font-size: 17px;
}
#ShowMore{
    position: absolute;
    right: 16px;
    border:none;
    background-color: transparent;
    top: 3px;
    display: none;
}
#datalist:hover #ShowMore{
  display: block;
}
#datalist:hover {
    background-color: #f1f1f3;
}
.moreCard{
  position: absolute;
  right: 69px;
  top: 3px;
  z-index:9999999;
}
.moreCard div div div.v-list-item{
    min-height: 27px !important;
}
#pinMessage{
  font-size: 13px;
}
#pinMessage i{
font-size: 18px !important;
}
#img-holder {
  width: fit-content;
  position:relative;
  padding: 17px 15px;
  background: #efecec;
}
#img-holder img{
  height: 120px;
  width: 120px;
  object-fit: cover;
}
#img-wrapper{
  gap:10px;
  width: 99%;
  padding: 10px 7px;
  overflow: auto;
}
#img-holder #deleteImg{
  position: absolute;
  top: -8px;
  right: -8px;
  color: #000;
}

.imagemesssage{
  display: flex;
  gap: 10px;
  flex-direction: row;
  flex-wrap: wrap;
}
.morebtn{
  position: absolute;
  top: 0;
  right: 15px;
}

#header_toolbar{
    height: unset !important;
    padding: 5px !important;
}
#types{
  position: relative;
  top: 12px;
  margin-left: 8px;
}
</style>
