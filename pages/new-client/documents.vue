<template>
   <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 class="pb-5">
        <div class="toolbar-container">
          <v-toolbar  dense >
            <v-toolbar-title class="title-header">Documents</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon class="mx-2">mdi-format-list-checkbox</v-icon>
            <v-icon class="mx-2">mdi-phone-outline</v-icon>
            <v-icon class="mx-2">mdi-video-outline</v-icon>
            <pinned-messages/>
          </v-toolbar>
        </div>
      </v-flex>
    </v-layout>
    <file-viewer></file-viewer>
   </v-container>
</template>
<script>
import fileViewer from '@/components/ui/fileViewer.vue'
export default {
  components:{
    fileViewer
  },
  methods: {

  }
}
</script>
