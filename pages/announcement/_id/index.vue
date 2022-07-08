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
      this.$axios.get(`${this.$announces}/${this.$route.params.id}/view?relations=clients,coaches`).then(({ data }) => {
        this.selectedItem = data;
      });
    },
  },
};
</script>

