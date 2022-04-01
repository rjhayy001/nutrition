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
      {{payload.id ? 'Add new' : 'Edit'}} City
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
                    v-model="payload.name"
                    placeholder="Type name..."
                    type="text"
                    hide-details="auto"
                    solo
                    :error-messages="errors"
                  ></v-text-field>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 sm6>
              <ValidationProvider slim name="Country" rules="required" v-slot="{ errors }">
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    <span>*</span>
                    Country
                  </p>
                  <v-combobox
                    v-model="payload.country_id"
                    :items="countries"
                    hide-details="auto"
                    solo
                    item-text="long_name"
                    item-value="id"
                    :error-messages="errors"
                  ></v-combobox>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <ValidationProvider slim name="code" rules="min:1|max:100" v-slot="{ errors }">
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    Zipcodes
                  </p>
                  <v-combobox
                    v-model="payload.zipcodes"
                    :items="zipcodes"
                    hide-details="auto"
                    solo
                    multiple
                    chips
                    type="number"
                    item-text="text"
                    item-value="id"
                    :error-messages="errors"
                  ></v-combobox>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <v-btn class="success mt-1" block type="submit">
                <v-icon>mdi-content-save-outline</v-icon>
                {{payload.id ? 'UPDATE' : 'SAVE'}}
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
      payload: {
        name:'',
        country_id:'',
        zipcodes:'',
      },
      countries:[],
      zipcodes:[],
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
  mounted() {
    this.getAllCountries()
    this.getAllZipcodes()
  },
  methods: {
    saveForm() {
      this.$refs.form.validate().then(result => {
        if (!result) return
        this.payload.country_id = this.payload.country_id.id
        if (this.payload.id) {
          this.$emit('updateRecord', this.payload)
        } else {
          this.$emit('addRecord', this.payload)
        }
      })
    },
    getAllCountries() {
      this.$store.dispatch('address/FETCH_COUNTRIES').then(({data}) => {
        this.countries = data
      })
    },
    getAllZipcodes() {
      this.$store.dispatch('address/FETCH_ZIPCODES').then(({data}) => {
        this.zipcodes = data
      })
    }
  },
  watch: {
    drawerStatus(val) {
      if(val) this.drawer = val
    },
    drawer(val) {
      if(this.originalPayload) {
        this.payload = this.cloneVariable(this.originalPayload)
      }
      if(!val) this.$emit('closeDrawer')
    },
    selectedItem: {
      handler(val) {
        if (!this.originalPayload) {
          this.originalPayload = this.cloneVariable(this.payload)
        }
        val.country_id = val.country
        this.payload = this.cloneVariable(val)
      },
      deep:true
    }
  }
}
</script>