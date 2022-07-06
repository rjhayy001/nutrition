<template>
  <v-dialog
    width="500"
    v-model="showAddurl"
    persistent
  >
    <v-card>
      <v-toolbar class="text-h5 grey lighten-2" flat dense>
        <v-btn small @click="close">cancel</v-btn>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <span class="subtitle-1  font-weight-bold">Add link</span>
      </v-toolbar>
      <v-card-text class="">
        <div>
          <v-text-field
          type="text"
          v-model="url_name"
          label="Tittle"
        
          hide-details ="false"
          ></v-text-field>
        </div>
        <div class="mt-3">
          <v-text-field
          type="text"
          v-model="input_url"
          label="Add link here"
        
          hide-details ="false"
          ></v-text-field>
        </div>
      </v-card-text>
       <v-toolbar class="text-h5 grey lighten-2 d-flex justify-end" flat dense>
             <v-btn small @click="save()">Save</v-btn>
        </v-toolbar>
    
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ['showAddurl'],
  data(){
    return{
      input_url:'',
      url_name:''
    }
  },
  methods:{
    close(){
      this.$emit('close')
      this.name=''
    },
    save(){
        this.$axios
          .post(`documents/urlLinks`,{
              coach_id :  this.$auth.user.id,
              file_name :  this.url_name,
              file :  this.input_url,
              }
          )
          .then(({ data }) => {
              this.input_url='';
              this.url_name='';
              this.$emit('showDocument')
          });
    }
  }
}
</script>
