<script>
export default {
  data() {
    return {
      queryParams:[]
    }
  },
  mounted() {

  },
  methods : {
    urlQuery() {
      return new URLSearchParams(window.location.search)
    },
    filterBy(value) {
      let filters = ''
      if (this.$route.query.filters) {
        let currentFilters = this.$route.query.filters.split(',')
        let untouchedFilters = ''

        currentFilters.forEach(filter => {
          let currentFilter = filter.split('=')
          if (currentFilter[0] != value.value) {
            if (untouchedFilters) {
              untouchedFilters = `${untouchedFilters},${currentFilter.join('=')}`
            } else {
              untouchedFilters = `${currentFilter.join('=')}`
            }
          }
        });

        filters = `${untouchedFilters},${value.value}=${value.filterValue}`
      } else {
        filters = `${value.value}=${value.filterValue}`
      }
      
      if (filters) {
        this.goTo(this.$route.name, {filters:filters})
      } else {
        this.goTo(this.$route.name)
      }
      setTimeout(()=> {
        this.initialize()
      }, 100)
    },
    updatePagenum(page_num) {
      let queries = JSON.parse(JSON.stringify(this.$route.query));
      queries.page = page_num
      this.$router.replace({ query: queries });
      setTimeout(()=> {
        this.initialize()
      }, 100)
    },
    searchRecords(keyword) {
      let queries = JSON.parse(JSON.stringify(this.$route.query));
      queries.find = keyword
      this.$router.replace({ query: queries });
      setTimeout(()=> {
        this.initialize()
      }, 100)
    }
  }
}
</script>