<template>
  <div>
    <v-container grid-list-md>
      <form-drawer :drawerStatus="drawer1" @closeDrawer="drawer1 = !drawer1"
        @addRecord="addRecord($event)"
        @updateRecord="updateRecord($event)"
        :selectedItem="selectedItem"
      />
      <v-layout row wrap>
        <v-flex xs12 class="pb-5">
        <div class="toolbar-container">
          <v-toolbar  flat outlined color="primary" dark>
            <v-toolbar-title class="title-header">Photos</v-toolbar-title>
            <v-spacer></v-spacer>
            <div style="width: 400px;">
              <v-autocomplete
                auto-select-first
                clearable
                filled
                rounded
                hide-details=""
                placeholder="Search items by name, age ..."
                height="10"
                dense
                append-icon="mdi-magnify"
              ></v-autocomplete>
            </div>
            <v-icon class="mx-2">mdi-format-list-checkbox</v-icon>
            <v-icon class="mx-2" @click="drawer1=true">mdi-plus</v-icon>
            <pinned-messages/>
          </v-toolbar>
        </div>
      </v-flex>
        <v-flex
          v-for="n in 40"
          :key="n"
          xs1
          class="d-flex child-flex "
        >
          <div class="image-holder">
            <div class="image-options text-center py-1">
              <v-icon dark small @click="openDetails">
                mdi-eye
              </v-icon>
              <v-icon dark small>
                mdi-download
              </v-icon>
            </div>
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
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import formDrawer from "~/components/clients/photos/form.vue";
export default {
  components: { formDrawer },
  data(){
    return {
      drawer1:false,
      selectedItem:{}
    }
  },
  methods:{
    openDetails(item={}){
      this.drawer1 = !this.drawer1
      this.selectedItem = this.cloneVariable(item)
    }
  }
}
</script>
<style scoped>
.image-holder:hover{
  box-shadow: 0 10px 10px -10px rgb(0 0 0 / 50%);
  -webkit-transform: scale(1.1);
  transform: scale(1.5);
  z-index: 99;
}
.image-holder:hover .image-options{
  display: block;
}
.image-holder{
  transition: .5s;
  position:relative;
}
.image-options{
  position: absolute;
  bottom: 0px;
  opacity:0.8;
  width: 100%;
  background: #7c94de;
  z-index: 2;
  display:none;
}
</style>
