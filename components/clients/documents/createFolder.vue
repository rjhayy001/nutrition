<template>
  <v-dialog
    width="500"
    v-model="dialog"
    persistent
  >
    <v-card>
      <v-toolbar class="text-h5 grey lighten-2" flat dense>
        <v-btn small @click="close">cancel</v-btn>
        <v-spacer></v-spacer>
        <span class="subtitle-1 text-capitalize font-weight-bold">new folder</span>
        <v-spacer></v-spacer>
        <v-btn small color="primary" :disabled="!name.length">create</v-btn>
      </v-toolbar>
      <v-card-text>
        <div class="my-3">
          <p class="subtitle-2 font-weight-regular">
            Folder Name
          </p>
        <v-text-field
          type="text"
          v-model="name"
          hide-details
          outline
          solo
        ></v-text-field>
      </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ['dialog'],
  data(){
    return{
      name:''
    }
  },
  methods:{
    close(){
      this.$emit('close')
      this.name=''
    }
  }
}
</script>
