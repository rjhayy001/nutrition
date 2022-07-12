<template>
   <v-navigation-drawer
    temporary
    right
    fixed
    v-model="drawer"
    width="40%"
    hide-overlay
  >
    <p class="form-title pa-2 title font-weight-regular text-uppercase d-flex justify-space-between">
      {{groupPayload.id ? 'Add new' : 'Edit'}} Groups
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
            <v-flex xs12 sm6>
              <ValidationProvider slim name="name" rules="required|min:1|max:100" v-slot="{ errors }">
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    <span>*</span>
                    Name
                  </p>
                  <v-text-field
                    v-model="groupPayload.name"
                    placeholder="Type group name..."
                    type="text"
                    hide-details="auto"
                    solo
                    :error-messages="errors"
                  ></v-text-field>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <v-btn class="success mt-1" block type="submit">
                <v-icon>mdi-content-save-outline</v-icon>
                {{groupPayload.id ? 'UPDATE' : 'SAVE'}}
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
      groupPayload: {
        name:''
      },
      DefaultOptions:[
        {id:1, text:'Yes'},
        {id:0, text:'No'}
      ],
      originalPayload:null
    }
  },
  props: {
    groupDrawer: {
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
        this.$root.dialog(
          "Confirm add Action!",
          `Are you sure you want to add this record ?`,
          "add"
        ).then(() => {
          if (this.groupPayload.id) {
            this.$emit('updateRecord', this.groupPayload)
          } else {
            this.$emit('addRecord', this.groupPayload)
          }
        });
      })
    }
  },
  watch: {
    groupDrawer(val) {
      if(val) this.drawer = val
    },
    drawer(val) {
      if(this.originalPayload) {
        this.groupPayload = this.cloneVariable(this.originalPayload)
      }

      if(!val) {
        this.$emit('closeDrawer')
      }
    },
    selectedItem: {
      handler(val) {
        if (!this.originalPayload) {
          this.originalPayload = this.cloneVariable(this.groupPayload)
        }
        this.groupPayload = this.cloneVariable(val)
      },
      deep:true
    }
  }
}
</script>
