<template>
  <v-container
    grid-list-md
    fluid
  >
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        class="mb-4"
      >
        <div class="d-flex align-center py-2 data-table-cus">
          <p class="title mr-1">
            Historique des feedback
          </p>
          <v-spacer></v-spacer>
        </div>
        <hr />
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
      id="wrapper_feedback"
    >
      <v-flex xs8 v-if="data.length != 0">
        <div
          v-for="(items, index) in data"
          :key="index"
        >
          <div class="mb-3 font-weight-bold">{{weeklyFormat(getDateByWeekNumber(index))}}</div>
          <div v-for="(item, key) in items" :key="item.id" class=" feedback-holder pa-2">
          <!-- <div
            v-for="item in items"
            :key="item.id+'test'"
            class=" feedback-holder pa-2"
          > -->
            <v-card class="pt-2" @mouseover="onHover(item.id)" @mouseleave="hover = ''" :class="hover==item.id?'onHover':''">
              <div class="float-right" id="actions"  v-if="hover==item.id">
                <v-icon @click="ediFeedback(item)" color="green">mdi-pencil</v-icon>
                <v-icon @click="showDeleteDialog(item.id)" color="red">mdi-delete</v-icon>
              </div>
              <div class="feedback-text text-lowercase ml-4 overline"
               style="font-size:15px !important;"
               >
                {{item.feedbackscol}}
              </div>
              <div
                class=" overline grey--text ml-4"
                style="font-size:10px !important;"
              >
                <p>{{frFormat(item.created_at)}}</p>
              </div>
            </v-card>
          </div>
        </div>
      </v-flex>
      <div class="pa-2 mt-50 _nofeedback" v-else>
          <v-icon class="mx-2" style="font-size: 100px;">mdi-alert</v-icon>
          <p class="title mr-1">
            No feedback
          </p>
      </div>
      <!-- <v-flex xs4>
        asdsa
      </v-flex> -->
    </v-layout>
    <div>
      <!-- <feed-back-create @submitFeedback="submitFeedback"></feed-back-create> -->
      <feed-back-form :payloads="editdata"></feed-back-form>
    </div>

    <v-dialog
        v-model="deletedialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title class="font-weight-light">
            Delete Confirmation
          </v-card-title>
          <v-card-text>
            <div class="my-5">
              <p class="font-weight-light" style="color:#000;font-size: 17px;">
               Are you sure to delete this feedback?
              </p>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              color="green"
              text
              @click="deletedialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="red"
              text
              @click="deleteSingleFeecback()"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import emptyData from "~/components/error/empty_data.vue"
import feedBackCreate from "~/components/clients/createFeedback.vue";
import feedBackForm from "~/components/clients/coaching/feedback/form.vue"
import moment from 'moment'
export default {
  components: {
    feedBackCreate,
    feedBackForm,
    emptyData
  },
  data () {
    return {
      data: [],
      hover:'',
      class:'',
      deletedialog:false,
      deleteId:'',
      editdata:{},
    };
  },
  mounted () {
    this.getFeedback();
  },
  computed: {
    flag () {
      return this.$store.getters.feedbackFlag
    }
  },
  watch: {
    flag (val) {
      if (val) {
        this.getFeedback();
        this.$store.commit('updateFeedbackFlag', false)
      }
    },
  },
  methods: {
    getFeedback () {
      this.$axios
        .get(
          `${this.$clients}/getFeedback/${this.$route.params.id}`
        )
        .then(({ data }) => {
          console.log(data);
          this.data = data;
        });
    },
    submitFeedback () {
      this.getFeedback();
    },
    getDateByWeekNumber (week_number) {
      var number = week_number.split('/')
      return moment().day("Monday").week(number[1]).add(7, 'days');
    },
    onHover(index){
     this.hover = index;
    },
    showDeleteDialog(id){
        this.deleteId = id;
        this.deletedialog = true;
    },
    deleteSingleFeecback(){
       this.$axios
        .delete(
          `${this.$clients}/deleteFeedback/`+this.deleteId
        )
        .then(({ data }) => {
         this.getFeedback();
         this.deletedialog = false;
        });
    },
    ediFeedback(item){
        this.editdata = item;
    }
  },
};

</script>


<style scoped>
/* .feedback-holder:hover .feedback-text {
} */
#wrapper-feedback {
  width: 50%;
  padding: 0 16px;
  justify-content: space-between;
}
#wrapper-feedback button {
  padding: 0 30px;
  border-radius: 10px;
}
#feedback-text {
  width: 50%;
  padding: 20px 16px;
}

/* #wrapper_feedback{
    padding: 0px 10rem !important;
} */
#wrapper-comment {
  position: fixed;
  right: 57px;
  bottom: 31px;
}
._nofeedback{
  width: 100%;
  text-align: center;
  margin-top: 18%;
}
.onHover{
  transform: scale(1.004);
}
</style>

<style >
#wrapper-feedback button span.v-btn__content {
  text-transform: initial !important;
}
#actions button:hover{
  transform: scale(1.1);
}
</style>
