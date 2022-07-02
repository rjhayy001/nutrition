<template>
  <div>
    <article-form :selectedItem="selectedItem" @updateRecord="updateRecord"></article-form>
  </div>
</template>
<script>
import articleForm from "~/components/blog/article_form.vue";
export default {
  components: {
    articleForm,
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
      this.$axios.get(`${this.$blogs}/${this.$route.params.id}/edit?relations=links,category`).then(({ data }) => {
        data.category_id = data.category
          data.coach_name = data.coach.full_name
          data.category_id = data.category_id.id
          this.selectedItem = data;
          console.log( this.selectedItem ," this.selectedItem ")
        });
    },
    updateRecord(payload) {
      this.update().then(() => {
        this.$axios.put(`${this.$blogs}/${payload.id}`, payload).then(({data}) => {
          this.goTo("blog");
          this.successNotification(data, 'updated', 'blog', 'blogs', 'title')
        })
      })
    },
  },
};
</script>
