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
      {{countryPayload.id ? 'Add new' : 'Edit'}} Country
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
              <ValidationProvider slim name="short name" rules="required|min:1|max:100" v-slot="{ errors }">
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    <span>*</span>
                    Short Name
                  </p>
                  <v-text-field
                    v-model="countryPayload.short_name"
                    placeholder="Type short name..."
                    type="text"
                    hide-details="auto"
                    solo
                    :error-messages="errors"
                  ></v-text-field>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 sm6>
              <ValidationProvider slim name="long name" rules="required|min:1|max:100" v-slot="{ errors }">
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    <span>*</span>
                    Long Name
                  </p>
                  <v-text-field
                    v-model="countryPayload.long_name"
                    placeholder="Type long name..."
                    type="text"
                    hide-details="auto"
                    solo
                    :error-messages="errors"
                  ></v-text-field>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 sm6>
              <ValidationProvider slim name="code" rules="numeric" v-slot="{ errors }">
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    Code
                  </p>
                  <v-text-field
                    v-model="countryPayload.country_numcode"
                    placeholder="Type code..."
                    type="number"
                    hide-details="auto"
                    solo
                    :error-messages="errors"
                  ></v-text-field>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 sm6>
              <ValidationProvider slim name="is_default" v-slot="{ errors }">
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    Default
                  </p>
                  <v-select
                    v-model="countryPayload.is_default"
                    :items="DefaultOptions"
                    hide-details="auto"
                    solo
                    item-text="text"
                    item-value="id"
                  ></v-select>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <v-btn class="success mt-1" block type="submit">
                <v-icon>mdi-content-save-outline</v-icon>
                {{countryPayload.id ? 'UPDATE' : 'SAVE'}}
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
      countryPayload: {
        short_name:'',
        long_name:'',
        country_numcode:'',
        is_default:0,
      },
      DefaultOptions:[
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
        if (this.countryPayload.id) {
          this.$emit('updateRecord', this.countryPayload)
        } else {
          this.$emit('addRecord', this.countryPayload)
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
        this.countryPayload = this.cloneVariable(this.originalPayload)
      }

      if(!val) {
        this.$emit('closeDrawer')
      }
    },
    selectedItem: {
      handler(val) {
        if (!this.originalPayload) {
          this.originalPayload = this.cloneVariable(this.countryPayload)
        }
        this.countryPayload = this.cloneVariable(val)
      },
      deep:true
    }
  }
}
</script>