<template>
  <div>
    <form-page 
      v-show="loading"
      :selectedItem="selectedItem" 
      @reload="reload" 
      @updateRecord="updateRecord"
    ></form-page>
    <div v-show="!loading" style="position: relative; height: 90vh;">
      <loader-page></loader-page>
    </div>
  </div>
</template>
<script>
import formPage from "~/components/clients/form.vue";
import loaderPage from "~/components/loader/default_loader.vue";
export default {
  components: {
    formPage,
    loaderPage
  },
  data() {
    return {
      selectedItem: {},
      loading: true,
      removeLoading:0,
    };
  },
  mounted() {
    this.findRecord();
  },
  methods: {
    findRecord() {
      if(this.removeLoading==0) {
        this.loading=false
      }
      this.$axios
        .get(
          `${this.$clients}/${this.$route.params.id}/edit?relations=country,city,zipcode,taggable,groupable`
        )
        .then(({ data }) => {
          data.country_id = data.country;
          data.city_id = data.city;
          data.zipcode_id = data.zipcode;
          data.taggable = data.taggable.map((item) => item.id)
          data.groupable = data.groupable.map((item) => item.id)
          this.selectedItem = data;
          this.loading=true
        });
    },
    updateRecord(payload) {
      this.update().then(() => {
        let dataItem= this.cloneVariable(payload)

        if (dataItem.city_id) dataItem.city_id = dataItem.city_id.id || '';
        if (dataItem.country_id) dataItem.country_id = dataItem.country_id.id || '';
        if (dataItem.zipcode_id) dataItem.zipcode_id = dataItem.zipcode_id.id || '';

        this.$axios.put(`${this.$clients}/${dataItem.id}`, dataItem).then(({ data }) => {
          this.successNotification(dataItem,"updated","client","clients","first_name");
          this.removeLoading=0
          this.findRecord()
        });
      })
    },
    reload() {
      this.removeLoading=1
      this.findRecord()
    }
  },
};
</script>
