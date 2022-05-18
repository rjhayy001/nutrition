<template>
   <v-navigation-drawer
    temporary
    right
    persistent
    fixed
    v-model="drawer"
    width="40%"
     hide-overlay
  >
    <p class="form-title pa-2 title font-weight-regular text-uppercase d-flex justify-space-between pl-4">
      {{linkPayload.id ?  'Edit' : 'Add New'}} Links
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
            <v-flex xs12 sm5>
              <ValidationProvider slim name="title" rules="required|min:1|max:100" v-slot="{ errors }">
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    <span>*</span>
                    Title
                  </p>
                  <v-text-field
                    v-model="linkPayload.title"
                    placeholder="Type title ..."
                    type="text"
                    hide-details="auto"
                    solo
                    :error-messages="errors"
                  ></v-text-field>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 sm5>
              <ValidationProvider slim name="link" rules="required|min:1" v-slot="{ errors }">
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    <span>*</span>
                    Link
                  </p>
                  <v-text-field
                    v-model="linkPayload.link"
                    placeholder="Type or Paste Link ..."
                    type="text"
                    hide-details="auto"
                    solo
                    :error-messages="errors"
                  ></v-text-field>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 sm2>
              <div class="mb-1">
                <p class="subtitle-2 font-weight-regular mb-2">
                  Status
                </p>
                <v-select
                  v-model="linkPayload.status"
                  :items="statusOptions"
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
                    v-model="linkPayload.description"
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
                {{linkPayload.id ? 'UPDATE' : 'SAVE'}}
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
      drawer:false,
      linkPayload: {
        title:'',
        description:'',
        links:'',
        status:1,
      },
      statusOptions:[
        {id:1, text:'Yes'},
        {id:0, text:'No'}
      ],
      originalPayload:null
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
        if (this.linkPayload.id) {
            this.$emit('updateRecord', this.linkPayload)
          } else {
            this.$emit('addRecord', this.linkPayload)
          }
      })
    }
  },
  watch: {
    drawerStatus(val) {
      if(val) this.drawer = val
    },
    drawer(val) {
      if(this.originalPayload) {
        this.linkPayload = this.cloneVariable(this.originalPayload)
      }

      if(!val) {
        this.$emit('closeDrawer')
      }
    },
    selectedItem: {
      handler(val) {
        if (!this.originalPayload) {
          this.originalPayload = this.cloneVariable(this.linkPayload)
        }
        this.linkPayload = this.cloneVariable(val)
      },
      deep:true
    }
  }
}
</script>
