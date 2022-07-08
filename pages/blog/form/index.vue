<template>
  <div>
    <form-page 
      @article_form="article_form"
      @trivia_form="trivia_form"
    ></form-page>
  </div>
</template>
<script>
import formPage from "~/components/blog/form.vue";
export default {
  components:{
    formPage,
  },
  methods: {
    article_form() {
      this.goTo('blog-form-article_form')
    },
    trivia_form() {
      this.goTo('blog-form-trivia_form')
    }
  }
}
</script>
