<script>
export default {
  methods: {
    formatDate(date) {
      return this.$moment(date).format('Do MMM YYYY hh:mm:ss')
    }
  }
}
</script>