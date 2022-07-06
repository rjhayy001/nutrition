<template>
  <div>
    <v-menu
      v-model="dialog"
      :position-x="options.x"
      :position-y="options.y"
      absolute
      offset-y
      @input="test2"
    >
      <v-list dense v-if="!options.in_item_click">
        <v-list-item
          @click="$emit('addDocuments')"
        >
          <v-list-item-title class="text-capitalize">add documents</v-list-item-title>
        </v-list-item>
        <v-list-item
            @click="$emit('addUrl')"
        >
          <v-list-item-title class="text-capitalize">add link</v-list-item-title>
        </v-list-item>
        <!-- <v-list-item
           @click="showCreateFolder=true"
        >
          <v-list-item-title class="text-capitalize">new folder</v-list-item-title>
        </v-list-item> -->
      </v-list>
      <!-- <v-list dense v-else>
        <v-list-item
        >
          <v-list-item-title class="text-capitalize">rename</v-list-item-title>
        </v-list-item>
        <v-list-item
        >
          <v-list-item-title class="text-capitalize">delete</v-list-item-title>
        </v-list-item>
      </v-list> -->
    </v-menu>
    <!-- <create-folder
      :dialog="showCreateFolder"
      @close="showCreateFolder=false"
    /> -->
  </div>
</template>
<script>
import createFolder from '@/components/clients/documents/createFolder.vue'
export default {
  components: {
    createFolder
  },
  props: ['dialog', 'options'],
  data(){
    return{
      showCreateFolder: false,
      showAddurl: false,
      x: 0,
      y: 0,
      items: [
        { title: 'Click Me'},
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }
  },

  methods: {
    addDocuments(){
      alert('sad')
    },
    test2(e){
      if(e == false){
        this.$emit('close')
      }
    }
  }
}
</script>
