<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 class="pb-0">
        <div class="toolbar-container">
          <v-toolbar flat dense color="#f5f5f5">
            <v-toolbar-title class="title-header">@ {{client_name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon class="mx-2">mdi-magnify</v-icon>
            <v-icon class="mx-2">mdi-phone-outline</v-icon>
            <v-icon class="mx-2">mdi-video-outline</v-icon>

            <pinned-messages @getPinnedMessage="getPinnedMessage" :pinned="pinMessages"/>
          </v-toolbar>
        </div>
      </v-flex>

      <v-flex xs12>
        
        <div class="scrollable-element" id="scrollable-element" ref="chat">
          <!-- <div v-for="item in chatList"  :key="item.id"> -->
          <div v-for="(item, index) in chatList" :key="item.id">
            <div class="date-divider ">
              <p class="px-2">{{ChangeDateformat(index)}}</p>
            </div>
            <v-list-item id="datalist" v-for="(listChat, key) in item" :key="listChat.id">
              <v-list-item-avatar
                size="30"
              >
                <v-img v-if="listChat.logo != ''" :src="listChat.logo?listChat.logo:default_profile" ></v-img>
                <v-img v-else  src='https://cdn.vuetifyjs.com/images/lists/1.jpg' ></v-img>
                <!-- <v-img :src="'https://cdn.vuetifyjs.com/images/lists/1.jpg'" ></v-img> -->
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="subtitle-2">{{listChat.fullname}}</v-list-item-title>
                <v-list-item-subtitle v-if="listChat.type == 'text'" class="pt-1" style="font-size:13px;">
                 {{listChat.message}}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else class="pt-1" style="font-size:13px;">
                <div class="imagemesssage">
                  <div v-for="(image, key) in decodeMessage(listChat.message)" :key="image.id">
                      <img :src="image" style="height:150px; width:150px;"/>
                  </div>
                </div>
                </v-list-item-subtitle>
                <!-- <v-list-item-subtitle class="pt-1" style="font-size:13px;" v-else>
                 <img
                    :src="default_profile"
                  />
                </v-list-item-subtitle> -->
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
                      <v-list-item >
                      <p id="pinMessage" class="d-flex justify-space-between" @click = "deleteMessage(listChat)" style="width:100%;">Delete Message<v-icon class="ml-2">mdi-delete</v-icon></p>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <button @click = "showMore(key)" v-on="on" rel="1" class="morebtn"> <v-icon class="mr-1">mdi-dots-horizontal</v-icon></button>
                  </template>
                  <span>More</span>
                </v-tooltip>
            </v-list-item>
              
            <!-- <v-list-item>
              <v-list-item-avatar
                size="30"
              >
                <v-img :src="'https://cdn.vuetifyjs.com/images/lists/2.jpg'" ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="subtitle-2">John Doe2</v-list-item-title>
                <v-list-item-subtitle class="pt-1">
                 Secret !
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item> -->
          </div>
    
        </div>
        <div class="text-field-container">
          <div v-if="image_selecteds.length > 0">
            <div class="d-flex flex-row g-10" id="img-wrapper">
              <div id="img-holder"  class="d-flex flex-column"  v-for="(selectedFile, index) in image_selecteds" :key="selectedFile.id">
                  <v-icon id="deleteImg" @click="removeSelectedImg(selectedFile, index)">mdi-delete</v-icon>
                  <img :src="selectedFile.image">
                  <span>{{selectedFile.name | truncate(12, '')}}</span>
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
              <v-icon class="mr-1"  @click="handleFileImport">mdi-upload</v-icon>
              <input
                    accept="image/png, image/gif, image/jpeg"
                    ref="uploader"
                    type="file"
                    @change="onFileChange"
                    class="d-none"
                    multiple
              />
              <user-photos @confirm="confirmPhotos"></user-photos>
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
  </v-container>
</template>
<script>
  import userPhotos from '@/components/clients/chats/userPhotos.vue'
  import confirmPhotos from '@/components/clients/chats/confirmPhotos.vue'
  import coach from '@/components/clients/chats/coach.vue'
  import pinnedMessages from '@/components/clients/chats/pinnedMessages.vue'
  import default_profile from "@/static/images/empty_person.png";
  import moment from 'moment'
  export default {
    components: {
      coach,
      pinnedMessages,
      userPhotos,
      confirmPhotos,
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
        text: '',
        timeout: 2000,
        pinMessages: [],
        default_profile,
        client_name :'',
        image_selected : {
          name:'',
          image:'',
        },
        image_selecteds : [],
        rules: [
          value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
        ],
      }
    },
    created(){
      this.initialize()
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
      this.getChats();
      this.getPinnedMessage();
      this.scrollInto();
     
    },

    watch: {
        chatList: function(value) {
          this.scrollInto();
        }
    },
    methods:{
      initialize(){
        console.log(this.$route.params.id)
      },
      changeS(key){
        setTimeout(function(scope) {
        document.getElementById("chats"+key).focus();
        }, 200, this);
      },
      scrollInto(){
        setTimeout(function() {
          var objDiv = document.getElementById("scrollable-element");
          objDiv.scrollTop = objDiv.scrollHeight;
        }, 100, this);
      },
      send(){
        alert('test')
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
          .post(`${this.$clients}/addChat/`,{
              client_id : `${this.$route.params.id}`,
              message : this.message,
              sender_id : this.$auth.user.id,
              sender_type : 'coach',
              selected : 'coach',
              type : 'text'
              }
          )
          .then(({ data }) => {
            // this.chatList = data;
            this.message ='';
            this.getPinnedMessage();
            this.getChats();
             this.image_selecteds = [];
          });
        }
        if(this.image_selecteds.length > 0 ){
          this.$axios
          .post(`${this.$clients}/addChat/`,{
              client_id : `${this.$route.params.id}`,
              message : this.image_selecteds,
              sender_id : this.$auth.user.id,
              sender_type : 'coach',
              selected : 'coach',
              type : 'image'
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
        .put(`${this.$clients}/pinMessage/`+item.id+'?to=1'
         )
        .then(({ data }) => {
          thiss.is_pinned = null;
          thiss.snackbar = true;
          thiss.getPinnedMessage();
          thiss.text = 'pinned message successfully';
        });
      },
      deleteMessage(item){
        const thiss = this;
        this.$axios
        .delete(`${this.$clients}/deleteMessage/`+item.id
         )
        .then(({ data }) => {
          thiss.is_pinned = null;
          thiss.snackbar = true;
          thiss.getChats();
          thiss.getPinnedMessage();
          thiss.text = 'delete message successfully';
        });
      },
      getChats(){
        this.$axios
        .get(`${this.$clients}/getChat/`+`${this.$route.params.id}`
         )
        .then(({ data }) => {
          this.chatList = data.data;
          this.client_name = data.name;
         
            //  var container = document.querySelector("#chats25");
            //  container.focus();
        });
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
        .get(`${this.$clients}/getPinnedMessage/`
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
            image: image
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

</style>
