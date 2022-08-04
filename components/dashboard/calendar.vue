<template>
  <div>
    <div class="mt-5 ml-5">
      <v-row>
        <v-flex
          class="px-5"
          xs4
        >
          <v-card
            class=""
            height="80"
          >
            <div class="text-center">
              <h2 class="font-weight-bold pt-1">4</h2>
              <div class="overline card-sub">appels count today</div>
            </div>
          </v-card>
        </v-flex>
        <v-flex
          class="px-5"
          xs4
        >
          <v-card
            class=""
            height="80"
          >
            <div class="text-center">
              <h2 class="font-weight-bold pt-1">4</h2>
              <div class="overline card-sub">feedback en attente</div>
            </div>
          </v-card>
        </v-flex>
        <v-flex
          class="px-5"
          xs4
        >
          <v-card
            class=""
            height="80"
          >
            <div class="text-center">
              <h2 class="font-weight-bold pt-1">4</h2>
              <div class="overline card-sub">prise de contact</div>
            </div>
          </v-card>
        </v-flex>
      </v-row>
    </div>
    <div class="mt-8 ml-4">
      <v-card
        height="590"
        class="text-center pt-8"
      >
        <v-date-picker
          no-title
          class="datePicker"
          small
          v-model="picker"
          color="primary"
          elevation="8"
          :min="mindate"
          :picker-date.sync="pickerDate"
          :events="arrayEvents"
          @change="getDateAppoint"
        ></v-date-picker>
        <v-card
          class="mt-8 pb-4"
          style="overflow:auto;height: 235px;"
          min-height="220"
          flat
        >
          <v-toolbar flat style="position:sticky; top: 0px; z-index: 999">
            <v-toolbar-title class="overline" >
              appointment
            </v-toolbar-title>
          </v-toolbar>
          <v-data-table
            :items="items"
            :headers="headers"
            hide-default-footer
            hide-default-header
            :items-per-page="-1"
            class="elevation-1 stripe-table"
            :loading="loader"
            loading-text="Loading... Please wait"
          >
            <template v-slot:item.name="{ item }">
              <template>
                  {{item.information.full_name}}
              </template>
            </template>
            <template v-slot:item.time="{ item }">
              <template>
                  {{item.time}}
              </template>
            </template>
            <template v-slot:item.action="{ item }">
              <v-tooltip left>
                <template v-slot:activator="{ on}">
                  <v-icon v-on="on" @click.stop="cancelCall(item)">
                    mdi-close-circle
                  </v-icon>
                </template>
                <span>Cancel Call</span>
              </v-tooltip>
            </template>
          </v-data-table>
          <!-- <empty-data v-else></empty-data> -->
        </v-card>
      </v-card>
    </div>

       <v-dialog
          v-model="confirmDelete"
          max-width="500px"
        >
          <v-card>
            <v-card-title class="font-weight-light">
              Delete Confirmation
            </v-card-title>
            <v-card-text>
              <div class="my-5">
                <p class="font-weight-light" style="color:#000;font-size: 17px;">
                  Are you sure you want to delete this call?
                </p>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                color="green"
                text
                @click="confirmDelete = false"
              >
                Close
              </v-btn>
              <v-btn
                color="red"
                text
                @click="confirmDeletecall()"
              >
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  data () {
    return {
      picker: '',
      mindate: '',
      pickerDate: null,
      loader: false,
      datas: [],
      arrayEvents: [],
      confirmDelete: false,
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'time',
        },
        {
          text: 'Dessert (100g serving)',
          align: 'end',
          sortable: false,
          value: 'action',
        },
      ],
      items: [],
      // items: [
      //   { name: 'Travis Howards', time: '9:00' },
      //   { name: 'Travis Howard', time: '9:00' },
      //   { name: 'Travis Howard', time: '9:00' },
      //   { name: 'Travis Howard', time: '9:00' },
      // ],
    }
  },

  watch: {
    picker (newval,oldval) {
      console.log(newval, oldval, 'date');
    },
  },
  mounted(){
    // console.log(this.$auth.user.id)
     this.picker = moment().format('YYYY-MM-DD')
     this.mindate = moment().format('YYYY-MM-DD')
     this.getAppointment();
    //  this.getSchedule();
  },
  methods:{
    cancelCall(item){
        this.confirmDelete = true;
        this.datas = item;
    },
    confirmDeletecall(){
        this.confirmDelete = false;
        this.$axios
        .delete(
          `coachappointment/`+this.datas.id
        )
        .then(({ data }) => {
          this.successDeleteCall('Call successfully deleted')
          this.getAppointment();
        });
    },
    getAppointment(){
        this.loader = true;
        this.items = [];
        this.$axios
        .get(
          `coachappointment/getSchedule/`+this.picker
        )
        .then(({ data }) => {
          console.log(data);
          // return;
          this.items = data.data;
          this.arrayEvents = data.dateSched;
          this.loader = false;
        });
    },
    getDateAppoint(){
       this.getAppointment();
    },
    // getSchedule(){
    // this.$axios
    // .get(`coachshedule/`+`${this.$route.params.id}`)
    // .then(({ data }) => {
    //   console.log(data);
    //   // this.scheduleList = data.data;
    //   // this.disableDates = data.disableData;
    //   // this.loads=true;
    // });
    // },
  }
}
</script>
<style>
.datePicker input {
  height: 10px;
  width: 10px;
}
</style>
<style scoped>
.v-select {
  width: 400px;
}
.card-sub {
  line-height: 15px;
  opacity: 0.4;
  position: absolute;
  bottom: 7px;
}
</style>
