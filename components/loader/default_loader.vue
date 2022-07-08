<template>
  <div class="loading_image">
    <v-img :src="loaderPage"></v-img>
  </div>
</template>
<script>
import loaderPage from "static/images/run_loading.gif";
export default {

  data() {
    return {
      loaderPage
    }
  }
}

</script>
<style scoped>
.loading_image {
  position: absolute;
  top: 40%;
  left: 50%;
}
</style>
