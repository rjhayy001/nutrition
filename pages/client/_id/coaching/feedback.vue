<template>
  <v-container grid-list-md fluid>
    <v-layout row wrap>
      <v-flex xs12 class="mb-2">
        <div class="d-flex align-center py-2 data-table-cus">
          <p class="title mr-1">
              Feedback
          </p>
        </div>
        <hr />
      </v-flex>
    </v-layout>
    <v-layout row wrap id="wrapper_feedback">
        <v-flex xs6>
          <h1 class="font-weight-meduim mb-2">John DOE</h1>
          <h4 class="mb-5">Historique des feedback</h4>
        </v-flex>
        <v-flex xs6>
        <v-btn depressed rounded>
            Faire un feedback
        </v-btn>
        </v-flex>
        <v-flex xs8 v-for="item in data"  :key="item.id">
            <div class="d-flex flex-column mb-6">
              <!-- <h4 class="mb-2"><strong>{{test(1)}}</strong></h4>  -->
              <h4 class="mb-2"><strong>{{convert(item.created_at)}}</strong></h4> 
              <div class="pl-7">
                {{item.feedbackscol}}
              </div> 
            </div>
        </v-flex>
    </v-layout>
    <div>
      <feed-back-create @submitFeedback="submitFeedback"></feed-back-create>
    </div>
  </v-container>
</template>

<script>
import feedBackCreate from "~/components/clients/createFeedback.vue";
import moment from 'moment'
export default {
  components: {
    feedBackCreate
  },
  data() {
    return {
     data : [],
    };
  },
  mounted() {
 

  this.getFeedback();
  },
  methods: {
    getFeedback() {
      this.$axios
        .get(
          `${this.$clients}/getFeedback/${this.$route.params.id}`
        )
        .then(({ data }) => {
          console.log(data);
        this.data = data;
        });
    },
    submitFeedback(){
     this.getFeedback();
    },
    convert(date){
    let currentDate = moment();
    let weekStart = currentDate.clone().startOf('week');
    let weekEnd = currentDate.clone().endOf('week');

    let formattedStart = weekStart.format('YYYY-MM-DD');
    let formattedEnd = weekEnd.format('YYYY-MM-DD');

    var time = moment(date).format("YYYY-MM-DD h:mm:ss");
  
    if(moment(time).isBetween(formattedStart.toString(), formattedEnd.toString())){
       let date = new Date(time);
        return 'Semaine du ' + (date.getMonth() + 1) +'/'+date.getDate()
    }
    else{
      return 'Semaine derniere';
    }
   

    },

  
  },
};

</script>


<style scoped>
#wrapper-feedback{
  width:50%;
  padding: 0 16px;
  justify-content: space-between;
}
#wrapper-feedback button{
  padding: 0 30px;
  border-radius: 10px;
}
#feedback-text{
  width: 50%;
  padding: 20px 16px;

}

#wrapper_feedback{
    padding: 0px 10rem !important;
}
#wrapper-comment{
  position: fixed;
    right: 57px;
    bottom: 31px;
}


</style>

<style >
#wrapper-feedback button span.v-btn__content{
  text-transform: initial !important;
}
</style>