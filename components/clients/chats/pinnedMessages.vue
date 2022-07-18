<template>
  <div class="text-center">
    <v-menu offset-y tile>
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          class="mx-2"
          v-bind="attrs"
          v-on="on"
        >
          mdi-pin-outline
        </v-icon>
      </template>
      <v-card width="350px">
        <div class="toolbar-container">
          <v-toolbar flat dense color="#f5f5f5">
            <v-toolbar-title class="text-capitalize subtitle-2">pinned messages</v-toolbar-title>
          </v-toolbar>
        </div>
        <v-container v-if="pinned.length > 0">
          <div v-for="item in pinned"  :key="item.id">
            <v-card class="my-2" v-if="item.is_pinned == 1">
           
              <v-list-item>
                <v-list-item-avatar>
                <v-img v-if="item.logo != ''" :src="item.logo?item.logo:default_profile" ></v-img>
                <v-img v-else src='https://cdn.vuetifyjs.com/images/lists/1.jpg' ></v-img>
                  <!-- <v-img :src="'https://cdn.vuetifyjs.com/images/lists/1.jpg'" ></v-img> -->
                </v-list-item-avatar>
                <v-list-item-content>
                  
                  <v-list-item-title class="subtitle-2">{{item.fullname}}</v-list-item-title>
                  <!-- <v-list-item-subtitle class="pt-1">
                   {{item.message}}
                  </v-list-item-subtitle> -->
                  <v-list-item-subtitle v-if="item.type == 'text'" class="pt-1" style="font-size:13px;">
                 {{item.message}}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else class="pt-1" style="font-size:13px;">
                
                <div class="imagemesssage d-flex">
                  <div v-for="(image, key) in decodeMessage(item.message)" :key="image.id">
                      <img :src="image" style="height:100px; width:100px;"  v-if="checkFile(image) == 'data:image'"/>
                      <video id="video-preview" v-else-if="checkFile(image) == 'data:video'" controls :src="image" style="height:120px; width:120px;"/>
                      <v-img v-else
                        :src="iconSelector(image)" contain id="imgfile"
                        style="height:100px; width:100px;" 
                      > 
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                              <a :href="image" download v-bind="attrs"
                              v-on="on">
                                <v-icon class="mx-2" style="width:100%">
                                mdi-download
                                </v-icon>
                              </a>
                          </template>
                          <span>Download</span>
                        </v-tooltip>
                       </v-img>
                  </div>
                </div>
                </v-list-item-subtitle>
                </v-list-item-content>
                
                  <v-icon class="ml-2" @click="deletePin(item.id)">mdi-close</v-icon>
              </v-list-item>
            </v-card>
          </div>
        </v-container >
         <div class="pa-10 mt-50 _nopinmsg" v-else>
            <img data-v-0c6d4504="" src="/images/Frame.png" alt="" style="width: 40%;">
        </div>
      </v-card>
    </v-menu>
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
              Are you sure to delete this pinned messages?
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
              @click="deletePinMessage()"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>
<script>

  import default_profile from "@/static/images/empty_person.png";
  import iconHelper from '@/mixins/iconHelper'
    import empty from '@/components/error/empty_data.vue'

  export default {
  mixins: [iconHelper],
    components: {
      empty,
    },
  props: {
    pinned: {
      type: Array,
      default: () => [],
      required: true
    }
  },

  data() {
    return {
      pinMessagelist:[],
      default_profile,
      deletedialog : false,
      d_id : '',
    };
  },
   methods: {
      deletePin(id){
        this.d_id = id;
        this.deletedialog = true;
      },
      deletePinMessage(){
        const thiss = this;
        this.$axios
        .put(`chat/pinMessage/`+this.d_id +'?to=0'
         )
        .then(({ data }) => {
          this.$emit('getPinnedMessage')
          this.chatNotification('deleted','Pinned message')
          this.deletedialog = false;
        });
      },
      decodeMessage(message) {
       return JSON.parse(message);
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
    }
};
</script>
<style scoped>
.imagemesssage{
  gap: 10px;
}

._nopinmsg{
  width: 100%;
  text-align: center;
}
</style>
<style>
 div.v-responsive__content a{
  display: flex !important;
  height:100%;
  width: 100%;
  text-decoration: none;
}
 div.v-responsive__content a:hover{
  transform:scale(1.2)
}
</style>
