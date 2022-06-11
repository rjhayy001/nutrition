<template>
  <div>
    <viewAnnounce :selectedItem="selectedItem" />
  </div>
</template>
<script>
import viewAnnounce from "@/components/announcement/view.vue";
export default {
  components: {
    viewAnnounce
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
      console.log(this.selectedItem,"caca");
      this.$axios.get(`${this.$announces}/${this.$route.params.id}/view?relations=clients,coaches`).then(({ data }) => {
        this.selectedItem = data;
      });
    },
    // updateRecord(payload) {
    //   this.update().then(() => {
    //     if (payload.city_id) payload.city_id = payload.city_id.id || '';
    //     if (payload.country_id) payload.country_id = payload.country_id.id || '';
    //     if (payload.zipcode_id) payload.zipcode_id = payload.zipcode_id.id || '';

    //     this.$axios.put(`${this.$coaches}/${payload.id}`, payload).then(({ data }) => {
    //       this.successNotification(data,"updated","coach","coaches","first_name");
    //       this.goTo("settings-coaches-id");
    //     });
    //   })
    // },
  },
};
</script>

