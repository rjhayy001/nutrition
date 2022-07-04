<script>
export default {
  methods: {
    formatDate(date) {
      return this.$moment(date).format('Do MMM YYYY hh:mm:ss')
    },
    frFormat(date){
      return this.$moment(date).format('ddd, DD MMM YYYY hh:mm:ss')
    },
    defaultDate(date){
      return this.$moment(date).format('DD MMM YYYY')
    },
    weeklyFormat(date){
      if(this.currentWeek(date)){
        return 'Semaine en cours';
      }
      if(this.lastWeek(date)){
       return 'Semaine derniere';
      }
       return "Semaine Du " + this.$moment(date).format('DD/MM')
    },
    currentWeek(date){
      return this.$moment(date).isSame(new Date(), 'week')
    },
    // onWeek(date){
    //   return this.$moment(date).isSame(new Date(), 'week')
    // }
    lastWeek(date){
      var d = new Date();
      var weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return this.$moment(date).isSame(weekAgo.toLocaleString(), 'week')

    }
  }
}
</script>
