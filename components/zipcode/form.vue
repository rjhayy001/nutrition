<template>
   <v-navigation-drawer
    temporary
    right
    fixed
    v-model="drawer"
    width="40%"
  >
    <p class="form-title pa-2 title font-weight-regular text-uppercase d-flex justify-space-between">
      {{payload.id ? 'Add new' : 'Edit'}} Zipcode
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
              <ValidationProvider slim name="code" rules="required|min:1|max:100" v-slot="{ errors }">
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    <span>*</span>
                    Code
                  </p>
                  <v-text-field
                    v-model="payload.code"
                    placeholder="Type name..."
                    type="number"
                    hide-details="auto"
                    solo
                    :error-messages="errors"
                  ></v-text-field>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <ValidationProvider slim name="city" rules="required" v-slot="{ errors }">
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    <span>*</span>
                    Cities
                  </p>
                  <v-combobox
                    v-model="payload.cities"
                    :items="cities"
                    hide-details="auto"
                    solo
                    multiple
                    chips
                    deletable-chips
                    item-text="name"
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
        zipcodes:'',
      },
      cities:[],
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
        this.$root.dialog(
          "Confirm add Action!",
          `Are you sure you want to add this record ?`,
          "add"
        ).then(() => {
          this.payload.cities = this.payload.cities.map((city) => city.id)
          if (this.payload.id) {
            this.$emit('updateRecord', this.payload)
          } else {
            this.$emit('addRecord', this.payload)
          }
        });
      })
    },
    getAllCities() {
      this.$store.dispatch('address/FETCH_CITIES').then(({data}) => {
        this.cities = data
      })
    }
  },
  watch: {
    drawerStatus(val) {
      if(val) {
        this.drawer = val
        this.getAllCities()
      }
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