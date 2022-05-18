<template>
  <ValidationObserver ref="form">
    <v-form class="form-box" @submit.prevent="saveForm">
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 class="mb-2">
            <div class="d-flex align-center py-2 data-table-cus">
              <p class="title mr-1">
                {{ payload.id ? "EDIT" : "CREATE NEW" }} BLOG
              </p>
              <v-spacer></v-spacer>
              <v-btn class="mr-1" small @click="$router.go('-1')">
                <v-icon>mdi-arrow-left</v-icon>
                BACK
              </v-btn>
            </div>
            <hr />
          </v-flex>
          <v-flex xs12 class="mb-2">
            asdasd
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </ValidationObserver>
</template>
<script>
export default {
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
      tagsOption: ["test11", "test22"],
      groupsOption: ["test1", "test2"],
      countries: [],
      cities: [],
      zipcodes: [],
    };
  },
  mounted() {
    this.getAllCountries();
    this.getAllZipcodes();
    this.getAllCities();
  },
  methods: {
    saveForm() {
      this.$refs.form.validate().then((result) => {
        if (!result) return;
        this.$root
          .dialog(
            "Confirm add Action!",
            `Are you sure you want to add this record ?`,
            "add"
          )
          .then(() => {
            this.payload.city_id = this.payload.city_id.id;
            this.payload.country_id = this.payload.country_id.id;
            this.payload.zipcode_id = this.payload.zipcode_id.id;
            if (this.payload.id) {
              this.$emit("updateRecord", this.payload);
            } else {
              this.$emit("addRecord", this.payload);
            }
          });
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
  },
};
</script>
