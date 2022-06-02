<template>
   <v-navigation-drawer
    temporary
    right
    persistent
    fixed
    v-model="drawer"
    width="25%"
     hide-overlay
  >
    <p class="form-title pa-2 title font-weight-regular text-uppercase d-flex justify-space-between pl-4">
      {{photoPayload.id ?  'Edit' : 'Add New'}} Photos
      <v-btn icon small @click="drawer = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </p>
    <v-divider class="mb-2"></v-divider>
    <ValidationObserver  ref="form">
      <v-form class="form-box" @submit.prevent="saveForm">
        <v-container grid-list-md>
          <v-layout row wrap class="px-1">
            <v-flex xs12>
              <p class="subtitle-1 font-weight-medium mb-2">INFORMATIONS</p>
            </v-flex>
            <v-flex xs12>
              <div class="profile-box">
                <div class="mb-2">
                  <v-img
                    v-if="photoPayload.id"
                    height="200px"
                    width="200px"
                    class="my-0 mx-auto"
                    :src="photoPayload.image ? photoPayload.image: imageUrl('clients', id, photoPayload.file_name)"
                  ></v-img>
                  <v-img
                    v-else
                    height="200px"
                    width="200px"
                    class="my-0 mx-auto"
                    :src="photoPayload.image || '/images/empty_photo.png'"
                  ></v-img>
                </div>
                <v-btn
                  color="success"
                  small
                  outlined
                  @click="handleFileImport"
                >
                  <v-icon>mdi-upload-outline</v-icon>
                  upload photo
                </v-btn>
                <input
                  ref="uploader"
                  type="file"
                  @change="onFileChange"
                  class="d-none"
                  accept="image/x-png,image/gif,image/jpeg"
                />
              </div>
            </v-flex>
            <v-flex xs12 sm9>
              <ValidationProvider slim name="title" rules="required|min:1|max:100" v-slot="{ errors }">
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    <span>*</span>
                    Title
                  </p>
                  <v-text-field
                    v-model="photoPayload.title"
                    placeholder="Type title ..."
                    type="text"
                    hide-details="auto"
                    solo
                    :error-messages="errors"
                  ></v-text-field>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 sm3>
              <div class="mb-1">
                <p class="subtitle-2 font-weight-regular mb-2">
                  Sharable
                </p>
                <v-select
                  v-model="photoPayload.sharable"
                  :items="sharableOptions"
                  hide-details="auto"
                  solo
                  item-text="text"
                  item-value="id"
                ></v-select>
              </div>
            </v-flex>
             <v-flex xs12>
              <ValidationProvider slim name="description"  v-slot="{ errors }">
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    Description
                  </p>
                  <v-textarea
                    v-model="photoPayload.description"
                    placeholder="Type or Paste Description ..."
                    type="text"
                    hide-details="auto"
                    solo
                    :error-messages="errors"
                  ></v-textarea>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <v-btn class="success mt-1" block type="submit">
                <v-icon>mdi-content-save-outline</v-icon>
                {{photoPayload.id ? 'UPDATE' : 'SAVE'}}
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </ValidationObserver>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {
      id:0,
      drawer:false,
      photoPayload: {
        title:'',
        image:'',
        description:'',
        sharable:1,
      },
      sharableOptions:[
        {id:1, text:'Yes'},
        {id:0, text:'No'}
      ],
      originalPayload: {
        title:'',
        image:'',
        description:'',
        sharable:1,
        }
    }
  },
  props: {
    drawerStatus: {
      type:Boolean,
      default: () => false
    },
    selectedItem: {
      type:Object,
      default:() => {}
    }
  },
  methods: {
    saveForm() {
      this.$refs.form.validate().then(result => {
        if (!result) return
        if (this.photoPayload.id) {
          this.update().then(() => {
            this.$emit('updateRecord', this.photoPayload)
            this.photoPayload = this.cloneVariable(this.originalPayload);
          })
        } else {
          this.create().then(() => {
            console.log(this.photoPayload , 'test2')
            this.$emit('addRecord', this.photoPayload)
            this.photoPayload = this.cloneVariable(this.originalPayload);
          })
        }
      })
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
        this.photoPayload.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
  watch: {
    drawerStatus(val) {
      if(val) this.drawer = val
    },
    drawer(val) {
      if(this.originalPayload) {
        this.photoPayload = this.cloneVariable(this.originalPayload)
      }

      if(!val) {
        this.$emit('closeDrawer')
      }

      this.id = this.$route.params.id
    },
    selectedItem: {
      handler(val) {
        if (!this.originalPayload) {
          this.originalPayload = this.cloneVariable(this.photoPayload)
        }
        this.photoPayload = this.cloneVariable(val)
      },
      deep:true
    }
  }
}
</script>
