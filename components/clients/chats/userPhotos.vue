<template>
  <div class="text-center">
    <v-menu
      offset-y
      tile
      top
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          v-bind="attrs"
          v-on="on"
        >
          mdi-plus-circle
        </v-icon>
      </template>
      <v-card width="450px" height="400px" style="overflow-y:auto;" class="scrollable-element">
        <div class="toolbar-container">
          <v-toolbar flat dense color="#f5f5f5">
            <v-toolbar-title class="text-capitalize subtitle-2"> my Documents</v-toolbar-title>
             <div style="width: 180px;" id="types" class="ml-2">
                <v-select
                  clearable
                  :items="type"
                  label="type"
                  v-model="type_f"
                  rounded
                  outlined
                  dense
                  hide-details="true"
                  @change="searchDoc"
                ></v-select>
            </div>
            <v-spacer></v-spacer>
            <span class="subtitle-2 ml-2" v-if="photos.length">{{photos.length}} selected</span>
            <v-spacer></v-spacer>
            <v-icon
              v-if="photos.length > 0"
              color="#7c94de"
              @click="confirmPhoto"
              :disabled="!photos.length"
            >
              mdi-check
            </v-icon>
         </v-toolbar>
        </div>
        <v-container>
          <v-row v-if="documents.length > 0">
            <v-col
              v-for="(item, index) in documents" :key="index"
              class="d-flex child-flex pa-1"
              :style="{background: photoChecker(item) ? '#e1dddd' : 'none' , position:'relative'}"
              cols="2"
              @click="selectPhoto(item)"
            >
            <!-- <v-col
              v-for="n in 40" :key="n"
              class="d-flex child-flex"
              :style="{background: photoChecker(`https://picsum.photos/500/300?image=${n * 5 + 10}`) ? '#e1dddd' : 'none' , position:'relative'}"
              cols="3"
              @click.prevent="selectPhoto(`https://picsum.photos/500/300?image=${n * 5 + 10}`)"
            > -->
              <v-img
                :src="imageUrl2('documents/coach', $auth.user.id, item.file_path)" v-if="checkFile(item.file_type) == 'image'" id="imgfile"
                :lazy-src="`https://picsum.photos/10/6?image=${index * 5 + 10}`"
                aspect-ratio="1"
                @click="selectPhoto(item)"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
               <v-img v-else
                :src="iconSelector(item)" contain id="imgfile"
                :lazy-src="`https://picsum.photos/10/6?image=${index * 5 + 10}`"
                aspect-ratio="1"
                @click.prevent="selectPhoto(item)"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              
              <div
                class="remove-icon" 
              >
                <v-icon 
                @click.stop="removePhoto(item)"
                  v-if="photoChecker(item)"
                  color="error"
                  id="test"
                >
                  mdi-delete-outline
                </v-icon>
              </div>
            </v-col>
            
          </v-row>
          <div class="pa-2 mt-50 _nofeedback" v-else>
            <v-icon class="mx-2" style="font-size: 60px;">mdi-alert</v-icon>
            <p class="title mr-1">
              No documents
            </p>
        </div>
        </v-container>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import arrayHelper from "@/mixins/arrayHelper.vue";
import iconHelper from '@/mixins/iconHelper'

  export default {
    mixins: [arrayHelper,iconHelper],
    props:['sdata'],
    data(){
      return {
        photos:[],
        type_f:'',
        documents:[],
        type: ['all','image', 'video', 'link', 'application'],

      }
    },
    mounted(){
      this.getDocuments();
    },
     watch: {
        sdata: function(value) {
          this.photos = [];
        }
    },
    methods:{
      selectPhoto(image){
        if(!this.photos.includes(image)){
            this.photos.push(image);
        }
      },
      checkFile(file) {
        const type = file.split("/");
          return type[0];
      },
      iconSelector(item){
        const getype = item.file_type.split("/");
        let srcIcon = this.types.find(type => type.type == getype[1])
        if(item.type =='image'){
          return item.data
        }
        return srcIcon ? srcIcon.icon : this.unverifyIcon
      },
      confirmPhoto(){
        this.$emit('confirm', this.photos)
      },
      photoChecker(photo){
        if(this.photos.includes(photo)){
          return true;
        }
        else{
          return false;
        }
        // let exist = this.photos.some(function(field){
        //   return field === photo.id
        // })

        // return exist
      },
      removePhoto(photo){
        this.$arraysplicer(photo, this.photos)
      },
      $isOnArray(item, array_given){
          let found = array_given.some(arr => arr.id === item.id);
          let flag = false

          if(found != undefined) {
              flag = true
          }

          return flag
      },
      getDocuments () {
        this.$axios
          .get(`documents/`+this.$auth.user.id
          )
          .then(({ data }) => {
           this.documents = data;
          });
      },
      searchDoc () {
        if(this.type_f == null || this.type_f == 'all'){
          this.getDocuments();
          return;
        }
      this.$axios
        .post(`documents/searchFilter/`,{
            type : this.type_f,
            client_id:`${this.$route.params.id}`,
            coach_id:this.$auth.user.id,
          }
        )
        .then(({ data }) => {
          this.documents = data;
        });
      },

    }
  }
</script>
<style scoped>
.toolbar-container {
  position: sticky;
  top: 0;
  z-index: 9;
}
.scrollable-element {
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll;
    height:76vh;
    border-bottom: #dfdfdf;
}

.scrollable-element::-webkit-scrollbar {
  background-color: #dfdfdf;
  width: 8px;
   z-index: 3;
  border-radius: 50px;
}

.scrollable-element::-webkit-scrollbar-thumb {
  background-color: #858383;
  border-radius: 50px;
}

.selected-photo{
  background-color: #e1dddd;
}

.remove-icon {
  position: absolute !important;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 50% auto !important;
  display: flex !important;
  justify-content: center !important;
}

#imgfile{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
._nofeedback{
  width: 100%;
  text-align: center;
  margin-top: 15%;
}
</style>
