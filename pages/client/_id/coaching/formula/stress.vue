<template>
  <div>
    <v-container>
      <v-row  v-if="!loading">
        <v-flex
          xs8
          class="px-2"
        >
          <v-card min-height="200" class="pa-4">
           <div class="d-flex mb-2 list-holder" v-for="(list, index) of lists" :key="index">
                <div class="type-title mr-5 overline" style="width:40% !important;">
                  {{list.text}} :
                </div>
                <div class="font-weight-bold overline type-value">
                 {{ stresses ? stresses[list.value] : $t('clients.notSpecified')}}
                </div>
              </div>
          </v-card>
        </v-flex>
        <v-flex
          xs4
          class="px-2"
        >
          <v-card min-height="500">
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
  components:{
    loader
  },
  data () {
    return {
      loading:true,
       client:{},
       stresses: {},
      lists:[
        {
          text: 'job or study',
          value: 'job_or_study'
        },
        {
          text: 'stress meter',
          value: 'stress_meter'
        },
        {
          text: 'fulfilling meter',
          value: 'fulfilling_meter'
        },
        {
          text: 'home stressed',
          value: 'home_stressed'
        },
        {
          text: 'manage stress',
          value: 'manage_stress'
        },
        {
          text: 'plan your day',
          value: 'plan_your_day'
        },
        {
          text: 'time outside per day',
          value: 'time_outside_per_day'
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
          `${this.$clients}/${this.$route.params.id}/edit?relations=activeSubscription.stress`
        )
        .then(({ data }) => {
          console.log(data, 'fooodsds')
          this.client = data;
          this.stresses = data.active_subscription ? data.active_subscription[0].stress : {}
          console.log(this.stresses)
          this.loading = false
        });

    }
  }
}
</script>
<style scoped>
.type-title{
  opacity:0.6 !important;
  width:230px !important;
  line-height: 20px !important;
    margin-top: 6px !important;
}
.type-value{
     line-height: 20px !important;
    margin-top: 6px !important;
}
.list-holder:hover{
  background: whitesmoke !important;
}
</style>
