<template>
  <div class="form-container">
    <v-menu
      left
      offset-y
      v-model="menu"
      :close-on-click="false"
      :close-on-content-click="false"
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
          Feedback de la semaine
        </div>
        <v-textarea solo v-model="payload.feedbackscol"></v-textarea>
        <div class="text-right">
          <v-btn
            class="font-weight-bold"
            color="primary"
            @click="submit"
            :disabled="!payload.feedbackscol"
          >
            submit
          </v-btn>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  props: ['payloads','feedback_type'],
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
      this.menu = true;
      this.payload.feedbackscol = value.feedbackscol
      this.payload.id = value.id
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
  methods:{
 
    submit(){
      this.payload.type = this.feedback_type;
      this.$axios
        .post(`${this.$clients}/addFeedback/`, this.payload)
        .then(({ data }) => {
          this.$store.commit('updateFeedbackFlag', true)
          if(data.message == 'added success'){
            this.successfeedbackNotification('added')
          }
          else{
            this.successfeedbackNotification('update')
          }
          this.menu= false
          this.payload.feedbackscol = ''
          this.payload.id = ''
        })
    },
    hideForm(bool){
      this.menu = bool;
      this.payload.feedbackscol = ''
      this.payload.id = ''
    }
  }
}
</script>
<style scoped>
.form-container {
  z-index: 99 !important;
  position: fixed;
  right: 30px;
  bottom: 50px;
}
</style>
