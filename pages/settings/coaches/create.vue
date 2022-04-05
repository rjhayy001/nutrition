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

      this.$axios.post(`coaches`, payload).then(({ data }) => {
      });
      this.goTo("settings-coaches");
      this.successNotification(
        payload,
        "create",
        "coach",
        "coaches",
        "first_name"
      );
    },
  },
};
</script>
