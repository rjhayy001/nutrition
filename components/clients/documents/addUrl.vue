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
        <span class="subtitle-1  font-weight-bold">Add url</span>
      </v-toolbar>
      <v-card-text class="pa-4">
        <div class="mt-3">
          <v-text-field
          type="text"
          v-model="input_url"
          label="add link here"
          outline
          hide-details ="false"
          solo></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions class="justify-end">
          <v-btn small @click="save()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ['showAddurl'],
  data(){
    return{
      input_url:''
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
              file :  this.input_url,
              }
          )
          .then(({ data }) => {
              console.log(data);
              this.input_url='';
              this.$emit('showDocument')
          });
    }
  }
}
</script>
