<template>
  <div class="main-wrapper pt-6">
    <validationObserver ref="form">
      <v-form ref="form" @submit.prevent="saveForm()">
        <div class="mb-6">
          <v-row>
            <v-flex xs12>
              <h2>PROFILE INFORMATIONS</h2>
            </v-flex>
          </v-row>
        </div>
        <!-- Upper Section -->
        <div class="upper-section-wrapper">
          <v-row>
            <!-- First Column of Upper Section -->
            <v-flex xs4>
              <div class="pr-1">
                <!-- First Name -->
                <validationProvider name="First Name" rules="required" v-slot="{ errors }">
                  <div class="mb-2">
                    <span class="field-title">First Name:</span>
                  </div>
                  <v-text-field class="mb-4" v-model="payload.first_name" hide-details="auto" outlined
                    :error-messages="errors">
                  </v-text-field>
                </validationProvider>
                <!-- Phone 1 -->
                <validationProvider name="Phone 1" rules="required" v-slot="{ errors }">
                  <div class="mb-2">
                    <span class="field-title">Phone #1:</span>
                  </div>
                  <v-text-field class="mb-4" v-model="payload.phone_1" hide-details="auto" outlined
                    :error-messages="errors">
                  </v-text-field>
                </validationProvider>
                <!-- Email  -->
                <validationProvider name="Email" rules="required" v-slot="{ errors }">
                  <div class="mb-2">
                    <span class="field-title">Email:</span>
                  </div>
                  <v-text-field class="mb-4" v-model="payload.email" hide-details="auto" outlined
                    :error-messages="errors">
                  </v-text-field>
                </validationProvider>
              </div>
            </v-flex>
            <!-- Second Column of Upper Section -->
            <v-flex xs4>
              <div class="pr-1">
                <!-- Last Name -->
                <validationProvider name="Last Name" rules="required" v-slot="{ errors }">
                  <div class="mb-2">
                    <span class="field-title">Last Name:</span>
                  </div>
                  <v-text-field class="mb-4" v-model="payload.last_name" hide-details="auto" outlined
                    :error-messages="errors">
                  </v-text-field>
                </validationProvider>
                <!-- Phone 2 -->
                <validationProvider name="Phone 2" rules="required" v-slot="{ errors }">
                  <div class="mb-2">
                    <span class="field-title">Phone #2:</span>
                  </div>
                  <v-text-field class="mb-4" v-model="payload.phone_2" hide-details="auto" outlined
                    :error-messages="errors">
                  </v-text-field>
                </validationProvider>
                <!-- Birthday -->
                <validationProvider name="Birthday" rules="required" v-slot="{ errors }">
                  <div class="mb-2">
                    <span class="field-title">Date of Birth:</span>
                  </div>
                  <v-dialog ref="dialog" v-model="modal" :return-value.sync="payload.birthday" persistent width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="payload.birthday" outlined label="Choose date of birth"
                        prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="payload.birthday" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal = false">
                        Cancel
                      </v-btn>
                      <v-btn text color="primary" @click="$refs.dialog.save(payload.birthday)">
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </validationProvider>
              </div>
            </v-flex>
            <!-- Third Column of Upper Section -->
            <v-flex xs4>
              <div class="ml-4 pt-6">
                <!-- Profile Picture -->
                <div class="profile-box pt-3">
                  <div class="mb-2">
                    <v-img height="200px" width="200px" class="my-0 mx-auto"
                      :src="payload.logo || '/images/empty_person.png'" style="border: 1px solid black">
                    </v-img>
                  </div>
                  <v-btn color="success" outlined @click="handleFileImport" class="ml-2" width="205">
                    <v-icon>mdi-upload-outline</v-icon>
                    upload photo
                  </v-btn>
                  <input accept="image/png, image/gif, image/jpeg" ref="uploader" type="file" @change="onFileChange"
                    class="d-none" />
                </div>
              </div>
            </v-flex>
          </v-row>
        </div>
        <!-- End of Upper Section -->
        <!-- Lower Section -->
        <div class="lower-section-wrapper">
          <!-- Address 1, 2 -->
          <div>
            <v-row>
              <v-flex xs12>
                <!-- Address 1 -->
                <validationProvider name="Address 1" rules="required" v-slot="{ errors }">
                  <div class="mb-2">
                    <span class="field-title">Address #1:</span>
                  </div>
                  <v-text-field class="mb-4" v-model="payload.address_1" hide-details="auto" outlined
                    :error-messages="errors">
                  </v-text-field>
                </validationProvider>
                <!-- Address 2 -->
                <validationProvider name="Address 2" rules="required" v-slot="{ errors }">
                  <div class="mb-2">
                    <span class="field-title">Address #2:</span>
                  </div>
                  <v-text-field class="mb-4" v-model="payload.address_2" hide-details="auto" outlined
                    :error-messages="errors">
                  </v-text-field>
                </validationProvider>
              </v-flex>
            </v-row>
          </div>
          <!-- City, Zipcode -->
          <div>
            <v-row>
              <v-flex xs6>
                <!-- City -->
                <validationProvider name="City" rules="required" v-slot="{ errors }">
                  <div class="mb-2">
                    <span class="field-title">City:</span>
                  </div>
                  <v-combobox class="mb-4" v-model="payload.city" :items="cities" hide-details="auto" outlined
                    deletable-chips item-text="name" item-value="id">
                  </v-combobox>
                </validationProvider>
              </v-flex>
              <v-flex xs6>
                <!-- Zipcode -->
                <validationProvider name="Zipcode" rules="required" v-slot="{ errors }">
                  <div class="mb-2">
                    <span class="field-title">Zipcode:</span>
                  </div>
                  <v-combobox class="mb-4" v-model="payload.zipcode" :items="zipcodes" hide-details="auto" outlined
                    deletable-chips item-text="code" item-value="id">
                  </v-combobox>
                </validationProvider>
              </v-flex>
            </v-row>
          </div>
          <!-- Country -->
          <div>
            <v-row>
              <v-flex xs12>
                <!-- Coutry -->
                <validationProvider name="Country" rules="required" v-slot="{ errors }">
                  <div class="mb-2">
                    <span class="field-title">Country:</span>
                  </div>
                  <v-combobox class="mb-4" v-model="payload.country" :items="countries" hide-details="auto" outlined
                    deletable-chips item-text="short_name" item-value="id">
                  </v-combobox>
                </validationProvider>
              </v-flex>
            </v-row>
          </div>
        </div>
        <!-- Submit Button -->
        <div>
          <v-row>
            <v-flex xs12>
              <v-btn class="mt-2 mb-2 save-btn" color="success" type="submit">
                <v-icon class="pr-1 icon">
                  mdi-content-save-outline
                </v-icon>
                Save Changes
              </v-btn>
            </v-flex>
          </v-row>
        </div>
      </v-form>
    </validationObserver>
  </div>
</template>
<script>
import { tsParenthesizedType } from '@babel/types'

export default {
  data() {
    return {
      payload: {
        first_name: "",
        last_name: "",
        phone_1: "",
        phone_2: "",
        email: "",
        birthday: "",
        address_1: "",
        address_2: "",
        city: "",
        zipcode: "",
        country: "",
        logo: ""
      },
      modal: false,
      cities: [],
      zipcodes: [],
      countries: [],
    }
  },
  created() {
    this.getAllCountries()
    this.getAllZipcodes()
    this.getAllCities()
    this.getCoachInfo()
  },
  methods: {
    saveForm() {
      this.$refs.form.validate().then((result) => {
        if (!result) return;
        if (result) {
          this.$axios
            .put(`${this.$coaches}/${this.$auth.user.id}`, this.payload)
            .then(({ data }) => {
              this.fullNotification('Success')
            });
        }
      });
    },
    getCoachInfo() {
      this.$axios
        .get(
          `${this.$coaches}/${this.$auth.user.id}/edit?relations=country,city,zipcode,taggable,groupable`
        )
        .then(({ data }) => {
          this.payload = data;
        });
    },
    getAllCountries() {
      this.$store.dispatch("address/FETCH_COUNTRIES").then(({ data }) => {
        this.countries = data;
      });
    },
    getAllZipcodes() {
      this.$store.dispatch("address/FETCH_ZIPCODES").then(({ data }) => {
        this.zipcodes = data;
      });
    },
    getAllCities() {
      this.$store.dispatch("address/FETCH_CITIES").then(({ data }) => {
        this.cities = data;
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
  }
}
</script>
<style scoped>
.main-wrapper {
  display: flex;
  justify-content: center;
}

.field-title {
  font-size: 1.2rem;
}

.save-btn {
  width: 180px;
  height: 50px !important;
  float: right;
  border-radius: 0% !important;
}

</style>



































