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
         <div class="pa-2 mt-50 _nopinmsg" v-else>
            <v-icon class="mx-2" style="font-size: 50px;">mdi-alert</v-icon>
            <p class="mr-1">
              No pin Message
            </p>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
  // export default {
  //   props: ["pinned"],
  //   data: () => ({
  //     items: [
  //       { title: 'Click Me' },
  //       { title: 'Click Me' },
  //       { title: 'Click Me' },
  //       { title: 'Click Me 2' },
  //     ],
  //   return {
  //     pinMessagelist: this.pinned,
    
  //   };
    
  //   }),
  //   // mounted(){
  //   //   this.getPinnedMessage();
  //   // },
  //   // methods: {
  //   //    getPinnedMessage(){
  //   //     const thiss = this;
  //   //     this.$axios
  //   //     .get(`${this.$clients}/getPinnedMessage`
  //   //      )
  //   //     .then(({ data }) => {
  //   //       this.pinMessagelist = data;
  //   //     });
  //   //   },
  //   // }
  // }
  import default_profile from "@/static/images/empty_person.png";
  import iconHelper from '@/mixins/iconHelper'

  export default {
  mixins: [iconHelper],

  props: {
    pinned: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  // watch: {
  //     // whenever question changes, this function will run
  //     pinned(newQuestion, oldQuestion) {
  //     alert('test');
  //      this.pinMessagelist = newQuestion;
  //     }
  //   },
  data() {
    return {
      pinMessagelist:[],
      default_profile,
    };
  },
   methods: {
       deletePin(id){
        // console.log(id);
        // return;
        const thiss = this;
        this.$axios
        .put(`chat/pinMessage/`+id+'?to=0'
         )
        .then(({ data }) => {
          
          this.$emit('getPinnedMessage')
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
