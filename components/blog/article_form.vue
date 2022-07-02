<template>
  <ValidationObserver ref="form">
    <v-form class="formBlog-box" @submit.prevent="saveForm">
      <v-container grid-list-md fluid>
        <view-Category
          :data="categories"
          :drawerStatus="viewCategory"
          @reload="viewAllCategory"
          @close="viewCategory = false"
        />
        <content-preview
          :contents="payload"
          :drawerStatus="preview"
          :category="categories"
          @dataLink="openLink"
          @close="preview = false"
        />
        <v-layout row wrap>
          <v-flex xs12 class="mb-2">
            <div class="d-flex align-center py-2 data-table-cus">
              <p class="title mr-1">
                {{ payload.id ? "EDIT" : "CREATE NEW" }} BLOG
              </p>
              <v-spacer></v-spacer>
              <v-btn class="mr-1" small @click="$router.go('-1')">
                <v-icon>mdi-arrow-left</v-icon>
                BACK
              </v-btn>
            </div>
            <hr />
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs8 class="py-2 px-3">
            <p class="font-weight-regular pa-2">Blog Details</p>
            <v-col>
              <ValidationProvider
                slim
                name="Title"
                rules="required"
                v-slot="{ errors }"
              >
                <span>Title</span>
                <v-text-field
                  dense
                  outlined
                  placeholder="Title"
                  v-model="payload.title"
                  :error-messages="errors"
                />
              </ValidationProvider>
              <span>Author</span>
              <v-text-field
                dense
                outlined
                placeholder="Author"
                v-model="payload.coach_name"
              />
              <span>Summary</span>
              <v-text-field
                outlined
                height="80px"
                placeholder="Summary"
                v-model="payload.summary"
              />
              <span>Contents</span>
              <vue-editor class="content-editor" v-model="payload.content" />
            </v-col>
          </v-flex>
          <v-flex xs4 class="py-0 px-0">
            <v-col>
              <p class="font-weight-regular">Image</p>
              <p class="thin_text font-weight-thin">Main post image</p>
              <p class="back_btn">
                <v-btn 
                  icon 
                  dense 
                  small 
                  ref="close_btn"
                  @click="replaceImage" 
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </p>
              <div class="uploader">
                <div class="image-box">
                  <div class="mb-2">
                    <v-img
                      height="29.5vh"
                      v-if="payload.image"
                      class="my-0 mx-auto headerimage"
                      :src="payload.image || ''"
                    ></v-img>
                    <div class="image-container">
                      <div v-show="!payload.image">
                        <v-icon x-large> mdi-image </v-icon>
                      </div>
                    </div>
                  </div>
                  <v-btn
                    small
                    outlined
                    color="success"
                    class="upload_image"
                    @click="handleFileImport"
                  >
                    <v-icon>mdi-upload-outline</v-icon>
                    upload photo
                  </v-btn>
                  <input
                    type="file"
                    ref="uploader"
                    class="d-none"
                    @change="onFileChange"
                    accept="image/png, image/gif, image/jpeg"
                  />
                </div>
              </div>
              <div class="mt-12">
                <div class="mb-5">
                  <div class="d-flex mb-1">
                    <p class="sub_options">Category</p>
                    <v-spacer></v-spacer>
                    <v-btn
                      x-small
                      outlined
                      class="_button font-weight-regular"
                      @click.stop="viewCategory = !viewCategory"
                    >
                      View
                    </v-btn>
                  </div>
                  <ValidationProvider
                    slim
                    name="Category"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-select
                      dense
                      outlined
                      item-value="id"
                      item-text="name"
                      :items="categories"
                      hide-details="auto"
                      :error-messages="errors"
                      v-model="payload.category_id"
                    ></v-select>
                  </ValidationProvider>
                </div>
                <div>
                  <div class="d-flex mb-1">
                    <p class="sub_options">Related Articles</p>
                  </div>
                  <v-text-field
                    flat
                    dense
                    outlined
                    label="Title"
                    v-model="title"
                  />
                  <v-text-field
                    flat
                    dense
                    outlined
                    label="Link"
                    v-model="related_links"
                  />
                  <div class="text-right mb-2 blog-relative">
                    <v-btn
                      x-small
                      outlined
                      class="addbloglink"
                      @click="addLinks()"
                    >
                      Add Link
                    </v-btn>
                  </div>
                  <div class="uploader uploaderLink">
                    <div 
                      :key="item.id"
                      class="d-flex linkBlog"
                      v-for="item in payload.links" 
                    >
                      <p class="link-primary" @click="openLink(item)">
                        <v-icon>mdi-circle-small</v-icon>
                        {{item.title}}
                      </p>
                      <v-btn
                        icon
                        x-small
                        class="ml-2 hide"
                      >
                        <v-icon class="text-danger" @click="deleteLink(item)">mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-flex>
          <div class="d-flex ms-auto">
            <v-btn color="primary mr-2" @click="preview = true">
              Blog Preview
            </v-btn>
            <v-btn class="success" type="submit">
              <v-icon>mdi-content-save-outline</v-icon>
              {{ payload.id ? "update" : "save" }}
            </v-btn>
          </div>
        </v-layout>
      </v-container>
    </v-form>
  </ValidationObserver>
</template>
<script>
import { VueEditor } from "vue2-editor";
import default_HeaderImage from "@/static/images/default_nutrition.jpg";
import contentPreview from "~/components/blog/content_preview.vue";
import viewCategory from "~/pages/blog/category";
import tableHelper from "~/mixins/tableHelper.vue";
import arrayHelper from "@/mixins/arrayHelper.vue";
export default {
  components: {
    VueEditor,
    contentPreview,
    viewCategory,
  },
  mixins: [tableHelper, arrayHelper],
  data() {
    return {
      payload: {
        title: "",
        coach_id: this.$auth.user.id,
        coach_name: this.$auth.user.full_name,
        summary: "",
        content: "",
        image: "",
        category_id: 1,
        category: null,
        languages: "",
        links: []
      },
      default_HeaderImage,
      originalPayload: {},
      categories: [],
      languages: ["French", "English"],
      viewCategory: false,
      preview: false,
      related_links:'',
      title:''
    };
  },
  props: {
    drawerStatus: {
      type: Boolean,
      default: () => false,
    },
    selectedItem: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    drawerStatus: {
      handler(val) {
        console.log(val, "status");
      },
    },
    tagsSelected: {
      handler(val) {
        this.tagsSelected = val;
      },
    },
    selectedItem: {
      handler(val) {
        if (!this.originalPayload) {
          this.originalPayload = this.cloneVariable(this.payload);
        }
        if (!val) return;
        this.payload = this.cloneVariable(val);
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.viewAllCategory();
  },
  methods: {
    saveForm() {
      console.log(this.payload,"payload")
      this.$refs.form.validate().then((result) => {
        if (!result) return;
        if (this.payload.id) {
          this.$emit("updateRecord", this.payload);
        } else {
          this.$emit("addRecord",this.payload);
        }
      });
    },
    replaceImage() {
      this.payload.image = "";
    },
    handleFileImport() {
      window.addEventListener("focus", () => {}, { once: true });
      this.$refs.uploader.click();
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.createImg(files[0]);
    },
    createImg(file) {
      var image = new Image();
      var reader = new FileReader();
      reader.onload = (e) => {
        this.payload.image = e.target.result;
      };
      if(file) {
        reader.readAsDataURL(file);
      }
    },
    viewAllCategory() {
      this.$axios.get(`${this.$category}?${this.urlQuery()}`).then(({ data }) => {
        this.categories = data.data
      })
    },
    addLinks() {
      let prep = {
        title: this.title,
        link: this.related_links,
      }
      if(this.related_links){
        this.payload.links.push(prep)
        this.related_links=""
        this.title=""
      }
      console.log(this.payload.links)
    },
    deleteLink(items) {
      this.$axios.delete(`${this.$bloglinks}/${items.id}`).then(({ data }) => {
        this.$arraysplicer(items, this.payload.links)
        this.successNotification(items, "deleted", "link", "links", "title");
      });
    },
    openLink(item) {
      window.open(item.link,'_blank');
    }
  },
};
</script>