<script>
export default {
  data() {
    return {
      queryParams:[],
    }
  },
  mounted() {
    this.sortPosition()
  },
  methods : {
    sortPosition(){
      let queries = JSON.parse(JSON.stringify(this.$route.query));
      if(this.$route.query.sort){
        queries = {}
        this.$router.replace({ query: queries });
        setTimeout(()=> {
          this.initialize()
        }, 100)
      }
      // let url = this.$route.fullPath.split('?')
      // if(this.$route.query.sort){
      //   window.location.replace(url[0]);
      // }
      // console.log(queries, 'ajflkajskfljsalkf')
      // let queries = JSON.parse(JSON.stringify(this.$route.query));
      // if(queries.sort){
      //   if(this.headers.length!=0){
      //     let sort = queries.sort.split(',')
      //     sort.forEach(elem => {
      //       let head = elem.split('~')
      //       head[1] == 'asc' ? head[1] = 1 : head[1] = 2
      //       let index = this.headers.findIndex(val => val.value === head[0])
      //       this.headers[index].sortType = head[1]
      //     });
      //   }
      // }
    },
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
    // updatePagenum(page_num) {
    //   let queries = JSON.parse(JSON.stringify(this.$route.query));
    //   queries.page = page_num
    //   this.$router.replace({ query: queries });
    //   setTimeout(()=> {
    //     this.initialize()
    //   }, 100)
    // },
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
    },
    // sortBy
  }
}
</script>