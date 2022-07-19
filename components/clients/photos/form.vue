<template>
<div>
  <tag-form-drawer :tagDrawer="tagDrawer"
    @addRecord="addTagRecord($event)"
    :selectedItem="selectedItem"
    style="z-index:10 !important;"
  >
  </tag-form-drawer>
   <v-navigation-drawer
    temporary
    right
    persistent
    fixed
    v-model="drawer"
    width="25%"
     hide-overlay
  >
  <!-- For Editing and Adding Form -->
  <div v-if="isEdit==1">
    <p class="form-title pa-2 title font-weight-regular text-uppercase d-flex justify-space-between pl-4">
      {{photoPayload.id ?  this.$t('global.edit')+' la' : this.$t('clients.addNewPhoto') }} Photo
      <v-btn icon small @click="drawer = false, isEdit = 2">
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
                  {{ this.$t('global.uploadPhoto') }}
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
                    {{ $t('blogs.title') }}
                  </p>
                  <v-text-field
                    v-model="photoPayload.title"
                    :placeholder=" $t('clients.typeTitle')+' ...'"
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
                  {{ $t('clients.shareable') }}
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
                    :placeholder=" $t('clients.typeDescription')+' ...'"
                    type="text"
                    hide-details="auto"
                    solo
                    :error-messages="errors"
                  ></v-textarea>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <ValidationProvider slim>
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">Tags</p>
                  <v-autocomplete
                    filled
                    flat
                    dense
                    v-model="photoPayload.taggable"
                    :items="tagsItem"
                    :label="this.$t('clients.selectTags')"
                    hide-details="auto"
                    prepend-inner-icon="mdi-plus"
                    @click:prepend-inner.stop="tagDrawer = !tagDrawer"
                    item-text="name"
                    item-value="id"
                    multiple
                  ></v-autocomplete>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <v-btn class="success mt-1" block type="submit">
                <v-icon>mdi-content-save-outline</v-icon>
                {{photoPayload.id ? this.$t('global.update') : this.$t('global.save') }}
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </ValidationObserver>
    </div>
    <!-- Commentable Form -->
    <div v-else-if="isEdit == 2">
      <p class="form-title pa-2 title font-weight-regular text-uppercase d-flex justify-space-between pl-4">
        Information
        <span>
          <v-btn
          icon
          outlined
          small
          color="primary"
          @click="$emit('download', selectedItem)"
          >
            <v-icon color="primary">mdi-download</v-icon>
          </v-btn>
          <v-btn
            color="success"
            class="mr-1"
            small
            outlined
            @click="variableDrawer"
          >
            <v-icon>mdi-note-edit-outline</v-icon>
            Edit
          </v-btn>
          <v-btn icon small @click="drawer = false, isEdit = 2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </span>
      </p>
      <v-divider class="mb-2"></v-divider>
      <v-container class="testing" grid-list-md>
        <v-layout row wrap class="px-1">
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
                <strong>{{ this.$moment(photoPayload.created_at).format("MM/DD/YY") }}</strong>
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
          <v-flex xs12 v-if="photoPayload.taggable!=0">
            <div class="mb-1">
              <p class="subtitle-2 font-weight-regular mb-2">
                <v-chip
                  v-for="taggable in photoPayload.taggable" :key="taggable.index"
                  class="mr-1"
                  small
                  link
                >
                  #{{ taggable.name }}
                </v-chip>
              </p>
            </div>
          </v-flex>
          <v-flex xs12 v-if="temp_comment!=0">
            <div class="mb-1">
              <v-card color="#EEEEEE" rounded="lg" elevation="0" class="pa-3 mb-2">
                <p class="subtitle-2 font-weight-regular mb-2">
                  {{ temp_comment.text }}
                </p>
                <div class="d-flex justify-space-between w-100">
                  <p class="font-weight-medium">Coach - {{ $moment().format("MM/DD/YY") }}</p>
                  <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        rounded
                        small
                        v-bind="attrs"
                        v-on="on"
                        @click="commentForm(temp_comment.text, temp_comment.id)"
                      >
                        <v-icon color="success">mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Edit comment</span>
                  </v-tooltip>
                </div>
              </v-card>
            </div>
          </v-flex>
          <v-flex xs12 v-else-if="photoPayload.comment!=0">
            <div class="mb-1">
              <v-card v-for="comment in photoPayload.comment" :key="comment.index" color="#EEEEEE" rounded="lg" elevation="0" class="pa-3 mb-2">
                <p class="subtitle-2 font-weight-regular mb-2">
                  {{ comment.text}}
                </p>
                <div class="d-flex justify-space-between w-100">
                  <p class="font-weight-medium">Coach - {{ $moment(comment.created_at).format("MM/DD/YY") }}</p>
                  <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        rounded
                        small
                        v-bind="attrs"
                        v-on="on"
                        @click="commentForm(comment.text, comment.id)"
                      >
                        <v-icon color="success">mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Edit comment</span>
                  </v-tooltip>
                </div>
              </v-card>
            </div>
          </v-flex>
          <v-flex v-else-if="editComment!=0">
            <ValidationObserver ref="form" style="width:100%;">
              <v-form class="form-box" @submit.prevent="saveComment">
                <v-flex xs12 sm12>
                  <v-textarea
                    height="100px"
                    class="w-100 mb-2"
                    full-width
                    v-model="ordPayload.text"
                    placeholder="Type comment ..."
                    type="text"
                    hide-details="auto"
                    solo
                  ></v-textarea>
                  <v-btn class="success mt-1" block type="submit">
                    {{editComment==1 ? 'Update Comment' : 'Comment'}} 
                    <v-icon class="ml-1">mdi-comment-text-outline</v-icon>
                  </v-btn>
                </v-flex>
              </v-form>
            </ValidationObserver>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div v-else>
      <v-skeleton-loader
      type="table-heading, image, table-heading, article, article"
      class="pa-5 mx-auto"
      >
      </v-skeleton-loader>
    </div>
  </v-navigation-drawer>
</div>
</template>
<script>
import tagFormDrawer from "~/components/tag/form.vue";
export default {
  components: { tagFormDrawer },
  data() {
    return {
      tagsItem: [],
      editComment: 0,
      ordPayload: {
        text: '',
        id: ''
      },
      tagDrawer: false,
      temp_comment: [],
      id:0,
      isEdit:2,
      drawer:false,
      commentPayload: {
        commentable_id: '',
        text: ''
      },
      photoPayload: {
        title:'',
        image:'',
        description:'',
        sharable:1,
        taggable: [],
      },
      sharableOptions:[
        {id:1, text: this.$t('global.yes') },
        {id:0, text: this.$t('global.no') }
      ],
      originalPayload: {
        title:'',
        image:'',
        description:'',
        sharable:1,
        taggable: [],
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
    },
    comment: {}
  },
  created(){
    this.getTags();
  },
  methods: {
    addTagRecord(payload) {
      this.create().then(() => {
        payload['type'] = 'photos'
        this.$axios.post(`${this.$tags}`, payload).then(({data}) => {
          this.successNotification(data, 'added', '', '', 'name')
          this.getTags()
        })
      })
    },
    getTags() {
      this.$axios.get(`${this.$tags}?type=photos`).then(({data}) => {
        this.tagsItem = data.data
      })
    },
    commentForm(text,id) {
      this.ordPayload.text = text
      this.ordPayload.id = id
      this.photoPayload.comment = 0
      this.temp_comment = 0
      this.editComment = 1
    },
    variableDrawer() {
      this.isEdit = false
      setTimeout(() => {
        this.isEdit = 1
      }, 500);
    },
    saveComment() {
      if(this.ordPayload.text){
        if(this.ordPayload.id){
          this.$emit('updateComment', this.ordPayload)
        }else{
          this.commentPayload.text = this.ordPayload.text
          this.commentPayload.commentable_id = this.photoPayload.id
          this.$emit('addComment', this.commentPayload)
        }
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
    comment(val) {
      if(val){
        this.temp_comment = val
        this.ordPayload.text = this.temp_comment.text
      }else{
        this.editComment = 2
      }
    },
    drawerStatus(val) {
      if(val) this.drawer = val
    },
    drawer(val) {
      if(this.originalPayload) {
        this.photoPayload = this.cloneVariable(this.originalPayload)
      }

      if(!val) {
        this.$emit('closeDrawer')
        this.commentPayload.text = null
        this.ordPayload.text = null
      }else{
        this.isEdit = 1
      }
      //console.log(val, 'form drawer')
      this.id = this.$route.params.id
    },
    selectedItem: {
      handler(val) {
        if (!this.originalPayload) {
          this.originalPayload = this.cloneVariable(this.photoPayload)
        }
        this.isEdit = 2
        this.editComment = 2
        this.temp_comment = []
        this.photoPayload = this.cloneVariable(val)
      },
      deep:true
    }
  }
}
</script>