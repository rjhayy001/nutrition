<template>
  <div>
    <form-page :selectedItem="selectedItem" @updateRecord="update"></form-page>
  </div>
</template>
<script>
import formPage from "~/components/coaches/form.vue";
export default {
  components: {
    formPage,
  },
  data() {
    return {
      selectedItem: {},
    };
  },
  mounted() {
    this.findRecord();
  },
  methods: {
    findRecord() {
      this.$axios
        .get(
          `coaches/${this.$route.params.id}/edit?relations=country,city,zipcode`
        )
        .then(({ data }) => {
          data.country_id = data.country;
          data.city_id = data.city;
          data.zipcode_id = data.zipcode;
          data.tags = data.tags
          data.groups = data.groups
          this.selectedItem = data;
        });
    },
    update(payload) {
      this.$axios.put(`coaches/${payload.id}`, payload).then(({ data }) => {});
      this.goTo("settings-coaches");
      this.successNotification(
        payload,
        "updated",
        "coach",
        "coaches",
        "first_name"
      );
    },
  },
};
</script>
