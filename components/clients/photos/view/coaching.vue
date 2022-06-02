<template>
  <v-layout
    row
    wrap
  >
    <v-flex xs12>
      <v-toolbar flat dense>
        <v-spacer></v-spacer>
        <v-breadcrumbs
          :items="tags"
        >
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item
              :href="item.href"
              :disabled="item.disabled"
            >
              {{ item.text.toUpperCase() }}
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-toolbar>
    </v-flex>
    <v-flex
      v-for="n in 24"
      :key="n"
      xs1
      class="d-flex child-flex "
    >
      <div class="image-holder">
        <span></span>
        <div class="image-options text-center py-1">
          <v-icon
            dark
            small
          >
            mdi-message-processing
          </v-icon>
          <!-- <v-icon
            dark
            small
            @click="$emit('download', photo)"
          >
            mdi-download
          </v-icon> -->
        </div>
        <v-img
          :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
          :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
          aspect-ratio="1"
          class="grey lighten-2 pointer pointer"
          @click="$emit('openDetails', photo)"
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

</template>
<script>
import formDrawer from "~/components/clients/photos/form.vue";
import defaultView from "~/components/clients/photos/view/default.vue";
import listView from "~/components/clients/photos/view/list.vue";
export default {
  components: {
    formDrawer,
    defaultView,
    listView
  },
  data(){
    return {
      search:'',
      awaitingSearch: false,
      default_view:false,
      drawer1:false,
      selectedItem:{},
      data:[],
      tags: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: false,
          href: 'breadcrumbs_link_2',
        },
      ],
    }
  },
  watch: {
    search(val) {
      if (!this.awaitingSearch) {
          setTimeout(() => {
            this.searchPhotos()
            this.awaitingSearch = false;
          }, 1500); // 1.5 sec delay
        }
        this.awaitingSearch = true;
    },
  },
  mounted(){
    this.initialize()
    console.log(this.imageUrl('clients', 6, 'test' ), 'urlsss')
  },
  methods:{
    initialize(){
      this.id = this.$route.params.id
      this.getDatas()
    },
    getDatas(){
      this.$axios.get(`${this.$clients}/${this.id}/photos`).then(({data}) => {
        this.data = data
      })
    },
    searchPhotos(){
      console.log('test')
    },
    openDetails(item={}){
      this.drawer1 = !this.drawer1
      this.selectedItem = this.cloneVariable(item)
    },
    downloadImage(payload){
      payload['client_id'] = this.$route.params.id
      this.$axios.post(`${this.$images}/download`, payload).then(({data}) => {
        console.log(data)
        this.download(data, payload)
      })
    },
    addRecord(payload){
      payload['client_id'] = this.$route.params.id
      this.$axios.post(`${this.$clients}/addPhoto`, payload).then(({data}) => {
        // this.successNotification(payload, "save","coach","coaches","title")
        this.initialize()
        console.log(data, 'addPhoto')
      })
    },
    updateRecord(payload){
      payload['client_id'] = this.$route.params.id
      this.$axios.put(`${this.$images}/${payload.id}`, payload).then(({data}) => {
          // this.successNotification(data, 'updated', 'country', 'countries', 'short_name')
          this.initialize()
          console.log(data,'update')
        })
    }
  }
}
</script>
<style scoped>
.image-holder:hover {
  box-shadow: 0 10px 10px -10px rgb(0 0 0 / 50%);
  -webkit-transform: scale(1.1);
  transform: scale(1.5);
  z-index: 99;
}
/* .image-holder:hover .image-options {
  display: block;
} */
.image-holder {
  transition: 0.5s;
  position: relative;
}
.image-options {
  position: absolute;
   border-top-left-radius: 17px;
  bottom: 0px;
  right: 0px;
  opacity: 0.8;
  width: 30%;
  background: #1e1e1e;
  z-index: 2;
  display: block;
}
</style>
