<template>
  <v-row>
    <v-flex
      xs12
      class="pl-3 pt-3"
    >
      <p class="subtitle-2 font-weight-regular">
        <span>* {{ $t('clients.dateOfBirth') }}</span>
      </p>
    </v-flex>
    <v-flex
      xs4
      class="pl-3"
    >

      <v-select
        flat
        dense
        filled
        :items="days"
        placeholder="Please choose a month..."
        v-model="payload.day"
        @change="change()"
        :disabled="!disable"
      >
      </v-select>
    </v-flex>
    <v-flex xs4>
      <v-select
        flat
        dense
        filled
        :items="months"
        item-text="short_name"
        item-value="value"
        placeholder="Please choose a month..."
        v-model="payload.month"
        @change="change()"
        :disabled="!disable"
      ></v-select>
    </v-flex>
    <v-flex
      xs4
      class="pr-3"
    >
      <v-select
        flat
        dense
        filled
        :items="years"
        placeholder="Please choose a month..."
        v-model="payload.year"
        @change="change()"
        :disabled="!disable"
      >
      </v-select>
    </v-flex>
  </v-row>
</template>
<script>

export default {
  props: {
    birthday: {
      type: String,
    },
    disable: {
      type: Boolean
    }
  },
  data () {
    return {
      months: [
        { name: 'January', short_name: 'Jan', value: '01' },
        { name: 'February', short_name: 'Feb', value: '02' },
        { name: 'March', short_name: 'Mar', value: '03' },
        { name: 'April', short_name: 'Apr', value: '04' },
        { name: 'May', short_name: 'May', value: '05' },
        { name: 'June', short_name: 'Jun', value: '06' },
        { name: 'July', short_name: 'Jul', value: '07' },
        { name: 'August', short_name: 'Aug', value: '08' },
        { name: 'September', short_name: 'Sep', value: '09' },
        { name: 'October', short_name: 'Oct', value: '10' },
        { name: 'November', short_name: 'Nov', value: '11' },
        { name: 'December', short_name: 'Dec', value: '12' }
      ],
      days: [],
      years: [],
      payload: {
        month: '', day: '', year: ''
      },
    }
  },
  methods: {
    change () {
      var days = []
      var numOfDays = new Date(this.payload.year, this.payload.month, 0).getDate();
      for (var i = numOfDays; i >= 1; i--) {
        days.push(i)
      }
      this.days = days

      if (!this.days.includes(this.payload.day)) {
        this.payload.day = this.days[0]
      }
      let formattedBday = this.payload.year + '-' + this.payload.month + '-' + this.payload.day;
      this.$emit('birthday', formattedBday);
    },
    today () {
      console.log(this.disable)
      let date = this.birthday ? this.birthday : new Date().toISOString().slice(0, 10);;
      let stringDateToArray = date.split('-');
      this.payload.day = stringDateToArray[2];
      this.payload.month = stringDateToArray[1];
      this.payload.year = stringDateToArray[0];
      this.day(this.payload.year, this.payload.month, this.payload.day);
    },
    day (year, month, day) {
      var days = []
      var numOfDays = new Date(year, month, 0).getDate();
      for (var i = numOfDays; i >= 1; i--) {
        days.push(i)
      }
      this.days = days.reverse()
      this.payload.day = Number(day)
    },
    year () {
      var max = new Date().getFullYear()
      var min = max - 100
      var years = []

      for (var i = max; i >= min; i--) {
        years.push(i.toString())
      }
      this.years = years
    }
  },
  watch: {
    birthday: {
      handler (val) {
        this.year();
        this.today();
      }, immediate: true
    },
  },
}
</script>
