<template>
  <div class="mt-6">
    <ValidationObserver ref="form">
      <v-form class="form-box" @submit.prevent="saveForm">
        <v-container grid-list-md fluid>
          <v-layout row wrap gap>
            <v-flex xs6 px-5>
              <v-layout row wrap>
                <v-flex xs12>
                  <p class="subtitle-1 font-weight-medium">INFORMATIONS</p>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim name="first_name" rules="required" v-slot="{ errors }">
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span>* First Name</span>
                      </p>
                      <v-text-field flat dense filled type="text" name="first_name" hide-details="auto"
                        class="text-capitalize" v-model="payload.first_name" :error-messages="errors"></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim name="last_name" rules="required" v-slot="{ errors }">
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">Last Name</p>
                      <v-text-field flat dense filled type="text" name="last_name" hide-details="auto"
                        class="text-capitalize" v-model="payload.last_name" :error-messages="errors"></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span>* Phone #1</span>
                      </p>
                      <v-text-field flat dense filled type="text" name="phone_1" hide-details="auto"
                        v-model="payload.phone_1"></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">Phone #2</p>
                      <v-text-field flat dense filled type="text" name="phone_2" hide-details="auto"
                        v-model="payload.phone_2"></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span>* Email</span>
                      </p>
                      <v-text-field flat dense filled type="text" name="email" hide-details="auto"
                        v-model="payload.email"></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <custom-datepicker @birthday="birthday" :birthday="date" :disable="true"></custom-datepicker>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12>
                  <p class="subtitle-1 font-weight-medium">Address</p>
                </v-flex>
                <v-flex xs12>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span>* Address</span>
                      </p>
                      <v-text-field flat dense filled type="text" name="address_1" hide-details="auto"
                        v-model="payload.address_1"></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        * Additional Address
                      </p>
                      <v-textarea flat dense filled rows="2" type="text" name="address_2" hide-details="auto"
                        v-model="payload.address_2"></v-textarea>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span>* City</span>
                      </p>
                      <v-combobox flat dense filled item-value="id" deletable-chips item-text="name" hide-details="auto"
                        v-model="payload.city" :items="cities"></v-combobox>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span>* Zipcode</span>
                      </p>
                      <v-combobox flat dense filled item-value="id" item-text="code" hide-details="auto"
                        v-model="payload.zipcode" :items="zipcodes"></v-combobox>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12 class="mb-8">
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span>* Country</span>
                      </p>
                      <v-combobox flat dense filled name="country" item-value="id" hide-details="auto"
                        item-text="short_name" v-model="payload.country" :items="countries">
                      </v-combobox>
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
                      <v-img height="200px" width="200px" class="my-0 mx-auto"
                        :src="payload.logo || '/images/empty_person.png'"></v-img>
                    </div>
                    <v-btn small outlined color="success" @click="handleFileImport">
                      <v-icon>mdi-upload-outline</v-icon>
                      {{ $t('global.uploadPhoto') }}
                    </v-btn>
                    <input type="file" ref="uploader" class="d-none" accept="image/png, image/gif, image/jpeg"
                      @change="onFileChange" />
                  </div>
                </v-flex>
                <v-flex xs12>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">Tags</p>
                      <v-autocomplete flat dense filled multiple item-value="id" item-text="name" hide-details="auto"
                        prepend-inner-icon="mdi-plus" v-model="payload.taggable" :items="tagsOption"
                        :placeholder="$t('clients.selectTags')"></v-autocomplete>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">{{ $t('clients.groups') }}</p>
                      <v-autocomplete flat dense filled multiple item-value="id" item-text="name" hide-details="auto"
                        prepend-inner-icon="mdi-plus" v-model="payload.groupable" :items="groupsOption"
                        :placeholder="$t('clients.selectGroups')">
                      </v-autocomplete>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">{{ $t('clients.status') }}</p>
                      <v-select flat dense filled item-value="id" item-text="name" hide-details="auto"
                        v-model="payload.status" :items="statusOptions"></v-select>
                    </div>
                  </ValidationProvider>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <div class="float-right mr-4">
                <v-btn class="success" type="submit">
                  <v-icon>mdi-content-save-outline</v-icon>
                  {{ this.$t('global.save') }}
                </v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </ValidationObserver>
  </div>
</template>
<script>
import customDatepicker from '~/components/ui/custom-datepicker.vue'
export default {
  components: { customDatepicker },

  data() {
    return {
      date: '',
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
      originalPayload: {},
      statusOptions: [
        { id: 1, name: this.$t('global.active') },
        { id: 0, name: this.$t('global.inActive') },
      ],
      tagsOption: [],
      groupsOption: [],
      countries: [],
      cities: [],
      zipcodes: [],
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    saveForm() {
      this.payload.city_id = this.payload.city.id
      this.payload.zipcode_id = this.payload.zipcode.id
      this.payload.country_id = this.payload.country.id
      this.$refs.form.validate().then((result) => {
        if (!result) return;
        if (result) {
          this.$axios
            .put(`${this.$coaches}/${this.$auth.user.id}`, this.payload)
            .then(({ data }) => {
              console.log(data)
              this.fullNotification('Your Changes have been succesfuly saved!')
            });
        }
      });
    },
    initialize() {
      this.getAllCountries();
      this.getAllZipcodes();
      this.getAllCities();
      this.getAllTags();
      this.getAllGroups();
      this.getCoachInfo();
    },
    getCoachInfo() {
      this.$axios
        .get(
          `${this.$coaches}/${this.$auth.user.id}/edit?relations=country,city,zipcode,taggable,groupable`
        )
        .then(({ data }) => {
          this.payload = data;
          this.date = data.birthday;
        });
    },
    handleFileImport() {
      window.addEventListener("focus", () => { }, { once: true });
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
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    getAllCountries() {
      this.$axios.get(`${this.$countries}??no-paginate=''`).then(({ data }) => {
        this.countries = data.data
      })
    },
    getAllZipcodes() {
      this.$axios.get(`${this.$zipcodes}??no-paginate=''`).then(({ data }) => {
        this.zipcodes = data.data
      })
    },
    getAllCities() {
      this.$axios.get(`${this.$cities}?no-paginate=''`).then(({ data }) => {
        this.cities = data.data
      })
    },
    getAllTags() {
      this.$axios.get(`${this.$tags}?no-paginate=''`).then(({ data }) => {
        this.tagsOption = data.data
      })
    },
    getAllGroups() {
      this.$axios.get(`${this.$groups}?no-paginate=''`).then(({ data }) => {
        this.groupsOption = data.data
      })
    },
    addTagRecord(payload) {
      this.create().then(() => {
        this.$axios.post(`${this.$tags}`, payload).then(({ data }) => {
          this.Notification(data, 'added', '', '', 'name')
          this.getAllTags()
        })
      })
    },
    addGroupRecord(payload) {
      this.create().then(() => {
        this.$axios.post(`${this.$groups}`, payload).then(({ data }) => {
          this.successNotification(data, 'added', '', '', 'name')
          this.getAllGroups()
        })
      })
    },
    editBtn() {
      this.enableEdit = true
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
