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
          :picker-date.sync="pickerDate"
        ></v-date-picker>
        <v-card
          class="mt-8 pb-4"
          style="overflow:auto;"
          min-height="220"
          flat
        >

          <v-data-table
            :items="items"
            :headers="headers"
            hide-default-footer
            hide-default-header
            :items-per-page="-1"
            class="elevation-1 stripe-table"
          >
            <template v-slot:item.action="{ item }">
              <v-tooltip left>
                <template v-slot:activator="{ on}">
                  <v-icon v-on="on" @click="cancelCall(item)">
                    mdi-close-circle
                  </v-icon>
                </template>
                <span>Cancel Call</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      picker: '',
      pickerDate: null,
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
      items: [
        { name: 'Travis Howard', time: '9:00' },
        { name: 'Travis Howard', time: '9:00' },
        { name: 'Travis Howard', time: '9:00' },
        { name: 'Travis Howard', time: '9:00' },

      ],
    }
  },
  watch: {
    pickerDate (newval,oldval) {
      console.log(newval, oldval);
    },
  },
  methods:{
    cancelCall(item){
      alert('Call Canceled for '+ item.name)
    }
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
