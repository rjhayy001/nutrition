<template>
  <div>
    <v-container>
      <v-row v-if="!loading">
        <v-flex xs8 class="px-2">
          <v-card min-height="250" class="pa-4">
            <div class="d-flex mb-2 list-holder" v-for="(list, index) of lists" :key="index">
              <div class="type-title mr-5 overline" style="width:40% !important;">
                {{ list.text }} :
              </div>
              <div class="font-weight-bold overline type-value">
                {{ sleeps ? sleeps[list.value] : 'not specified'}}
              </div>
            </div>
          </v-card>
        </v-flex>
        <v-flex xs4 class="px-2">
          <v-card min-height="500">
            <!-- <v-toolbar dense flat>
              <v-toolbar-title class="text-uppercase font-weight-medium" style="font-size:17px;">for women only
              </v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <div class="px-4 pb-5 pt-2">
              <div class="d-flex mb-2" v-for="(women_list, index) of women_lists" :key="index + 'women_list'">
                <div class="type-title mr-5 overline">
                  {{ women_list.text }} :
                </div>
                <div class="font-weight-bold overline type-value">
                  {{ 'not specified' }}
                </div>
              </div>
            </div> -->
            <empty-data></empty-data>
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
  data() {
    return {
      loading: true,
       client:{},
      sleeps:{},
      lists: [

        {
          text: 'hours',
          value: 'hours'
        },
        {
          text: 'wake up feelings',
          value: 'wake_up_feelings'
        },
        {
          text: 'sleeping supplements',
          value: 'sleeping_supplements'
        },
        {
          text: 'wake up at night',
          value: 'wake_up_at_night'
        },
        {
          text: 'trouble sleeping',
          value: 'trouble_sleeping'
        },
        {
          text: 'bed gadget',
          value: 'bed_gadget'
        },
        {
          text: 'regular times bed',
          value: 'regular_times_bed'
        },
        {
          text: 'regular hours wake up',
          value: 'regular_hours_wake_up'
        },
        {
          text: 'daylight exposure',
          value: 'daylight_exposure'
        },
      ],
      women_lists: [
        {
          text: 'contraception',
          value: 'contraception'
        },
        {
          text: 'premenstrual syndrome',
          value: 'premenstrual_syndrome'
        },
        {
          text: 'gynaecological condition',
          value: 'gynaecological_condition'
        },
        {
          text: 'observe menstrual cycle',
          value: 'observe_menstrual_cycle'
        },
        {
          text: 'regular cycle',
          value: 'regular_cycle'
        },
        {
          text: 'cycle average',
          value: 'cycle_average'
        },
        {
          text: 'pregnant',
          value: 'pregnant'
        },

      ]
    }
  },
  mounted() {
    this.initalize()
  },
  methods: {
    initalize() {
      this.loading = true
      this.$axios
          .get(
          `${this.$clients}/${this.$route.params.id}/edit?relations=activeSubscription.sleep`
        )
        .then(({ data }) => {
          this.client = data;
          this.sleeps = data.active_subscription ? data.active_subscription[0].sleep : {}
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

