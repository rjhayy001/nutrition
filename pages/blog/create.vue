<template>
  <div>
    <form-page @addRecord="add"></form-page>
  </div>
</template>
<script>
import formPage from "~/components/blog/form.vue";
export default {
  components:{
    formPage
  }

}
</script>
