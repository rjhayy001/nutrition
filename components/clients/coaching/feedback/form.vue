<template>
  <div class="form-container">
    <v-menu
      left
      offset-y
      v-model="menu"
      :close-on-click="false"
      :transition="false"
      :close-on-content-click="false"
      id="test"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-tooltip left color="primary">
            <template v-slot:activator="{ on}">
              <v-icon x-large v-on="on">
                mdi-plus-circle mdi-spin
              </v-icon>
            </template>
            <span>Add Feedback</span>
          </v-tooltip>
        </v-btn>
      </template>
      <v-card
        height="350"
        width="400"
        class="pa-4"
      >
        <div class="text-center mb-4">
          <v-icon @click="hideForm(false)">mdi-chevron-down </v-icon>
        </div>
        <div class="text-overline mb-4">
          {{ $t('clients.feedbackOfTheWeek') }}
        </div>
        <v-textarea solo v-model="payload.feedbackscol" @input="saveInput"></v-textarea>
        <div class="text-right">
          <v-btn
            class="font-weight-bold"
            color="primary"
            @click="submit"
            :disabled="!payload.feedbackscol"
            >
            {{ $t('global.submit') }}
          </v-btn>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  props: ['payloads','feedback_type', 'form_value'],
  // props: {
  //   payloads: {
  //     type: Object,
  //   },
  //   feedback_type: {
  //     type: String,
  //   },
  // },
  watch: {
    payloads: function(value) {
      // this.menu = true;
      this.payload.feedbackscol = value.feedbackscol
      this.payload.id = value.id
    },
     form_value: function(value) {
      if(value){
        this.menu = true;
      }
    }
  },
  data () {
    return {
      payload:{
        feedbackscol:'',
        id:'',
        client_id: this.$route.params.id
      },
      menu: false
    }
  },
  // mounted(){
   
  // },
  mounted(){
    setTimeout(() =>{
      this.menu = true
    }, 300);
    
    if(localStorage.getItem('id_'+this.$route.params.id) != ''){
      this.payload.feedbackscol = localStorage.getItem('id_'+this.$route.params.id);
    }
  },
  methods:{
    submit(){
      this.payload.type = this.feedback_type;
      this.$axios
        .post(`feedback/addFeedback/`, this.payload)
        .then(({ data }) => {
          console.log(data)
          this.$store.commit('updateFeedbackFlag', true)
          this.successfeedbackNotification(data.message)
          this.payload.feedbackscol = ''
          this.payload.id = ''
          this.$emit('reload')
          localStorage.removeItem('id_'+this.$route.params.id);
        })
    },
    hideForm(bool){
      this.menu = bool;
      this.payload.feedbackscol = ''
      this.payload.id = ''
      this.$emit('close')
    },
    saveInput(){
      localStorage.setItem('id_'+this.$route.params.id ,this.payload.feedbackscol);
    }
  }
}
</script>
<style scoped>
.form-container {
  position: fixed;
  right: 30px;
  bottom: 50px;
}
</style>
