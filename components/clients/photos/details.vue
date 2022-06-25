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
  <div v-if="testing">
    <p class="form-title pa-2 title font-weight-regular text-uppercase d-flex justify-space-between pl-4">
      Information
      <span>
        <v-btn
          color="success"
          class="mr-1"
          small
          outlined
          @click="test"
        >
          <v-icon>mdi-note-edit-outline</v-icon>
          Edit
        </v-btn>
        <v-btn icon small @click="drawer = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </span>
    </p>
    <v-divider class="mb-2"></v-divider>
        <v-container class="testing" grid-list-md>
          <v-layout row wrap class="px-1">
            <!-- <v-flex xs12>
              <p class="subtitle-1 font-weight-medium mb-2">INFORMATIONS</p>
            </v-flex> -->
            <v-flex xs12>
              <div class="profile-box">
                <div class="mb-2">
                  <v-img
                    v-if="photoPayload.id"
                    height="auto"
                    width="100%"
                    class="my-0 mx-auto"
                    :src="photoPayload.image ? photoPayload.image: imageUrl('clients', id, photoPayload.file_name)"
                  >
                  </v-img>
                  <v-img
                    v-else
                    height="auto"
                    width="100%"
                    class="my-0 mx-auto"
                    :src="photoPayload.image || '/images/empty_photo.png'"
                  ></v-img>
                </div>
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
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    <strong>{{ photoPayload.title }}</strong>
                  </p>
                </div>
            </v-flex>
            <v-flex xs12 sm3>
              <div class="mb-1">
                <p class="subtitle-2 font-weight-regular mb-2">
                  <strong>Date</strong>
                </p>
              </div>
            </v-flex>
            <v-flex xs12>
              <div class="mb-1">
                <p class="subtitle-2 font-weight-regular mb-2">
                  {{ photoPayload.description}}
                </p>
              </div>
            </v-flex>
            <!-- <v-flex xs12>
              <div class="mb-1">
                <v-card color="#EEEEEE" shaped elevation="0" class="pa-4">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    {{ photoPayload.description}}
                  </p>
                  <div class="d-flex justify-space-between w-100">
                    <p class="font-weight-medium">Coach - Date</p>
                    <v-tooltip left>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          rounded
                          small
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon color="success">mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Edit comment</span>
                    </v-tooltip>
                  </div>
                </v-card>
              </div>
            </v-flex> -->
            <ValidationObserver  ref="form" style="width:100%;">
              <v-form class="form-box" @submit.prevent="saveComment">
                <v-flex xs12 sm12>
                  <v-textarea
                    height="100px"
                    class="w-100 mb-2"
                    full-width
                    v-model="commentPayload.text"
                    placeholder="Type comment ..."
                    type="text"
                    hide-details="auto"
                    solo
                  ></v-textarea>
                  <v-btn class="success mt-1" block type="submit">
                    Comment 
                    <v-icon class="ml-1">mdi-comment-text-outline</v-icon>
                  </v-btn>
                </v-flex>
              </v-form>
            </ValidationObserver>
          </v-layout>
        </v-container>
    </div>
    <div v-else>
      <v-skeleton-loader class="pa-5 mx-auto" type="table-heading, card, article, article"></v-skeleton-loader>
    </div>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {
      id:0,
      drawer:false,
      commentPayload: { 
        text: '' 
      },
      testing: true,
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
    test(){
      this.testing = false;
    },
    saveComment() {
      if(this.commentPayload.text){
        console.log(this.commentPayload,'comment')
        this.create().then(() => {
          this.$emit('addComment', this.commentPayload)
          this.commentPayload.text = null
        })
      }else{
        alert('Type any text first.')
      }
    },
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
    editPhoto() {
      alert('Edit button')
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
