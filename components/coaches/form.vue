<template>
  <div>
    <tag-form-drawer :drawerStatus="tagDrawer"
      @addRecord="addTagRecord($event)"
      @updateRecord="updateRecord($event)"
      :selectedItem="selectedItem"
    >
    </tag-form-drawer>
    <group-form-drawer :drawerStatus="groupDrawer"
      @addRecord="addGroupRecord($event)"
      @updateRecord="updateRecord($event)"
      :selectedItem="selectedItem"
    >
    </group-form-drawer>
    <ValidationObserver ref="form">
      <v-form class="form-box" @submit.prevent="saveForm">
        <v-container grid-list-md fluid>
          <v-layout row wrap>
            <v-flex xs12 class="mb-2">
              <div class="d-flex align-center py-2 data-table-cus">
                <p class="title mr-1">
                  {{ payload.id ? "EDIT" : "CREATE NEW" }} COACH
                </p>
                <v-spacer></v-spacer>
                <v-btn class="mr-1" small @click="$router.go('-1')">
                  <v-icon>mdi-arrow-left</v-icon>
                  BACK
                </v-btn>
              </div>
              <hr />
            </v-flex>
          </v-layout>
          <v-layout row wrap class="form-content" gap>
            <v-flex xs6>
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
                        <span>*</span>
                        first name
                      </p>
                      <v-text-field
                        style="text-transform: capitalize"
                        v-model="payload.first_name"
                        name="first_name"
                        placeholder="Type first name..."
                        hide-details="auto"
                        type="text"
                        :error-messages="errors"
                        solo
                      ></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">Last name</p>
                      <v-text-field
                        class="text-capitalize"
                        v-model="payload.last_name"
                        name="last_name"
                        placeholder="Type last name ..."
                        hide-details="auto"
                        type="text"
                        solo
                      ></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span>*</span>
                        Phone #1
                      </p>
                      <v-text-field
                        v-model="payload.phone_1"
                        name="phone_1"
                        placeholder="Type your mobile ..."
                        hide-details="auto"
                        type="text"
                        solo
                      ></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">Phone #2</p>
                      <v-text-field
                        v-model="payload.phone_2"
                        name="phone_2"
                        placeholder="Type your mobile ..."
                        hide-details="auto"
                        type="text"
                        solo
                      ></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span>*</span>
                        Email Address
                      </p>
                      <v-text-field
                        v-model="payload.email"
                        name="email_1"
                        placeholder="Type your email ..."
                        hide-details="auto"
                        type="text"
                        solo
                      ></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        Date of birth
                      </p>
                      <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="payload.birthday"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="payload.birthday"
                            solo
                            flat
                            label="Choose date of birth"
                            prepend-inner-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>

                        <v-date-picker v-model="payload.birthday" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(payload.birthday)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12>
                  <p class="subtitle-1 font-weight-medium">LOGIN CREDENTIALS</p>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        Email Address/username
                      </p>
                      <v-text-field
                        v-model="payload.email"
                        name="email_2"
                        placeholder="Type your email ..."
                        hide-details="auto"
                        type="text"
                        solo
                      ></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">Password</p>
                      <v-text-field
                        v-model="payload.password"
                        name="password"
                        :append-icon="
                          viewPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
                        "
                        placeholder="Type your password ..."
                        solo
                        hide-details="auto"
                        :type="viewPassword ? 'text' : 'password'"
                        @click:append="viewPassword = !viewPassword"
                      ></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12>
                  <p class="subtitle-1 font-weight-medium">ADDRESS</p>
                </v-flex>
                <v-flex xs12>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span>*</span>
                        Address
                      </p>
                      <v-text-field
                        v-model="payload.address_1"
                        name="address_1"
                        placeholder="Type your address ..."
                        hide-details="auto"
                        type="text"
                        solo
                      ></v-text-field>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        Additonal Address
                      </p>
                      <v-textarea
                        v-model="payload.address_2"
                        name="address_2"
                        placeholder="Type your additional address ..."
                        solo
                        hide-details="auto"
                        type="text"
                        rows="2"
                      ></v-textarea>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span>*</span>
                        City
                      </p>
                      <v-combobox
                        v-model="payload.city_id"
                        :items="cities"
                        hide-details="auto"
                        solo
                        deletable-chips
                        item-text="name"
                        item-value="id"
                      ></v-combobox>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs6>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">Zipcode</p>
                      <v-combobox
                        v-model="payload.zipcode_id"
                        :items="zipcodes"
                        hide-details="auto"
                        solo
                        item-text="code"
                        item-value="id"
                      ></v-combobox>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12 class="mb-8">
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span>*</span>
                        Country
                      </p>
                      <v-combobox
                        v-model="payload.country_id"
                        :items="countries"
                        name="country"
                        hide-details="auto"
                        solo
                        item-text="short_name"
                        item-value="id"
                      ></v-combobox>
                    </div>
                  </ValidationProvider>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs6 class="py-0 px-7">
              <v-layout row wrap>
                <v-flex xs12>
                  <p class="subtitle-1 font-weight-medium">PROFILE</p>
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
                      color="success"
                      small
                      outlined
                      @click="handleFileImport"
                    >
                      <v-icon>mdi-upload-outline</v-icon>
                      upload photo
                    </v-btn>
                    <input
                      accept="image/png, image/gif, image/jpeg"
                      ref="uploader"
                      type="file"
                      @change="onFileChange"
                      class="d-none"
                    />
                  </div>
                </v-flex>
                <v-flex xs12>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">Tags</p>
                      <v-autocomplete
                        v-model="payload.taggable"
                        :items="tagsOption"
                        solo
                        label="Select tags ..."
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
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">Groups</p>
                      <v-autocomplete
                        v-model="payload.groupable"
                        :items="groupsOption"
                        hide-details="auto"
                        solo
                        @click:prepend-inner.stop="groupDrawer = !groupDrawer"
                        item-text="name"
                        item-value="id"
                        label="Select groups ..."
                        prepend-inner-icon="mdi-plus"
                        multiple
                      >
                      </v-autocomplete>
                    </div>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12>
                  <ValidationProvider slim>
                    <div class="mb-1">
                      <p class="subtitle-2 font-weight-regular mb-2">Status</p>
                      <v-select
                        v-model="payload.status"
                        :items="statusOptions"
                        item-value="id"
                        item-text="name"
                        hide-details="auto"
                        solo
                      ></v-select>
                    </div>
                  </ValidationProvider>
                </v-flex>
              </v-layout>
            </v-flex>
            <div class="form-footer d-flex align-content-end justify-end">
              <v-btn class="success" type="submit">
                <v-icon>mdi-content-save-outline</v-icon>
                {{ payload.id ? "update" : "save" }}
              </v-btn>
            </div>
          </v-layout>
        </v-container>
      </v-form>
    </ValidationObserver>
  </div>
</template>
<script>
import tagFormDrawer from "~/components/tag/form.vue";
import groupFormDrawer from "~/components/group/form.vue";
export default {
  components: {tagFormDrawer, groupFormDrawer},

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
      loading: false,
      errorMessage: "",
      viewPassword: false,
      originalPayload: {},
      statusOptions: [
        { id: 1, name: "Active" },
        { id: 0, name: "Inactive" },
      ],
      tagDrawer: false,
      groupDrawer: false,
      tagsOption: [],
      groupsOption: [],
      countries: [],
      cities: [],
      zipcodes: [],
      tagsSelected: [],
    };
  },
  props: {
    drawerStatus: {
      type: Boolean,
      default: () => false,
    },
    selectedItem: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    drawerStatus: {
      handler(val) {
        console.log(val, "status");
      },
    },
    selectedItem: {
      handler(val) {
        if (!this.originalPayload) {
          this.originalPayload = this.cloneVariable(this.payload);
        }
        if (!val) return;
        this.payload = this.cloneVariable(val);
      },
      deep: true,
      immediate: true,
    },
    tagsSelected: {
      handler(val) {
        this.tagsSelected = val;
        this.tagsSelected = val;
      }
    }
  },
  created() {
    this.getAllCountries();
    this.getAllZipcodes();
    this.getAllCities();
    this.getAllTags();
    this.getAllGroups();
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
      reader.readAsDataURL(file);
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
  },
};
</script>
