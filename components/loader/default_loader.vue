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
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>
