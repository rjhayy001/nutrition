<template>
  <div>
    <form-page @addRecord="add"></form-page>
  </div>
</template>
<script>
import formPage from "~/components/coaches/form.vue";
export default {
  components: {
    formPage,
  },
  methods: {
    add(payload) {
      this.create().then(() => {
        if (payload.city_id) payload.city_id = payload.city_id.id || '';
        if (payload.country_id) payload.country_id = payload.country_id.id || '';
        if (payload.zipcode_id) payload.zipcode_id = payload.zipcode_id.id || '';
        
        this.$axios.post(`${this.$coaches}`, payload).then(({ data }) => {
          this.goTo("settings-coaches");
          this.successNotification(payload,"create","coach","coaches","first_name");
        });
      })
    },
  },
};
</script>
