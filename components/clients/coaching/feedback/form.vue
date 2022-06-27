<template>
  <div class="form-container">
    <v-menu
      left
      offset-y
      v-model="menu"
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
                mdi-message-plus-outline mdi-spin
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
          <v-icon @click="menu=false">mdi-chevron-down </v-icon>
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
  data () {
    return {
      payload:{
        feedbackscol:'',
        client_id: this.$route.params.id
      },
      menu: false
    }
  },
  methods:{
    submit(){
      this.$axios
        .post(`${this.$clients}/addFeedback/`, this.payload)
        .then(({ data }) => {
          this.$store.commit('updateFeedbackFlag', true)
          this.menu= false
          this.payload.feedbackscol = ''
        })
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
