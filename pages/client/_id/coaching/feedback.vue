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
          <!-- <v-btn
          depressed
          rounded
        >
          Faire un feedback
        </v-btn> -->
        </div>
        <hr />
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
      id="wrapper_feedback"
    >
      <v-flex xs8 v-if="data.length">
        <div
          v-for="(items, index) in data"
          :key="index"
        >
          <div class="mb-3 font-weight-bold">{{weeklyFormat(getDateByWeekNumber(index))}}</div>
          <div
            v-for="item in items"
            :key="item.id+'test'"
            class=" feedback-holder pa-2"
          >
            <v-card class="pt-2">
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
      <v-flex xs12 v-else>
          <empty-data></empty-data>
      </v-flex>
      <!-- <v-flex xs4>
        asdsa
      </v-flex> -->
    </v-layout>
    <div>
      <!-- <feed-back-create @submitFeedback="submitFeedback"></feed-back-create> -->
      <feed-back-form></feed-back-form>
    </div>
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
          console.log(data, 'test');
          this.data = data;
        });
    },
    submitFeedback () {
      this.getFeedback();
    },
    convert (date) {
      let currentDate = moment();
      let weekStart = currentDate.clone().startOf('week');
      let weekEnd = currentDate.clone().endOf('week');

      let formattedStart = weekStart.format('YYYY-MM-DD');
      let formattedEnd = weekEnd.format('YYYY-MM-DD');

      var time = moment(date).format("YYYY-MM-DD h:mm:ss");

      if (moment(time).isBetween(formattedStart.toString(), formattedEnd.toString())) {
        let date = new Date(time);
        return 'Semaine du ' + (date.getMonth() + 1) + '/' + date.getDate()
      }
      else {
        return 'Semaine derniere';
      }
    },
    getDateByWeekNumber (week_number) {
      return moment().day("Monday").week(week_number).add(7, 'days');
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
</style>

<style >
#wrapper-feedback button span.v-btn__content {
  text-transform: initial !important;
}
</style>
