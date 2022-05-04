<template>
  <ValidationObserver ref="form">
    <v-form class="form-box" @submit.prevent="saveForm">
      <v-container grid-list-md fluid>
        <tag-form-drawer :drawerStatus="tagDrawer"
          @addRecord="addTagRecord($event)"
          @updateRecord="updateRecord($event)"
          :selectedItem="selectedItem"
        >
        </tag-form-drawer>
        <group-form-drawer :drawerStatus="groupDrawer"
          @addRecord="addGroupRecord($event)"
          @updateRecord="updateRecord($event)"
          :selectedItem="selectedItem"
        >
        </group-form-drawer>
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
        <v-layout row wrap >
          <v-flex xs8 class="py-2 px-3">
            <p class="font-weight-regular pa-2"> Blog Details </p>
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
              <v-radio-group
                v-model="payload.show_right_column"
                row
              >
              <v-row class="justify-center">
                <v-radio
                  label="Yes"
                  value="1"
                ></v-radio>
                <v-radio
                  label="No"
                  value="0"
                ></v-radio>
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
              <vue-editor height="50vh" v-model="payload.content" />
            </v-col>
          </v-flex>
          <v-flex xs4 class="py-0 px-0">
            <v-col>
            <p class="font-weight-regular "> Image </p>
            <p class="thin_text font-weight-thin"> Main post image </p>
            <p style="right:20px;position:absolute;z-index:1;">
            <v-btn
              dense
              small
              @click="replaceImage"
              icon
              ref="close_btn"
              >
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
                  <input hidden type="file" id="file" @change="onInputChange" multiple ref="select_image">
                  <!-- <v-btn class="_button font-weight-medium" outlined @click="selectImage" small>Select Image</v-btn> -->
                  <v-dialog max-width="55%" transition="dialog-top-transition">
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
                      <!-- <content-preview :contents="payload.content"></content-preview> -->
                      <!-- <div>
                        {{payload.content}}
                      </div> -->
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
                                v-for="item in payload.uploaded_images" :key="item.url"
                                cols="2"
                              >
                                <v-card hover @click="selectImage(item.url, )">
                                  <v-img
                                    :src="`${item.url}`"
                                    max-height="100"
                                    contain
                                  >
                                  </v-img>
                                  <span style="font-size:12px;">
                                    {{item.name}}
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

              <div style="width:100%;height:100%">
                <div>
                  <!-- <vue-responsive-image :image-url="images" :image-ratio="17/10"></vue-responsive-image> -->
                  <v-img :src="images" :aspect-ratio="1.9" content-class contain srcset lazy-src></v-img>
                  <!-- <div class="details">
                    <span class="name" v-text="files[index].name"></span>
                    <span class="size" v-text="files[index].size"></span>
                  </div> -->
                </div>
              </div>

              <!-- <div>
                <div class="wrapper">
                  <img :src="images">
                  <div class="details">
                    <span class="name" v-text="files[index].name"></span>
                    <span class="size" v-text="files[index].size"></span>
                  </div>
                </div>
              </div> -->
            </div>

            <span class="sub_options"> or Add image Url </span>
            <v-text-field
              v-model="payload.image"
              placeholder="Add Image Url"
              outlined
              dense
              @change="watchImageUrl(payload.image)"
              >
            </v-text-field>
            <span class="sub_options"> Image Description </span>
            <v-text-field
              v-model="payload.image_description"
              placeholder="Image Description"
              outlined
              dense
            >
            </v-text-field>

            <div>
            <span class="sub_options">Add more Images</span>
            <p class="thin_text font-weight-thin"> More main Images (Slider will be active) </p>
            <v-btn class="_button font-weight-regular" outlined @click="$refs.activateUploaderDialog.$el.click()" small>Select more Images</v-btn>
            </div>

            <div class="pad_top">
            <span class="sub_options">Files</span>
            <input hidden type="file" id="file" multiple ref="addFiles">
            <p class="thin_text font-weight-thin"> Downloadable additional files(.pdf, .docx, .zip etc..) </p>
            <v-btn class="_button font-weight-regular" outlined @click="addFiles" small>Add files</v-btn>
            </div>

            <div class="pad_top" id="category">
              <span class="font-weight-regular"> Category </span>
              <p class="sub_options" id="sub_opChild">Language</p>
              <v-select dense outlined v-model="payload.languages" :items="payload.languages"></v-select>
              <p class="sub_options">Category</p>
              <v-select dense outlined v-model="payload.categories" :items="payload.categories"></v-select>
              <p class="sub_options">Subcategory</p>
              <v-select dense outlined v-model="payload.sub_categories" :items="payload.sub_categories"></v-select>
            </div>

            </v-col>
          </v-flex>
          <div class="form-footer d-flex align-content-end justify-end">
            <v-dialog
              width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                >
                  Blog Preview
                </v-btn>
              </template>
              <v-card width="auto">
                <content-preview :contents="payload.content"></content-preview>
                <!-- <div>
                  {{payload.content}}
                </div> -->
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
import tagFormDrawer from "~/components/tag/form.vue";
import groupFormDrawer from "~/components/group/form.vue";
import { VueEditor } from "vue2-editor";
import contentPreview from "~/pages/blog/content_preview.vue";
export default {
  components: {tagFormDrawer, groupFormDrawer, VueEditor, contentPreview},

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
        image_description:"",
        blog_type: "Article",
        category_id: "",
        language:['French', 'English'],
        categories:['Fruits', 'Vegetables', 'Grains', 'Protein Foods', 'Dairy'],
        sub_categories:[],
        tags: [],
        uploaded_images: [],
      },
      searchKeyword:"",
      modal: false,
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
      tagDrawer: false,
      groupDrawer: false,
      tagsOption: [],
      tagsSelected: [],
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
      }
    }
  },
  mounted() {
    this.getAllTags();
    this.getAllGroups();
    this.getUploadedImages();
  },
  methods: {
    saveForm() {
      this.$refs.form.validate().then(result => {
        if (this.payload.id) {
          this.$emit('updateRecord', this.tagPayload)
        } else {
          this.addBlog(this.payload)
        }
      });
    },

    addBlog(payload) {
      this.$axios.post(`${this.$blogs}`, payload).then(({ data }) => {
      });
      this.successNotification(
        payload,
      );
        // this.goTo("blog");
    },

    handleFileImport() {
      window.addEventListener("focus", () => {}, { once: true });
      this.$refs.uploader.click();
    },

    onInputChange(e) {
      const files = e.target.files;

      Array.from(files).forEach(file => this.addImage(file));
    },

    onDragEnter(e) {
      // e.preventDefault();
      // this.dragCount++;
      // this.isDragging = true;                //For drag & drop if ever they want it
      // return false;
    },

    getUploadedImages() {
      this.$axios.get(`${this.$uploadedImages}?no-paginate=''`).then(({data}) => {
        this.payload.uploaded_images = data.data
      })
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
      if(img){
        this.images = img;
        var key = this.payload.image.length;
        if(key > 0) {
          this.payload.image[key] = img;
        }
        else{
          this.payload.image[0] = img;
        }
        // this.$refs.close_btn.$attrs.hidden=false
      }

      else {
        this.$refs.select_image.click()
      }
    },

    replaceImage() {
      this.images = "";
    },

    watchImageUrl(imageUrl) {
      this.images= imageUrl;
    },

    addFiles(){
      this.$refs.addFiles.click()
    },

    addImage(file) {
      if(!file.type.match('image.*')) {
        console.log(`${file.name} is  not an image`);
        return;
      }

      this.files.push(file);
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        this.images = e.target.result;
        if(this.payload.image.length > 0) {
          var key = this.payload.image.length
          this.payload.image[key] = e.target.result
        }
        else{
          this.payload.image[0] = e.target.result
        }
      }

      reader.readAsDataURL(file);
    },

    getAllTags() {
      this.$axios.get(`${this.$tags}?no-paginate=''`).then(({data}) => {
        this.tagsOption = data.data
      })
    },

    getAllGroups() {
      this.$axios.get(`${this.$groups}?no-paginate=''`).then(({data}) => {
        this.groupsOption = data.data
      })
    },

    addTagRecord(payload) {
      this.create().then(() => {
        this.$axios.post(`${this.$tags}`, payload).then(({data}) => {
          this.successNotification(data, 'added', '', '', 'name')
          this.getAllTags()
        })
      })
    },

    addGroupRecord(payload) {
      this.create().then(() => {
        this.$axios.post(`${this.$groups}`, payload).then(({data}) => {
          this.successNotification(data, 'added', '','', 'name')
          this.getAllGroups()
        })
      })
    },
  },
};
</script>

<style>
.form-box .v-input__slot {
    box-shadow: none !important;
    border: none;
}
._card{
  padding-bottom: 60px !important;
}
.thin_text{
  font-size: 14px;
  padding: 0;
}
.uploader {
  width: 100%;
  height:30vh;
  background: #f8f9fb;
  color: #dadbdd;
  /* padding: 40px 15px; */
  text-align: center;
  border-radius: 5px;
  border: 3px dashed #dadbdd;
  font-size: 14px;
  cursor:pointer;
  margin-bottom:30px;
}
.uploader_dialog_box {
  width: 100%;
  height:30vh;
  background: #f8f9fb;
  color: #dadbdd;
  padding: 110px 15px;
  text-align: center;
  border-radius: 5px;
  border: 3px dashed #dadbdd;
  font-size: 14px;
  cursor:pointer;
  margin-bottom:30px;
}
#dialog_left{
  border: 1px groove #dadbdd;
}

.uploader .file-input{
  /* background: #dadbdd;
  color: #f8f9fb; */
  width: 100%;
  margin-top: 100px;
  cursor:pointer;
}

.pad_top {
  margin-top:27px;
}
.sub_options {
  font-size:14px;
  font-style: normal;
}
#sub_opChild {
  margin-top: 20px;
}
#category {
  margin-top: 45px;
}

</style>
