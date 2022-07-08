<template>
  <div>
    <article-form @addRecord="add"></article-form>
  </div>
</template>
<script>
import articleForm from "~/components/blog/article_form.vue";
export default {
  components:{
    articleForm
  },
  methods: {
    add(payload) {
      this.$axios.post(`${this.$blogs}`, payload).then(({ data }) => {
        this.goTo("blog");
        this.successNotification(data, 'create', 'blog', 'blogs', 'title')
      });
    },
  },
}
</script>