<script>
export default {
  methods: {
    formatDate(date) {
      return this.$moment(date).format('Do MMM YYYY hh:mm:ss')
    },
    frFormat(date){
      return this.$moment(date).format('ddd, DD MMM YYYY')
    },
    weeklyFormat(date){
      if(this.onWeek(date)){
        return 'Semaine derniere';
      }
       return "Semaine Du " + this.$moment(date).format('DD/MM')
    },
    onWeek(date){
      return this.$moment(date).isSame(new Date(), 'week')
    }
  }
}
</script>
