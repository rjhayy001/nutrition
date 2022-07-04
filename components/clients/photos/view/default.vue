<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      v-for="photo in data"
      :key="photo.id"
      xs1
      class="d-flex child-flex "
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
          :src="imageUrl('clients', id, photo.file_name)"
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
</template>
<script>
export default {
  props: ['data'],
  data () {
    return {
      id: 0
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.id = this.$route.params.id
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
/* .image-holder:hover .commented{
  display: none;
} */
.image-holder {
  transition: 0.5s;
  position: relative;
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
