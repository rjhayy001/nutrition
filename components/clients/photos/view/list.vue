<template>
<div>
  <div v-if="search1">
    <v-row class="mb-6">
      <v-subheader class="pr-0">
        <h3>Search:</h3>
      </v-subheader>
      <v-chip
        class="ma-2"
        close
        color="primary"
        @click:close="closeSearch"
      >
        {{ this.search1 }}
      </v-chip>
    </v-row>
    <v-layout row wrap v-if="searchPhotos.length">
      <v-flex xs12>
        <v-list>
          <v-list-item-group active-class="violet--text">
            <template v-for="(photo, index) in searchPhotos.slice().reverse()">
              <v-list-item :key="photo.id+'list'" @click="$emit('openDetails', photo)">
                <template v-slot:default="{ active }">
                  <v-list-item-avatar>
                    <v-img :src="imageUrl('clients', id, photo.file_name)" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-capitalize"
                      v-text="photo.title"
                    ></v-list-item-title>

                    <v-list-item-subtitle v-text="photo.description"></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action style="flex-direction: row;">
                    <div v-if="photo.comment!=0" class="mr-4">
                      <v-icon
                      >
                        mdi-message-processing
                      </v-icon>
                    </div>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                v-if="index < photo.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-progress-linear
        v-if="loading"
        indeterminate
        color="primary"
        class="mx-5"
      ></v-progress-linear>
      <div v-else class="mx-auto">
        <v-alert
          color="primary"
          text
          type="info"
        >
          Search not found for "<strong>{{ search1 }}</strong>"
        </v-alert>
      </div>
    </v-layout>
  </div>
  <div v-else>
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
          v-model="active_tab"
          right>
            <v-tab class="tags" @click="allTags" key="all">All</v-tab>
            <v-tab class="tags" v-for="tags in tags" :key="tags"
            active-class="tags"
            @click="getByTag(tags)">
              #{{ tags }}
            </v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-layout>
        <v-flex xs12>
          <v-list>
            <v-list-item-group active-class="violet--text">
              <template v-for="(item, index) in images.slice().reverse()"
              v-if="value==$moment(item.created_at).format('MMMM YYYY')">
                <v-list-item :key="item.id+'list'" @click="$emit('openDetails', item)">
                  <template v-slot:default="{ active }">
                    <v-list-item-avatar>
                      <v-img :src="imageUrl('clients', id, item.file_name)" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        class="text-capitalize"
                        v-text="item.title"
                      ></v-list-item-title>

                      <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action style="flex-direction: row;">
                      <div v-if="item.comment!=0" class="mr-4">
                        <v-icon
                        >
                          mdi-message-processing
                        </v-icon>
                      </div>
                    </v-list-item-action>
                  </template>
                </v-list-item>

                <v-divider
                  v-if="index < images.length - 1"
                  :key="index"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
        </v-flex>
        <!-- <v-flex
          v-for="photo in images.slice().reverse()"
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
        </v-flex> -->
      </v-layout>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: {
    photos: {
      type: Array,
      default: () => false
    },
    month: {},
    search: {}
  },
  data () {
    return {
      id: 0,
      active_tab: '',
      awaitingSearch: false,
      search1: '',
      months: [],
      counter: null,
      tags: [],
      images: [],
      searchPhotos: [],
      shortTag: [],
      loading: true
    }
  },
  created () {
    this.initialize()
  },
  mounted(){
    this.images = this.photos
    this.getMonths()
    this.getTags()
    console.log(this.images)
  },
  methods: {
    initialize () {
      this.id = this.$route.params.id
    },
    getByTag(val){
      let filtered = []
      this.photos.forEach(element => {
        element.taggable.forEach(tag => {
          if(val==tag.name){
            filtered.push(element)
          }
        });
      });
      this.images = filtered
      this.getMonths()
    },
    allTags(){
      if(this.month==null){
        this.images = this.photos
        this.getMonths()
      }else {
        this.getMonths(this.month)
      }
      this.getTags()
    },
    getMonths(val){
      this.months = []
      if(val==null){
        this.images.forEach(element => {
          let month = this.$moment(element.created_at).format('MMMM YYYY')
          if(!this.months.includes(month)){
            this.months.push(month)
          }
        });
      }else{
        let filtered = []
        let month = this.$moment(val).format('MMMM YYYY')
        this.months.push(month)
        this.photos.forEach(element => {
          let photoMonth = this.$moment(element.created_at).format('MMMM YYYY')
          if(month==photoMonth){
            filtered.push(element)
          }
        });
        this.images = filtered
        this.getTags()
      }
      
      // this.regroupImage()
    },
    getTags(){
      this.tags = []
      this.images.forEach(element => {
        element.taggable.forEach(val => {
          let tag = val.name
          if(!this.tags.includes(tag)){
            this.tags.push(tag)
          }
        });
      });
      this.active_tab = 0
    },
    closeSearch() {
      this.search1 = null
      this.searchPhotos = []
      this.$emit('clearSearch')
    },
    getBySearch() {
      this.loading = true
      let query = this.search1
      this.$axios.get(`${this.$clients}/${this.id}/photos?&search=${query}`).then(({data}) => {
        this.searchPhotos = data
        if(!data.legnth){
          setTimeout(() => {
            this.loading = false
          }, 1000);
        }
      })
    }
  },
  watch: {
    photos(val){
      if(val){
        this.images = this.photos
        this.getMonths()
      }
      console.log(this.images)
    },
    month(val){
      if(val){
        this.getMonths(val)
        return val
      }
    },
    search(val){
      this.search1 = val
      this.loading = true
      this.searchPhotos = []
      if(val){
        if (!this.awaitingSearch) {
          setTimeout(() => {
            this.getBySearch()
            this.awaitingSearch = false;
          }, 1500); // 1.5 sec delay
        }
        this.awaitingSearch = true;
      }
    }
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
  border: 1px solid #e6e6e6 !important;
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
