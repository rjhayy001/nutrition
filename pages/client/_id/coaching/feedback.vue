<template>
  <v-container grid-list-md fluid>
    <div v-if="loads==true">
      <v-layout row wrap>
        <v-flex xs12 class="mb-4">
          <div class="d-flex align-center py-2 data-table-cus">
            <p class="title mr-1">
              Historique des feedback
            </p>
            <v-spacer></v-spacer>
            <div style="width: 200px;" id="types">
              <v-select
                :items="filter_type"
                placeholder="Filter by type"
                v-model="f_type"
                filled
                solo
                dense
                rounded
                hide-details="true"
                @change="searchList"
              ></v-select>
            </div>
          </div>
          <hr />
        </v-flex>
      </v-layout>
      <v-layout row wrap id="wrapper_feedback">
        <v-flex xs7 v-if="data.length != 0" id="cont-wrapper">
          <div
            v-for="(items, index) in data"
            :key="index"
          style="width:90%">
              <p class="title mb-2 font-weight-medium">{{weeklyFormat(getDateByWeekNumber(index))}}</p>
            <!-- <div class="mb-3 font-weight-bold">{{weeklyFormat(getDateByWeekNumber(index))}}</div> -->
            <div v-for="(item, key) in items" :key="item.id" class=" feedback-holder pa-2">
            <!-- <div
              v-for="item in items"
              :key="item.id+'test'"
              class=" feedback-holder pa-2"
            > -->
              <v-card class="pt-2" @mouseover="onHover(item.id)" @mouseleave="hover = ''" :class="hover==item.id?'onHover':''">
                <div class="float-right" id="actions"  v-if="hover==item.id">
                  <v-icon @click="ediFeedback(item)" color="green" size="20">mdi-pencil</v-icon>
                  <v-icon @click="showDeleteDialog(item.id)" color="red" size="20">mdi-delete</v-icon>
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
        <v-flex xs7 v-else>
          <div class="pa-2 mt-50 _nofeedback">
            <empty/>
          </div>
        </v-flex>
        <v-flex xs4 v-if="feedbackCount.length != 0" id="cont-wrapper">
          <v-layout row wrap class="clients-statistics-wrapper">
            <v-flex xs10>
              <p class="title mb-2 font-weight-medium">Feedback Summary</p>
            </v-flex>
            <v-flex xs10 class="ml-4" v-for="(count, keys) in feedbackCount" :key="keys">
              <v-card class="mb-2"  @mouseover="onHover2(keys)" @mouseleave="hover2 = null">
                <v-card-text>
                  <div class="float-right" id="actions"  v-if="hover2 == keys">
                      <v-icon @click="filter(count.feedback_type)" color="green" size="20">mdi-eye</v-icon>
                    </div>
                  <span class="display-1 text--primary">
                    <span>{{count.total}}</span>
                  </span><br />
                  <span class="subtitle-1">Total From {{count.feedback_type}}</span>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <div>
        <!-- <feed-back-create @submitFeedback="submitFeedback"></feed-back-create> -->
        <feed-back-form :payloads="editdata" :feedback_type="type"></feed-back-form>
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
    </div>
    <div v-else>
      <loading/>
    </div>
  </v-container>
</template>
<script>
import emptyData from "~/components/error/empty_data.vue"
import feedBackCreate from "~/components/clients/createFeedback.vue";
import feedBackForm from "~/components/clients/coaching/feedback/form.vue"
import empty from '@/components/error/empty_data.vue'
import loading from '@/components/loader/default_loader.vue'
import moment from 'moment'
export default {
  components: {
    feedBackCreate,
    feedBackForm,
    emptyData,
    empty,
    loading
  },
  data () {
    return {
      data: [],
      hover:'',
      hover2:'',
      class:'',
      loads:false,
      deletedialog:false,
      deleteId:'',
      feedbackCount:[],
      f_type:'all',
      editdata:{},
      type:'feedback',
      filter_type: ['all','global', 'formulaire', 'measures', 'tracking','photos','feedback'],
    };
  },
  mounted () {
    this.getFeedback();
    this.getFeedbackCount();
    console.log( this.$store)
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
          `feedback/getFeedback/${this.$route.params.id}`
        )
        .then(({ data }) => {
          this.data = data;
          this.loads = true;
          this.getFeedbackCount();
        });
    },
    getFeedbackCount () {
      this.$axios
        .get(
          `feedback/getFeedbackCount/${this.$route.params.id}`
        )
        .then(({ data }) => {
         this.feedbackCount = data;
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
    onHover2(index){
     this.hover2 = index;
    },
    showDeleteDialog(id){
        this.deleteId = id;
        this.deletedialog = true;
    },
    deleteSingleFeecback(){
       this.$axios
        .delete(
          `feedback/deleteFeedback/`+this.deleteId
        )
        .then(({ data }) => {
        if(this.f_type != 'all' && this.f_type != ''){
          this.searchList();
        }
        else{
          this.getFeedback();
        }
        this.deletedialog = false;
        this.getFeedbackCount();
        this.successfeedbackNotification('delete')
        });
    },
    ediFeedback(item){
        this.editdata = item;
    },
    filter(item){
        this.f_type = item;
        this.searchList()
    },
    searchList(){
      if(this.f_type == 'all' || this.f_type == null){
        this.getFeedback();
        return;
      }
      this.$axios
        .get(`feedback/filterFeedback/`+this.f_type
        )
        .then(({ data }) => {
          this.data = data;
        });
    }
  },
};
</script>
<style scoped>
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
#wrapper_feedback .xs4{
  padding: 0 50px;
  border-left: solid 1px #c2c2c2;
}
#wrapper_feedback{
  justify-content: space-between !important;
}
#cont-wrapper{
  max-height: 740px !important;
  overflow: hidden !important;
}
#cont-wrapper:hover{
  overflow: auto !important;
}
/* width */
#cont-wrapper::-webkit-scrollbar {
  width: 15px;
}

/* Track */
#cont-wrapper::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
#cont-wrapper::-webkit-scrollbar-thumb {
  background: rgb(195, 195, 204);
  border-radius: 10px;
}

</style>
