<template>
  <div>
    <form-page :selectedItem="selectedItem" @updateRecord="updateRecord"></form-page>
  </div>
</template>
<script>
import formPage from "~/components/clients/form.vue";
export default {
  components: {
    formPage,
  },
  data() {
    return {
      selectedItem: {},
      client: true,
    };
  },
  mounted() {
    this.findRecord();
  },
  methods: {
    findRecord() {
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
        });
    },
    updateRecord(payload) {
      this.update().then(() => {
        if (payload.city_id) payload.city_id = payload.city_id.id || '';
        if (payload.country_id) payload.country_id = payload.country_id.id || '';
        if (payload.zipcode_id) payload.zipcode_id = payload.zipcode_id.id || '';

        this.$axios.put(`${this.$clients}/${payload.id}`, payload).then(({ data }) => {
          this.successNotification(data,"updated","client","clients","first_name");
          this.goTo("settings-clients-id");
        });
      })
    },
  },
};
</script>
