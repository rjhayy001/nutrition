<template>
  <v-navigation-drawer
    temporary
    right
    fixed
    v-model="drawer"
    width="50%"
    hide-overlay
  >
  <div class="previewBlog pa-5">
    <div class="header_previewImage">
      <v-img height="200px" v-if="contents.image.length" :src="contents.image"></v-img>
      <v-img height="200px" v-else src="https://foodandhealth.com/blog/wp-content/uploads/2012/12/Screen-shot-2012-12-10-at-9.01.00-AM.png"></v-img>
      <div class="header_category-name">
        {{selected_category.name}}
      </div>
    </div>
    <div class="content">
      <h3> {{ contents.title }} </h3>
      <p> {{ contents.coach_name }} </p>
      <p> {{ current }} </p>
      <p> {{ contents.summary }} </p>
      <div class="content-data" v-html="contents.content"></div>
    </div>
    <div class="mt-6" v-if="contents.links.length">
      <hr>
      <div class="font-weight-bold">
        Related Articles
      </div>
      <div>
        <p 
          v-for="item in contents.links" 
          :key="item.id" 
          @click="viewLink(item)"
          class="link-primary"
        >
          <v-icon>mdi-circle-small</v-icon>
          {{item.title}}
        </p>
      </div>
    </div>
  </div>
  </v-navigation-drawer>
</template>
<script>
import default_HeaderImage from "@/static/images/default_nutrition.jpg";
import moment from 'moment'
export default {
  data() {
    return {
      default_HeaderImage,
      drawer:false, 
      current: moment().format('MM/DD/YY'),
      selected_category:{

      }
    }
  },

  props:{
    contents:{
      type: Object,
      default:() => {}
    },
    category:{
      type: Array,
      default:() => {}
    },
    drawerStatus: {
      type:Boolean,
      default: () => false
    },
  },
  methods: {
    viewLink(item) {
      this.$emit("dataLink", item)
    },
    getCategory() {
      this.selected_category = this.category.find(cat => cat.id == this.contents.category_id)
    }
  },
  watch: {
    drawerStatus(val) {
      if(val) 
      {
        this.drawer = val
        this.getCategory()
      }
    },
    drawer: {
      handler(val) {
        console.log(val,"drawer")
        this.$emit("close");
      }
    },
    category: {
      handler(val) {
        console.log(val,"categoriresd")
      }
    }
  }
}
</script>
