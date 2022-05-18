<script>
export default {
  data() {
    return {
      drawer: false,
      originalPayload: null,
    }
  },
  watch: {
    '$store.state.resetForm'(val) {
      if(val) {
        this.payload = this.cloneVariable(this.originalPayload)
        this.$store.commit('resetForm', false)
      }
    },
    drawerStatus(val) {
      if (val && !this.originalPayload) 
        this.originalPayload = this.cloneVariable(this.payload);
        this.drawer = val;
    },
    drawer(val) {
      if (!val) {
        if (this.payload.id)
          this.payload = this.cloneVariable(this.originalPayload);
        this.$emit("closeDrawer");
      }
    },
    selectedItem: {
      handler(val) {
        this.payload = this.cloneVariable(val);
      },
      deep: true,
    }
  }
}
</script>