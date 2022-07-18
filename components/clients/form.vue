<template>
  <div>
    <tag-form-drawer 
      :tagDrawer="tagDrawer"
      @closeDrawer="tagDrawer =false"
      @addRecord="addTagRecord($event)"
      @updateRecord="updateRecord($event)"
      :selectedItem="selectedItem"
    ></tag-form-drawer>
    <group-form-drawer 
      :groupDrawer="groupDrawer"
      @closeDrawer="groupDrawer =false"
      @addRecord="addGroupRecord($event)"
      @updateRecord="updateRecord($event)"
      :selectedItem="selectedItem"
    ></group-form-drawer>
    <ValidationObserver ref="form">
      <v-form class="form-box" @submit.prevent="saveForm">
        <v-container grid-list-md fluid>
          <v-layout row wrap>
            <v-flex xs12 class="mb-2">
              <div class="d-flex align-center py-2 data-table-cus">
                <p class="title mr-1">
                  {{ payload.id ? this.$t('clients.profile') : this.$t('clients.createNewClient') }}
                </p>
                <!-- <v-spacer></v-spacer>
                <v-btn class="mr-1" small @click="$router.go('-1')">
                  <v-icon>mdi-arrow-left</v-icon>
                  BACK
                </v-btn> -->
              </div>
              <hr />
            </v-flex>
          </v-layout>
          <v-layout row wrap gap>
            <v-flex xs6 px-5>
              <v-layout row wrap>
                <v-flex xs12>
                  <p class="subtitle-1 font-weight-medium">INFORMATIONS</p>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider
                    slim
                    name="first_name"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span :hidden="!enableEdit">*</span>
                        {{ $t('clients.firstName') }}
                      </p>
                      <v-text-field
                        flat
                        dense
                        filled
                        type="text"
                        name="first_name"
                        :placeholder="$t('clients.typeFirstName')"
                        hide-details="auto"
                        class="text-capitalize"
                        v-model="payload.first_name"
                        :disabled="!enableEdit"
                        :error-messages="errors"
                      ></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider 
                    slim
                    name="last_name"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">{{ $t('clients.lastName') }}</p>
                      <v-text-field
                        flat
                        dense
                        filled
                        type="text"
                        name="last_name"
                        hide-details="auto"
                        class="text-capitalize"
                        v-model="payload.last_name"
                        :placeholder="$t('clients.typeLastName')"
                        :disabled="!enableEdit"
                        :error-messages="errors"
                      ></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span :hidden="!enableEdit">*</span>
                        {{ $t('clients.phone') }} #1
                      </p>
                      <v-text-field
                        flat
                        dense
                        filled
                        type="text"
                        name="phone_1"
                        :placeholder="$t('clients.typeYourMobile')"
                        hide-details="auto"
                        v-model="payload.phone_1"
                        :disabled="!enableEdit"
                      ></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">{{ $t('clients.phone') }} #2</p>
                      <v-text-field
                        flat
                        dense
                        filled
                        type="text"
                        name="phone_2"
                        :placeholder="$t('clients.typeYourMobile')"
                        hide-details="auto"
                        v-model="payload.phone_2"
                        :disabled="!enableEdit"
                      ></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span :hidden="!enableEdit">*</span>
                        {{ $t('clients.email') }}
                      </p>
                      <v-text-field
                        flat
                        dense
                        filled
                        type="text"
                        name="email_1"
                        :placeholder="$t('clients.typeYourEmail')"
                        hide-details="auto"
                        v-model="payload.email"
                        :disabled="!enableEdit"
                      ></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <custom-datepicker @birthday="birthday" :birthday="payload.birthday" :disable="enableEdit"></custom-datepicker>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12>
                  <p class="subtitle-1 font-weight-medium">{{ $t('clients.loginCredential') }}</p>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        {{ $t('clients.email') }}/{{ $t('clients.username') }}
                      </p>
                      <v-text-field
                        flat
                        dense
                        filled
                        type="text"
                        name="email_2"
                        hide-details="auto"
                        v-model="payload.email"
                        :disabled="!enableEdit"
                        :placeholder="$t('clients.typeEmailOrUsername')"
                      ></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">Password</p>
                      <v-text-field
                        flat
                        dense
                        filled
                        name="password"
                        hide-details="auto"
                        v-model="payload.password"
                        @click:append="viewPassword = !viewPassword"
                        :disabled="!enableEdit"
                        :type="viewPassword ? 'text' : 'password'"
                        :placeholder="$t('clients.typeYourPassword')"
                        :append-icon="viewPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                      ></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12>
                  <p class="subtitle-1 font-weight-medium">{{ $t('clients.address') }}</p>
                </v-flex>
                <v-flex xs12>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span :hidden="!enableEdit">*</span>
                        {{ $t('clients.address') }}
                      </p>
                      <v-text-field
                        flat
                        dense
                        filled
                        type="text"
                        name="address_1"
                        hide-details="auto"
                        v-model="payload.address_1"
                        :disabled="!enableEdit"
                        :placeholder="$t('clients.typeYourAddress')"
                      ></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        {{ $t('clients.additionalAddress') }}
                      </p>
                      <v-textarea
                        flat
                        dense
                        filled
                        rows="2"
                        type="text"
                        name="address_2"
                        hide-details="auto"
                        v-model="payload.address_2"
                        :disabled="!enableEdit"
                        :placeholder="$t('clients.typeYourAddAddress')"
                      ></v-textarea>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span :hidden="!enableEdit">*</span>
                        {{ $t('clients.city') }}
                      </p>
                      <v-combobox
                        flat
                        dense
                        filled
                        item-value="id"
                        deletable-chips
                        item-text="name"
                        hide-details="auto"
                        v-model="payload.city_id"
                        :items="cities"
                        :disabled="!enableEdit"
                      ></v-combobox>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span :hidden="!enableEdit">*</span>
                        {{ $t('clients.zipcode') }}
                      </p>
                      <v-combobox
                        flat
                        dense
                        filled
                        item-value="id"
                        item-text="code"
                        hide-details="auto"
                        v-model="payload.zipcode_id"
                        :items="zipcodes"
                        :disabled="!enableEdit"
                      ></v-combobox>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12 class="mb-8">
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span :hidden="!enableEdit">*</span>
                        {{ $t('clients.country') }}
                      </p>
                      <v-combobox
                        flat
                        dense
                        filled
                        name="country"
                        item-value="id"
                        hide-details="auto"
                        item-text="short_name"
                        v-model="payload.country_id"
                        :items="countries"
                        :disabled="!enableEdit"
                      ></v-combobox>
                    </div>
                  </ValidationProvider>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs6 class="py-0 px-5" style="position:relative">
              <v-layout row wrap>
                <v-flex xs12>
                  <p class="subtitle-1 font-weight-medium">{{ $t('clients.profile') }}</p>
                </v-flex>
                <v-flex xs12>
                  <div class="profile-box">
                    <div class="mb-2">
                      <v-img
                        height="200px"
                        width="200px"
                        class="my-0 mx-auto"
                        :src="payload.logo || '/images/empty_person.png'"
                      ></v-img>
                    </div>
                    <v-btn
                      small
                      outlined
                      color="success"
                      :disabled="!enableEdit"
                      @click="handleFileImport"
                    >
                      <v-icon>mdi-upload-outline</v-icon>
                      {{ $t('global.uploadPhoto') }}
                    </v-btn>
                    <input
                      type="file"
                      ref="uploader"
                      class="d-none"
                      accept="image/png, image/gif, image/jpeg"
                      @change="onFileChange"
                    />
                  </div>
                </v-flex>
                <v-flex xs12>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">Tags</p>
                      <v-autocomplete
                        flat
                        dense
                        filled
                        multiple
                        item-value="id"
                        item-text="name"
                        hide-details="auto"
                        prepend-inner-icon="mdi-plus"
                        v-model="payload.taggable"
                        :items="tagsOption"
                        :disabled="!enableEdit"
                        :placeholder="$t('clients.selectTags')"
                        @click:prepend-inner.stop="tagDrawer = true"
                      ></v-autocomplete>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">{{ $t('clients.groups') }}</p>
                      <v-autocomplete
                        flat
                        dense
                        filled
                        multiple
                        item-value="id"
                        item-text="name"
                        hide-details="auto"
                        prepend-inner-icon="mdi-plus"
                        v-model="payload.groupable"
                        :items="groupsOption"
                        :disabled="!enableEdit"
                        :placeholder="$t('clients.selectGroups')"
                        @click:prepend-inner.stop="groupDrawer = true"
                      >
                      </v-autocomplete>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">{{ $t('clients.status') }}</p>
                      <v-select
                        flat
                        dense
                        filled
                        item-value="id"
                        item-text="name"
                        hide-details="auto"
                        v-model="payload.status"
                        :items="statusOptions"
                        :disabled="!enableEdit"
                      ></v-select>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12 style="position:absolute; bottom:0; right:25px">
                  <div v-if="payload.id">
                    <div v-if="this.enableEdit">
                      <v-btn v-if="this.enableEdit" @click="cancelBtn">
                        <v-icon>mdi-content-save-outline</v-icon>
                        {{ this.$t('global.cancel') }}
                      </v-btn>
                      <v-btn v-if="this.enableEdit" class="success ml-5" type="submit">
                        <v-icon>mdi-content-save-outline</v-icon>
                        {{ this.$t('global.update') }}
                      </v-btn>
                    </div>
                    <div v-else>
                      <v-btn class="success" @click="editBtn">
                        <v-icon>mdi-content-save-outline</v-icon>
                        {{ this.$t('global.edit') }}
                      </v-btn>
                    </div>
                  </div>
                  <div v-else>
                    <v-btn class="success" type="submit">
                      <v-icon>mdi-content-save-outline</v-icon>
                      {{ this.$t('global.save') }}
                    </v-btn>
                  </div>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </ValidationObserver>
  </div>
</template>
<script>
import tagFormDrawer from "~/components/tag/form.vue";
import groupFormDrawer from "~/components/group/form.vue";
import customDatepicker from '~/components/ui/custom-datepicker.vue'
export default {
  components: {tagFormDrawer, groupFormDrawer, customDatepicker},

  data() {
    return {
      payload: {
        first_name: "",
        last_name: "",
        phone_1: "",
        phone_2: "",
        birthday: "",
        email: "",
        password: "",
        logo: "",
        address_1: "",
        address_2: "",
        city_id: "",
        zipcode_id: "",
        country_id: "",
        status: 1,
        taggable: [],
        groupable: [],
      },
      modal: false,
      viewPassword: false,
      originalPayload: {},
      statusOptions: [
        { id: 1, name: this.$t('global.active') },
        { id: 0, name: this.$t('global.inActive') },
      ],
      tagDrawer: false,
      groupDrawer: false,
      tagsOption: [],
      groupsOption: [],
      countries: [],
      cities: [],
      zipcodes: [],
      enableEdit: '',
    };
  },
  props: {
    selectedItem: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    selectedItem: {
      handler(val) {
        if (!this.originalPayload) {
          this.originalPayload = this.cloneVariable(this.payload);
        }
        if (!val) return;
        this.payload = this.cloneVariable(val);
        this.enableEdit=false
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.initialize();
    
    if(!this.payload.id) {
      this.enableEdit=true
    }

  },
  methods: {
    saveForm() {
      this.$refs.form.validate().then((result) => {
        if (!result) return;
        if (this.payload.id) {
          this.$emit("updateRecord", this.payload);
        } else {
          this.$emit("addRecord", this.payload);
        }
      });
    },
    initialize() {
      this.getAllCountries();
      this.getAllZipcodes();
      this.getAllCities();
      this.getAllTags();
      this.getAllGroups();
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
        this.payload.logo = e.target.result;
      };
      if(file) {
        reader.readAsDataURL(file);
      }
    },
    getAllCountries() {
      this.$axios.get(`${this.$countries}??no-paginate=''`).then(({data}) => {
        this.countries = data.data
      })

      // this.$store.dispatch("address/FETCH_COUNTRIES").then(({ data }) => {
      //   this.countries = data;
      // });
    },
    getAllZipcodes() {
      this.$axios.get(`${this.$zipcodes}??no-paginate=''`).then(({data}) => {
        this.zipcodes = data.data
      })

      // this.$store.dispatch("address/FETCH_ZIPCODES").then(({ data }) => {
      //   console.log(data,"zip")
      // });
    },
    getAllCities() {
      this.$axios.get(`${this.$cities}?no-paginate=''`).then(({data}) => {
        this.cities = data.data
      })

      // this.$store.dispatch("address/FETCH_CITIES").then(({ data }) => {
      //   this.cities = data;
      // });
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
    editBtn() {
      this.enableEdit=true
    },
    cancelBtn() {
      this.$emit('reload')
    },
    birthday(date) {
      this.payload.birthday = date;
    }
  },
};
</script>
