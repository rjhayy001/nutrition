<template>
  <ValidationObserver ref="form">
    <v-form class="form-box" @submit.prevent="saveForm">
      <v-container grid-list-md fluid>
        <view-Category
          :drawerStatus="viewCategory"
          @close="viewCategory=false"
          :updateData="updateData"
        />
        <view-Subcategory
          :drawerStatus="viewSubcategory"
          @close="viewSubcategory=false"
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
              <span>Title</span>
              <v-text-field
                v-model="payload.title"
                placeholder="Title"
                outlined
                dense
              >
              </v-text-field>
              <span>Slug</span>
              <v-text-field
                v-model="payload.slug"
                placeholder="Slug"
                outlined
                dense
              >
              </v-text-field>
              <span>Summary</span>
              <v-text-field
                v-model="payload.summary"
                placeholder="Summary"
                height="80px"
                outlined
              >
              </v-text-field>
              <span>Keywords</span>
              <v-text-field
                v-model="payload.keywords"
                placeholder="Keywords"
                outlined
                dense
              >
              </v-text-field>
              <span>Show right column</span>
              <v-radio-group v-model="payload.show_right_column" row>
                <v-row class="justify-center">
                  <v-radio label="Yes" value="1"></v-radio>
                  <v-radio label="No" value="0"></v-radio>
                </v-row>
              </v-radio-group>
              <span>Show only to Registered Users</span>
              <v-row class="justify-center">
                <v-checkbox
                  v-model="payload.show_to_registered_users"
                  v-bind:false-value="0"
                  v-bind:true-value="1"
                ></v-checkbox>
              </v-row>
              <span>Optional Url</span>
              <v-text-field
                v-model="payload.optional_url"
                placeholder="Optional Url"
                outlined
                dense
              >
              </v-text-field>
              <span>Contents</span>
              <vue-editor class="content-editor" v-model="payload.content" />
            </v-col>
          </v-flex>
          <v-flex xs4 class="py-0 px-0">
            <v-col>
              <p class="font-weight-regular">Image</p>
              <p class="thin_text font-weight-thin">Main post image</p>
              <p style="right: 20px; position: absolute; z-index: 1">
                <v-btn dense small @click="replaceImage" icon ref="close_btn">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </p>
              <div
                class="uploader"
                @dragenter="onDragEnter"
                @dragleave="onDragLeave"
                @dragover.prevent
                @drop="onDrop"
                :class="{ dragging: isDragging }"
              >
                <div class="file-input" v-show="!images.length">
                  <v-icon large> mdi-image-multiple </v-icon>
                  <div>
                    <input
                      hidden
                      type="file"
                      id="file"
                      @change="onInputChange"
                      multiple
                      ref="select_image"
                    />
                    <v-dialog
                      max-width="55%"
                      transition="dialog-top-transition"
                    >
                      <template v-slot:activator="{ on, slctImage }">
                        <v-btn
                          color="primary"
                          v-bind="slctImage"
                          v-on="on"
                          small
                          outlined
                          ref="activateUploaderDialog"
                        >
                          Select Image
                        </v-btn>
                      </template>
                      <v-card id="_card" class="pb-15 px-2">
                        <div class="py-3 px-3">
                          <v-layout>
                            <v-flex xs3>
                              <span> Images </span>
                            </v-flex>
                            <v-flex xs3>
                              <v-text-field
                                auto-select-first
                                v-model="searchKeyword"
                                filled
                                rounded
                                hide-details=""
                                :placeholder="`Search images`"
                                dense
                                append-icon="mdi-magnify"
                                class="shrink"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs6></v-flex>
                          </v-layout>
                        </div>
                        <v-layout>
                          <v-flex id="dialog_left" xs3 class="py-2 px-2">
                            <div
                              class="uploader_dialog_box"
                              @dragenter="onDragEnter"
                              @dragleave="onDragLeave"
                              @dragover.prevent
                              @drop="onDrop"
                              :class="{ dragging: isDragging }"
                            >
                              <v-btn
                                class="font-weight-medium"
                                color="primary"
                                outlined
                                @click="selectImage(false)"
                                small
                              >
                                Select Image
                              </v-btn>
                              <!-- <button>Select image</button> -->
                            </div>
                          </v-flex>
                          <v-flex id="dialog_left" xs9 class="py-1 px-2">
                            <v-container>
                              <v-row>
                                <v-col
                                  v-for="item in payload.uploaded_images"
                                  :key="item.url"
                                  cols="2"
                                >
                                  <v-card hover @click="selectImage(item.url)">
                                    <v-img
                                      :src="`${item.url}`"
                                      max-height="100"
                                      contain
                                    >
                                    </v-img>
                                    <span style="font-size: 12px">
                                      {{ item.name }}
                                    </span>
                                  </v-card>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-flex>
                        </v-layout>
                      </v-card>
                    </v-dialog>
                  </div>
                </div>

                <div style="width: 100%; height: 100%">
                  <div>
                    <v-img
                      :src="images"
                      :aspect-ratio="1.9"
                      content-class
                      contain
                      srcset
                      lazy-src
                    ></v-img>
                  </div>
                </div>
              </div>

              <span class="sub_options"> or Add image Url </span>
              <v-text-field
                v-model="payload.image"
                placeholder="Add Image Url"
                outlined
                dense
                @change="watchImageUrl(payload.image)"
              ></v-text-field>

              <span class="sub_options"> Image Description </span>
              <v-text-field
                v-model="payload.image_description"
                placeholder="Image Description"
                outlined
                dense
              ></v-text-field>

              <div>
                <span class="sub_options">Add more Images</span>
                <p class="thin_text font-weight-thin">
                  More main Images (Slider will be active)
                </p>
                <v-btn
                  class="_button font-weight-regular"
                  outlined
                  @click="$refs.activateUploaderDialog.$el.click()"
                  small
                >Select more Images</v-btn>
              </div>

              <div class="pad_top">
                <span class="sub_options">Files</span>
                <input hidden type="file" id="file" multiple ref="addFiles" />
                <p class="thin_text font-weight-thin">
                  Downloadable additional files(.pdf, .docx, .zip etc..)
                </p>
                <v-btn
                  class="_button font-weight-regular"
                  outlined
                  @click="addFiles"
                  small
                >
                  Add files
                </v-btn>
              </div>

              <div class="pad_top" id="category">
                <span class="font-weight-regular"> Category </span>
                <div>
                  <p class="sub_options" id="sub_opChild">Language</p>
                  <v-select
                    dense
                    outlined
                    v-model="payload.languages"
                    :items="languages"
                  ></v-select>
                </div>

                <div class="mb-5">
                  <div class="d-flex mb-1" style="justify-content:space-between">
                    <p class="sub_options">Category</p>
                    <v-btn 
                      class="_button font-weight-regular"
                      x-small
                      outlined
                       @click.stop="viewCategory = !viewCategory"
                    >View</v-btn>
                  </div>
                  <v-autocomplete
                    flat
                    dense
                    outlined
                    hide-no-data
                    return-object
                    item-value="id"
                    item-text="name"
                    hide-details="auto"
                    v-model="payload.category"
                    @click:prepend-inner.stop="addCategory"
                    @change="resetCategory"
                    :loading="loading"
                    :items="categories"
                    :search-input.sync="search"
                    :prepend-inner-icon="this.empty? 'mdi-plus': ''"
                  ></v-autocomplete>
                </div>

                <div>
                  <div class="d-flex mb-1" style="justify-content:space-between">
                    <p class="sub_options">Subcategory</p>
                    <v-btn 
                      class="_button font-weight-regular"
                      x-small
                      outlined
                      @click.stop="viewSubcategory = !viewSubcategory"
                    >View</v-btn>
                  </div>
                  <v-autocomplete
                    flat
                    dense
                    outlined
                    hide-no-data
                    item-value="id"
                    item-text="name"
                    hide-details="auto"
                    v-model="payload.sub_category"
                    @click:prepend-inner.stop="addSubcategory"
                    :loading="loading"
                    :items="sub_categories"
                    :search-input.sync="search_sub"
                    :prepend-inner-icon="this.empty_sub? 'mdi-plus': ''"
                  ></v-autocomplete>
                </div>

              </div>
            </v-col>
          </v-flex>
          <div class="d-flex ms-auto">
            <v-dialog width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary mr-2" v-bind="attrs" v-on="on">
                  Blog Preview
                </v-btn>
              </template>
              <v-card width="auto">
                <content-preview :contents="payload.content"></content-preview>
              </v-card>
            </v-dialog>
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
import contentPreview from "~/pages/blog/content_preview.vue";
import viewSubcategory from "~/pages/blog/category/subcategory";
import viewCategory from "~/pages/blog/category";
export default {
  components: {
    VueEditor, 
    contentPreview,
    viewCategory,
    viewSubcategory
  },

  data() {
    return {
      payload: {
        title: "",
        slug: "",
        summary: "",
        keywords: "",
        show_right_column: "",
        show_to_registered_users: "",
        optional_url: "",
        content: "",
        image: [],
        image_description: "",
        blog_type: "Article",
        category_id: "",
        languages: "",
        category: "",
        sub_category: [],
        tags: [],
        uploaded_images: [],
      },
      categories: [],
      sub_categories:[],
      updateData:[],
      languages: ["French", "English"],
      searchKeyword: "",
      loading: false,
      errorMessage: "",
      originalPayload: {},
      statusOptions: [
        { id: 1, name: "Active" },
        { id: 0, name: "Inactive" },
      ],
      isDragging: false,
      dragCount: 0,
      files: [],
      images: "",
      viewCategory: false,
      viewSubcategory: false,
      selectedCategory: '',
      empty: false,
      search: null,
      search_sub: null,
      empty_sub: false,
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
    'payload.category': {
      handler(val){
        if(val!=null){
          this.selectedCategory=val.id
        }
      }
    },
    search: {
      handler(val) {
        if (val === undefined || val === null || val.length === 0) {
          this.empty=false
          this.selectedCategory=''
          return;
        }
        this.viewAllCategory()
      },
    }, 
    search_sub: {
      handler(val) {
        if (val === undefined || val === null || val.length === 0) {
          this.empty_sub=false
          this.selectedCategory=''
          return;
        }
        this.viewSubcategoryData()
      },
    }
  },
  mounted() {
    this.viewAllCategory();
    this.viewSubcategoryData()
  },
  methods: {
    saveForm() {
      this.$refs.form.validate().then((result) => {
        if (this.payload.id) {
          this.$emit("updateRecord", this.tagPayload);
        } else {
          this.addBlog(this.payload);
        }
      });
    },

    addBlog(payload) {
      this.$axios.post(`${this.$blogs}`, payload).then(({ data }) => {});
      this.successNotification(payload);
    },

    handleFileImport() {
      window.addEventListener("focus", () => {}, { once: true });
      this.$refs.uploader.click();
    },

    onInputChange(e) {
      const files = e.target.files;

      Array.from(files).forEach((file) => this.addImage(file));
    },

    onDragEnter(e) {
      // e.preventDefault();
      // this.dragCount++;
      // this.isDragging = true;                //For drag & drop if ever they want it
      // return false;
    },

    onDragLeave(e) {
      // e.preventDefault();
      // this.dragCount--;
      // if(this.dragCount < 0){                //For drag & drop if ever they want it
      //   this.isDragging = false;
      // }
    },
    onDrop(e) {
      // e.preventDefault();
      // e.stopPropagation();
      // this.isDragging = false;                //For drag & drop if ever they want it
      // const files = e.dataTransfer.files
      // Array.from(files).forEach(file => this.addImage(file))
    },

    selectImage(img) {
      if (img) {
        this.images = img;
        var key = this.payload.image.length;
        if (key > 0) {
          this.payload.image[key] = img;
        } else {
          this.payload.image[0] = img;
        }
      } else {
        this.$refs.select_image.click();
      }
    },

    replaceImage() {
      this.images = "";
    },

    watchImageUrl(imageUrl) {
      this.images = imageUrl;
    },

    addFiles() {
      this.$refs.addFiles.click();
    },

    addImage(file) {
      if (!file.type.match("image.*")) {
        console.log(`${file.name} is  not an image`);
        return;
      }

      this.files.push(file);
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        this.images = e.target.result;
        if (this.payload.image.length > 0) {
          var key = this.payload.image.length;
          this.payload.image[key] = e.target.result;
        } else {
          this.payload.image[0] = e.target.result;
        }
      };

      reader.readAsDataURL(file);
    },
    viewAllCategory() {
      this.loading = true
      if (this.timerCat) {
        clearTimeout(this.timerCat);
        this.timerCat = null;
      }
      this.timerCat = setTimeout(() => { 
        this.categories=[];
        this.$axios.get(`${this.$category}/search?keyword=`+this.search).then(({ data }) => {
          this.categories = data;
          this.loading=false
          if(this.categories.length===0) {
            this.empty=true
          }
        }).catch(err => {
          console.log(err)
        });
      }, 3000);
    },
    resetCategory() {
      this.viewSubcategoryData()
    },
    viewSubcategoryData() {
      this.loading = true
      if (this.timerSub) {
        clearTimeout(this.timerSub);
        this.timerSub = null;
      }
      this.timerSub = setTimeout(() => { 
        this.sub_categories=[];
        this.$axios.get(`${this.$subcategory}?category_id=` + this.selectedCategory).then(({ data }) => {
          this.sub_categories = data; 

        console.log(this.search,"search")
          if(this.search === undefined || this.search === null || this.search.length === 0 ) {
            this.payload.sub_category=[]
            this.sub_categories=[];
          }else{
            this.payload.sub_category=this.sub_categories[0]
            if(this.sub_categories.length===0) {
              this.empty_sub=true
            }
          }
            this.loading=false
        }).catch(err => {
          console.log(err)
        });
      }, 3000);
    },
    addCategory() {
      let data= {
        name: this.search
      }
      this.$axios.post(`${this.$category}`, data).then(({ data }) => {
        this.successNotification(data,"create","category","categories","name");
        this.search=""
        this.empty=false
        this.updateData=this.categories
      });
    },
    addSubcategory() {
      let paylaodSubcategory = {
        category_id: this.selectedCategory,
        name: this.search_sub
      }
      console.log(paylaodSubcategory , "addSub")
    },
          edit (index, item) {
        if (!this.editing) {
          this.editing = item
          this.editingIndex = index
        } else {
          this.editing = null
          this.editingIndex = -1
        }
      },
  },
};
</script>

<style>
.form-box .v-input__slot {
  box-shadow: none !important;
  border: none;
}
._card {
  padding-bottom: 60px !important;
}
.thin_text {
  font-size: 14px;
  padding: 0;
}
.uploader {
  width: 100%;
  height: 30vh;
  background: #f8f9fb;
  color: #dadbdd;
  /* padding: 40px 15px; */
  text-align: center;
  border-radius: 5px;
  border: 3px dashed #dadbdd;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 30px;
}
.uploader_dialog_box {
  width: 100%;
  height: 30vh;
  background: #f8f9fb;
  color: #dadbdd;
  padding: 110px 15px;
  text-align: center;
  border-radius: 5px;
  border: 3px dashed #dadbdd;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 30px;
}
#dialog_left {
  border: 1px groove #dadbdd;
}

.uploader .file-input {
  /* background: #dadbdd;
  color: #f8f9fb; */
  width: 100%;
  margin-top: 100px;
  cursor: pointer;
}

.pad_top {
  margin-top: 27px;
}
.sub_options {
  font-size: 14px;
  font-style: normal;
}
#sub_opChild {
  margin-top: 20px;
}
#category {
  margin-top: 45px;
}

.quillWrapper .quill-container .ql-editor{
  overflow-y: auto;
  height: 20px;
}
</style>
