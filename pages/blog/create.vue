<template>
  <div>
    <form-page @addRecord="add"></form-page>
  </div>
</template>
<script>
import formPage from "~/components/blogs/form.vue";
export default {
  components: {
    formPage,
  },
  methods: {
    add(payload) {
      this.$axios.post(`${this.$blogs}`, payload).then(({ data }) => {
      });
      this.goTo("blog");
      this.successNotification(
        payload,
      );
    },
  },
};
</script>
