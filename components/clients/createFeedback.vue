<template>
     <!-- <v-card class="mx-auto" max-width="344" outlined id="wrapper-comment" style="{expand2==false ? 'border:none !important'}"> -->
     <v-card class="mx-auto" max-width="344" outlined id="wrapper-comment" :style="[expand2==false? {border:'none !important'}:'']">
       <v-list-item three-line >
         <v-list-item-content >
           <v-icon v-if="expand2==true" class="minimize" large @click="expand2 = !expand2">mdi-menu-down</v-icon>
           <v-icon v-else class="minimize" large @click="expand2 = !expand2">mdi-plus-circle</v-icon>
            <div class="text-overline mb-4" v-show="expand2">
              Feedback de la semaine
            </div>
              <div height="100" width="100" v-show="expand2">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-textarea outlined @change="setStorage" v-model="data.feedback" :rules="feedbackRules" ></v-textarea>
                </v-form>
                <v-card-actions class="mt-0 float-end" id="submitFeedback">
                  <v-btn
                  outlined
                  text 
                  v-on:click="submitFeedback"
                >
                  submit
                </v-btn>
            </v-card-actions>
            </div>
          </v-list-item-content>
        </v-list-item>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    </v-card>
</template>

<script>
export default {
  data() {
    return {
     data : {
        id:'',
        feedback :'',
     },
     expand2: true,
     unsaveFeedback:'',
     valid :true,
     snackbar: false,
     timeout: 2000,
     text: 'Feedback submitted',
     feedbackRules: [
        v => !!v || 'Feedback is empty',
     ],
    };
  },

  mounted() {
    // alert(`${this.$route.params.id}`);
    this.getUnsaveFeedback();
  },
  methods: {
    submitFeedback() {
      if(this.$refs.form.validate() == false){
        return;
      }
      this.$axios
        .post(`${this.$clients}/addFeedback/`,{
            client_id : `${this.$route.params.id}`,
            feedbackscol : this.data.feedback
            }
        )
        .then(({ data }) => {
          localStorage.removeItem(`${this.$route.params.id}`);
          this.$emit('submitFeedback');
          this.snackbar = true;
          this.$refs.form.reset()
          // id = data.id;
          // feedback = data.feedback;
        });
    },
    minimize() {
      console.log('test');
    },
    setStorage() {
      localStorage.setItem(`${this.$route.params.id}`,this.data.feedback);
    },
    getUnsaveFeedback(){
      this.unsaveFeedback = localStorage.getItem(`${this.$route.params.id}`);
      if(this.unsaveFeedback){
        this.data.feedback = this.unsaveFeedback;
      }
    }
  },
};

</script>

<style scoped>
.minimize{
  cursor: pointer;
}
.minimize:hover{
transform: scale(1.2);
}
</style>