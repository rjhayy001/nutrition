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
          <v-flex xs10 class="py-2 px-3">
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
                  value="radio-1"
                ></v-radio>
                <v-radio
                  label="No"
                  value="radio-2"
                ></v-radio>
              </v-row>
              </v-radio-group>
              <span>Show only to Registered Users</span>
              <v-row class="justify-center">
                <v-checkbox
                  v-model="payload.show_to_registered_users"
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
          <v-flex xs2 class="py-0 px-0">
            <v-col>
            <p class="font-weight-regular "> Image </p>
            <p class="thin_text font-weight-thin"> Main post image </p>
            <div
              class="uploader"
              @dragenter="onDragEnter"
              @dragleave="onDragLeave"
              @dragover.prevent
              @drop="onDrop"
              :class="{ dragging: isDragging }"
            >

              <div v-show="!images.length">
                <v-icon> mdi-image-multiple </v-icon>
                <div class="file-input">
                  <input hidden type="file" id="file" @change="onInputChange" multiple ref="selectImage">
                  <v-btn class="_button font-weight-regular" outlined @click="selectImage" x-small>Select Image</v-btn>
                </div>
              </div>

              <div class="images-preview" v-show="images.length">
                <div class="image-wrapper" v-for="(image, index) in images" :key="index">
                  <img :src="image" :alt="`Image Uploader ${index}`">
                  <div class="details">
                    <span class="name" v-text="files[index].name"></span>
                    <span class="size" v-text="files[index].size"></span>
                  </div>
                </div>
              </div>
            </div>

            <span class="sub_options"> or Add image Url </span>
            <v-text-field
              v-model="payload.image"
              placeholder="Add Image Url"
              outlined
              dense
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
            <v-btn class="_button font-weight-regular" outlined @click="selectImage" x-small>Select more Images</v-btn>
            </div>

            <div class="pad_top">
            <span class="sub_options">Files</span>
            <p class="thin_text font-weight-thin"> Downloadable additional files(.pdf, .docx, .zip etc..) </p>
            <v-btn class="_button font-weight-regular" outlined @click="selectImage" x-small>Add files</v-btn>
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
          <!-- <div class="form-footer d-flex align-content-end justify-end">
            <v-btn class="success" type="submit">
              <v-icon>mdi-content-save-outline</v-icon>
              {{ payload.id ? "update" : "save" }}
            </v-btn>
          </div> -->
        </v-layout>
      </v-container>
    </v-form>
  </ValidationObserver>
</template>
<script>
import tagFormDrawer from "~/components/tag/form.vue";
import groupFormDrawer from "~/components/group/form.vue";
import { VueEditor } from "vue2-editor";
export default {
  components: {tagFormDrawer, groupFormDrawer, VueEditor},

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
        image: "",
        image_description:"",
        blog_type: "",
        category_id: "",
        language:['French', 'English'],
        categories:['Test1', 'Test2'],
        sub_categories:[],
        tags: [],
      },
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
      images: [],
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
    tagsSelected: {
      handler(val) {
        this.tagsSelected = val;
      }
    }
  },
  mounted() {
    this.getAllTags();
    this.getAllGroups();
  },
  methods: {
    saveForm() {
      this.$refs.form.validate().then((result) => {
        if (!result) return;
        this.$root
          .dialog(
            "Confirm add Action!",
            `Are you sure you want to add this record ?`,
            "add"
          )
          .then(() => {
            this.payload.city_id = this.payload.city_id.id;
            this.payload.country_id = this.payload.country_id.id;
            this.payload.zipcode_id = this.payload.zipcode_id.id;
            if (this.payload.id) {
              this.$emit("updateRecord", this.payload);
            } else {
              this.$emit("addRecord", this.payload);
            }
          });
      });
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
      // this.isDragging = true;
      // return false;
    },

    onDragLeave(e) {
      // e.preventDefault();
      // this.dragCount--;

      // if(this.dragCount < 0){
      //   this.isDragging = false;
      // }
    },
    onDrop(e) {
      // e.preventDefault();
      // e.stopPropagation();

      // this.isDragging = false;

      // const files = e.dataTransfer.files

      // Array.from(files).forEach(file => this.addImage(file))
    },

    selectImage() {
      this.$refs.selectImage.click()
    },

    addImage(file) {
      if(!file.type.match('image.*')) {
        console.log(`${file.name} is  not an image`);
        return;
      }

      this.files.push(file);
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => this.images.push(e.target.result);
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
.thin_text{
  font-size: 14px;
  padding: 0;
}
.uploader {
  width: 100%;
  background: #f8f9fb;
  color: #dadbdd;
  padding: 40px 15px;
  text-align: center;
  border-radius: 5px;
  border: 3px dashed #dadbdd;
  font-size: 14px;
  cursor:pointer;
  margin-bottom:30px;
}
.uploader .file-input.label .input{
  background: #dadbdd;
  color: #f8f9fb;
  width: 100%;
  left: 0;
  top: 0;
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
