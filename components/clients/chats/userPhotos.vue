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
      <v-card width="400px" height="400px" style="overflow-y:auto;" class="scrollable-element">
        <div class="toolbar-container">
          <v-toolbar flat dense color="#f5f5f5">
            <v-toolbar-title class="text-capitalize subtitle-2"> my Photos</v-toolbar-title>
            <span class="subtitle-2 ml-2" v-if="photos.length">{{photos.length}} selected</span>
            <v-spacer></v-spacer>
            <v-icon
              color="#7c94de"
              @click="confirmPhoto"
              :disabled="!photos.length"
            >
              mdi-check
            </v-icon>
         </v-toolbar>
        </div>
        <v-container>
          <v-row>
            <v-col
              v-for="n in 40"
              :key="n"
              class="d-flex child-flex"
              :style="{background: photoChecker(`https://picsum.photos/500/300?image=${n * 5 + 10}`) ? '#e1dddd' : 'none' , position:'relative'}"
              cols="3"
              @click.prevent="selectPhoto(`https://picsum.photos/500/300?image=${n * 5 + 10}`)"
            >
              <v-img
                :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                aspect-ratio="1"
                class="grey lighten-2"
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
                  v-if="photoChecker(`https://picsum.photos/500/300?image=${n * 5 + 10}`) "
                  color="error"
                  @click.stop="removePhoto(`https://picsum.photos/500/300?image=${n * 5 + 10}`)"
                >
                  mdi-delete-outline
                </v-icon>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import arrayHelper from "@/mixins/arrayHelper.vue";
  export default {
    mixins: [arrayHelper],
    data(){
      return {
        photos:[],
      }
    },
    methods:{
      selectPhoto(image){
          this.photos.push(image);
      },
      confirmPhoto(){
        this.$emit('confirm', this.photos)
      },
      photoChecker(photo){
        let exist = this.photos.some(function(field){
          return field === photo
        })

        return exist
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

</style>
