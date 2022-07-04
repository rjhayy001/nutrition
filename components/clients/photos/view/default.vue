<template>
<div>
  <v-row v-if="!photos">
    <v-col md="6" cols="12">
      <h3>{{ this.$moment().format('MMMM YYYY') }}</h3>
    </v-col>
    <v-col md="6" cols="12">
      <div class="tags d-flex justify-end">
        <h4 class="active pa-2">All</h4>
      </div>
    </v-col>
  </v-row>
  <div
  v-for="(value, index) in months.slice().reverse()"
  :key="value.id"
  >
    <v-row class="my-2">
      <v-col><h3>{{ value }}</h3></v-col>
      <v-col v-if="index==0" md="6" cols="12">
        <v-tabs
        right>
          <v-tab class="tags" @click="$emit('initialize')">All</v-tab>
          <v-tab class="tags" v-for="tags in tags" :key="tags"
          @click="getByTag(tags)">
            #{{ tags }}
          </v-tab>
        </v-tabs>
        <!-- <div class="tags d-flex justify-end">
          <h4 class="active pa-1" @click="$emit('initialize')">All</h4>
          <h4 class="pa-1" v-for="tags in tags" :key="tags"
          @click="getByTag(tags)">
          #{{ tags }}
          </h4>
        </div> -->
      </v-col>
    </v-row>
    <v-layout>
      <v-flex
        v-for="photo in photos.slice().reverse()"
        :key="photo.id"
        xs1
        class="d-flex child-flex "
        v-if="value==$moment(photo.created_at).format('MMMM YYYY')"
      >
        <div class="image-holder" @click="$emit('openDetails', photo)">
          <div class="image-options text-center py-1">
            <v-icon
              dark
              small
              @click="$emit('openDetails', photo)"
            >
              mdi-note-edit-outline
            </v-icon>
            <v-icon
              dark
              small
              @click="$emit('download', photo)"
            >
              mdi-download
            </v-icon>
            <v-icon
              dark
              small
            >
              mdi-message-processing
            </v-icon>
          </div>
          <div v-if="photo.comment!=0" class="commented">
            <v-icon
              dark
              small
            >
              mdi-message-processing
            </v-icon>
          </div>
          <v-img
            :src="imageUrl('clients',id, photo.file_name)"
            :lazy-src="`https://picsum.photos/10/6?image=${photo.id}`"
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
        </div>
      </v-flex>
    </v-layout>
  </div>
</div>
</template>
<script>
export default {
  props: {
    photos: {
      type: Array,
      default: () => false
    }
  },
  data () {
    return {
      id: 0,
      months: [],
      counter: null,
      tags: [],
      images: [],
      shortTag: []
    }
  },
  created () {
    this.initialize()
  },
  mounted(){
    this.getMonths()
    this.getTags()
  },
  methods: {
    getByTag(val){
      // console.log(val,'afajfksd')
      this.$emit('getByTag',val)
    },
    initialize () {
      this.id = this.$route.params.id
    },
    getTags(){
      this.photos.forEach(element => {
        element.taggable.forEach(val => {
          let tag = val.name
          if(!this.tags.includes(tag)){
            this.tags.push(tag)
          }
        });
      });
    },
    getMonths(){
      this.months = []
      this.photos.forEach(element => {
        let month = this.$moment(element.created_at).format('MMMM YYYY')
        if(!this.months.includes(month)){
          this.months.push(month)
        }
      });
      // this.regroupImage()
    },
    regroupImage(){
      this.months.forEach((element, index) => {
        let newArr = []
        this.photos.forEach(val => {
          if(element==this.$moment(val.created_at).format('MMMM YYYY')){
            newArr.push(val)
          }
        });
        this.images.push({month: element, data: newArr})
      });
    },
    restock(){
      this.photos = this.constant
    }
  },
  watch: {
    photos(val){
      if(val){
        this.getMonths()
      }
    },
  }
}
</script>
<style scoped>
.image-holder:hover {
  box-shadow: 0 10px 10px -10px rgb(0 0 0 / 50%);
  -webkit-transform: scale(1.1);
  transform: scale(1.2);
  z-index: 99;
}
/* .image-holder:hover .image-options {
  display: block;
} */
/* .image-holder:hover .commented{
  display: none;
} */
.image-holder {
  transition: 0.5s;
  position: relative;
}
.tags{
  min-width: 60px !important;
  padding-left: 4px !important;
  padding-right: 4px !important;
  letter-spacing: 0px !important;
  border-bottom: 2px solid transparent !important;
  font-weight: bold !important;
  transition: .3s ease-in-out !important;
}
.tags:hover{
  border-bottom: 2px solid #7c94de !important;
}
/* .tags h4{
  transition: .2s ease-in-out;
  padding-bottom: 4px !important;
  min-width: 50px;
  text-align: center;
  margin-right: 4px;
  border-bottom: 4px solid transparent;
}
.tags h4:hover{
  cursor: pointer;
  border-bottom: 4px solid #7c94de;
  background: #ECEFF1;
}
.tags .active{
  pointer-events: none;
  border-bottom: 4px solid #7c94de;
} */
.image-options {
  position: absolute;
  bottom: 0px;
  opacity: 0.8;
  width: 100%;
  background: #7c94de;
  z-index: 2;
  display: none;
}
.commented{
  position: absolute;
  border-top-left-radius: 17px;
  opacity: 0.8;
  display: inline-block;
  right: 0px;
  bottom: 0px;
  width: 30%;
  z-index: 3;
  padding-left: 10px;
  background: #1e1e1e;
}
</style>
