<template>
  <div>
    <v-container>
      <v-row v-if="!loading">
        <v-flex
          xs8
          class="px-2"
        >
          <v-card
            min-height="250"
            class="pa-4"
          >
            <div
              class="d-flex mb-2 list-holder"
              v-for="(list, index) of lists"
              :key="index"
            >
              <div
                class="type-title mr-5 overline"
                style="width:40% !important;"
              >
                {{list.text}} :
              </div>
              <div class="font-weight-bold overline type-value">
                {{ medical_history ? medical_history[list.value] : $t('clients.notSpecified')}}
              </div>
            </div>
          </v-card>
        </v-flex>
        <v-flex
          xs4
          class="px-2"
        >
          <v-card min-height="500">
            <v-toolbar
              dense
              flat
            >
              <v-toolbar-title
                class="text-uppercase font-weight-medium"
                style="font-size:17px;"
              >{{ $t('clients.forWomenOnly') }}</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <div class="px-4 pb-5 pt-2">
              <div
                class="d-flex mb-2"
                 v-for="(women_list, index) of women_lists"
                :key="index+'women_list'"
              >
                <div class="type-title mr-5 overline">
                  {{women_list.text}} :
                </div>
                <div class="font-weight-bold overline type-value">
                  {{ medical_history ? medical_history[women_list.value] : $t('clients.notSpecified')}}
                </div>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-row>
      <v-row v-else>
        <loader></loader>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import loader from '~/components/loader/default_loader.vue'
export default {
  components: {
    loader
  },
  data () {
    return {
      loading: true,
      client: {},
      goal:{},
      medical_history: {},
      lists: [
        {
          text: this.$t('clients.medicalHistory'),
          value: 'medical_history'
        },
        {
          text: this.$t('clients.medicalTreatment'),
          value: 'medical_treatment'
        },
        {
          text: this.$t('clients.familyMedicalHistory'),
          value: 'family_medical_history'
        },
        {
          text: this.$t('clients.eatingDisorder'),
          value: 'eating_disorder'
        },
        {
          text: this.$t('clients.eatingDisorderAge'),
          value: 'eating_disorder_age'
        },
        {
          text: this.$t('clients.eatingDisorderRemedy'),
          value: 'eating_disorder_remedy'
        },
        {
          text: 'fears',
          value: 'fears'
        },
      ],
      women_lists:[
        {
          text: 'contraception',
          value: 'contraception'
        },
        {
          text: this.$t('clients.premenstrualSendrome'),
          value: 'premenstrual_syndrome'
        },
        {
          text: this.$t('clients.gynaecologicalCondition'),
          value: 'gynaecological_condition'
        },
        {
          text: this.$t('clients.observeMenstrualCycle'),
          value: 'observe_menstrual_cycle'
        },
        {
          text: this.$t('clients.regularCycle'),
          value: 'regular_cycle'
        },
        {
          text: this.$t('clients.cycleAverage'),
          value: 'cycle_average'
        },
        {
          text: 'pregnant',
          value: 'pregnant'
        },

      ]
    }
  },
  mounted () {
    this.initalize()
  },
  methods: {
    initalize () {
      this.loading = true
      this.$axios
        .get(
          `${this.$clients}/${this.$route.params.id}/edit?relations=activeSubscription.medical_history,activeSubscription.goal`
        )
        .then(({ data }) => {
          console.log(data, 'goalss')
          this.client = data;
          this.goal = data.active_subscription ? data.active_subscription[0].goal : {}
          this.medical_history = data.active_subscription ? data.active_subscription[0].medical_history : {}
          this.loading = false
        });

    }
  }
}
</script>
<style scoped>
.type-title {
  opacity: 0.6 !important;
  width: 70% !important;
  line-height: 20px !important;
  margin-top: 6px !important;
}
.type-value {
  line-height: 20px !important;
  margin-top: 6px !important;
}
.list-holder:hover {
  background: whitesmoke !important;
}
</style>
