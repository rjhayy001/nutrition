<template>
  <v-container fluid v-html="contents"></v-container>
  <!-- <div class="container"> <p class="ql-align-center"><strong>THE TEST</strong></p></div> -->
</template>
<script>

export default {
  props:{
    contents:{
      type: '',
      default:() => {}
    }
  }

}
</script>
