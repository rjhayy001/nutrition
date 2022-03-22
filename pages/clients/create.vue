<template>
  <ValidationObserver  ref="form">
    <v-form class="form-box" @submit.prevent="saveForm">
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 class="mb-2">
            <div class="d-flex align-center py-2 data-table-cus">
              <p class="title mr-1">CREATE NEW CLIENT</p>
              <v-spacer></v-spacer>
              <v-btn class="mr-1" small @click="$router.go('-1')">
                <v-icon>mdi-arrow-left</v-icon>
                BACK
              </v-btn>
            </div>
            <hr>
          </v-flex>
        </v-layout>
        <v-layout row wrap class="form-content" gap>
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex xs12>
                <p class="subtitle-1 font-weight-medium">INFORMATIONS</p>
              </v-flex>
              <v-flex xs6>
                <ValidationProvider slim name="first name" rules="required|min:1|max:100" v-slot="{ errors }">
                  <div class="mb-1">
                    <p class="subtitle-2 font-weight-regular mb-2">
                      <span>*</span>
                      first name
                    </p>
                    <v-text-field
                      name="login"
                      placeholder="Type first name..."
                      type="text"
                      hide-details="auto"
                      solo
                      :error-messages="errors"
                      v-model="client.first_name"
                    ></v-text-field>
                  </div>
                </ValidationProvider>
              </v-flex>
              <v-flex xs6>
                <ValidationProvider slim name="last name" rules="required|min:1|max:100" v-slot="{ errors }">
                  <div class="mb-1">
                    <p class="subtitle-2 font-weight-regular mb-2">Last name</p>
                    <v-text-field
                      id="password"
                      name="password"
                      placeholder="Type last name ..."
                      solo
                      hide-details="auto"
                      :error-messages="errors"
                      type="password"
                      v-model="client.last_name"
                    ></v-text-field>
                  </div>
                </ValidationProvider>
              </v-flex>
              <v-flex xs6>
                <ValidationProvider slim name="email" rules="min:1|max:100" v-slot="{ errors }">
                  <div class="mb-1">
                    <p class="subtitle-2 font-weight-regular mb-2">
                      <span>*</span>
                      Phone #1
                    </p>
                    <v-text-field
                      name="login"
                      placeholder="Type your email ..."
                      type="text"
                      hide-details="auto"
                      solo
                      :error-messages="errors"
                    ></v-text-field>
                  </div>
                </ValidationProvider>
              </v-flex>
              <v-flex xs6>
                <ValidationProvider slim name="password" rules="min:1|max:100" v-slot="{ errors }">
                  <div class="mb-1">
                    <p class="subtitle-2 font-weight-regular mb-2"> Phone #2</p>
                    <v-text-field
                      id="password"
                      name="password"
                      placeholder="Type your password ..."
                      solo
                      hide-details="auto"
                      :error-messages="errors"
                      type="password"
                    ></v-text-field>
                  </div>
                </ValidationProvider>
              </v-flex>
               <v-flex xs6>
                <ValidationProvider slim name="email" rules="min:1|max:100" v-slot="{ errors }">
                  <div class="mb-1">
                    <p class="subtitle-2 font-weight-regular mb-2">
                      <span>*</span>
                      Email Address
                    </p>
                    <v-text-field
                      name="login"
                      placeholder="Type your email ..."
                      type="text"
                      hide-details="auto"
                      solo
                      :error-messages="errors"
                    ></v-text-field>
                  </div>
                </ValidationProvider>
              </v-flex>
              <v-flex xs6>
                <ValidationProvider slim name="password" rules="min:1|max:100" v-slot="{ errors }">
                  <div class="mb-1">
                    <p class="subtitle-2 font-weight-regular mb-2">Date of birth</p>
                    <v-text-field
                      id="password"
                      name="password"
                      placeholder="Type your password ..."
                      solo
                      hide-details="auto"
                      :error-messages="errors"
                      type="password"
                    ></v-text-field>
                  </div>
                </ValidationProvider>
              </v-flex>
              <v-flex xs12>
                <p class="subtitle-1 font-weight-medium">LOGIN CREDENTIALS</p>
              </v-flex>
              <v-flex xs6>
                <ValidationProvider slim name="email" rules="min:1|max:100" v-slot="{ errors }">
                  <div class="mb-1">
                    <p class="subtitle-2 font-weight-regular mb-2">
                      Email Address/username
                    </p>
                    <v-text-field
                      name="login"
                      placeholder="Type your email ..."
                      type="text"
                      hide-details="auto"
                      solo
                      :error-messages="errors"
                    ></v-text-field>
                  </div>
                </ValidationProvider>
              </v-flex>
              <v-flex xs6>
                <ValidationProvider slim name="password" rules="min:1|max:100" v-slot="{ errors }">
                  <div class="mb-1">
                    <p class="subtitle-2 font-weight-regular mb-2">Password</p>
                    <v-text-field
                      id="password"
                      :append-icon="viewPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                      name="password"
                      placeholder="Type your password ..."
                      solo
                      hide-details="auto"
                      :error-messages="errors"
                      :type="viewPassword ? 'text' :'password'"
                      @click:append="viewPassword = !viewPassword"
                    ></v-text-field>
                  </div>
                </ValidationProvider>
              </v-flex>
              <v-flex xs12>
                <p class="subtitle-1 font-weight-medium">ADDRESS</p>
              </v-flex>
              <v-flex xs12>
                <ValidationProvider slim name="email" rules="min:1|max:100" v-slot="{ errors }">
                  <div class="mb-1">
                    <p class="subtitle-2 font-weight-regular mb-2">
                      <span>*</span>
                      Address
                    </p>
                    <v-text-field
                      name="login"
                      placeholder="Type your email ..."
                      type="text"
                      hide-details="auto"
                      solo
                      :error-messages="errors"
                    ></v-text-field>
                  </div>
                </ValidationProvider>
              </v-flex>
              <v-flex xs12>
                <ValidationProvider slim name="password" rules="min:1|max:100" v-slot="{ errors }">
                  <div class="mb-1">
                    <p class="subtitle-2 font-weight-regular mb-2">Additonal Address</p>
                    <v-textarea
                      id="password"
                      name="password"
                      placeholder="Type your password ..."
                      solo
                      hide-details="auto"
                      :error-messages="errors"
                      type="password"
                      rows="2"
                    ></v-textarea>
                  </div>
                </ValidationProvider>
              </v-flex>
              <v-flex xs6>
                <ValidationProvider slim name="email" rules="min:1|max:100" v-slot="{ errors }">
                  <div class="mb-1">
                    <p class="subtitle-2 font-weight-regular mb-2">
                      <span>*</span>
                      City
                    </p>
                    <v-text-field
                      name="login"
                      placeholder="Type your email ..."
                      type="text"
                      hide-details="auto"
                      solo
                      :error-messages="errors"
                    ></v-text-field>
                  </div>
                </ValidationProvider>
              </v-flex>
              <v-flex xs6>
                <ValidationProvider slim name="password" rules="min:1|max:100" v-slot="{ errors }">
                  <div class="mb-1">
                    <p class="subtitle-2 font-weight-regular mb-2">
                      Zipcode
                    </p>
                    <v-text-field
                      id="password"
                      name="password"
                      placeholder="Type your password ..."
                      solo
                      hide-details="auto"
                      :error-messages="errors"
                      type="password"
                    ></v-text-field>
                  </div>
                </ValidationProvider>
              </v-flex>
               <v-flex xs12 style="margin-bottom:55px">
                <ValidationProvider slim name="email" rules="min:1|max:100" v-slot="{ errors }">
                  <div class="mb-1">
                    <p class="subtitle-2 font-weight-regular mb-2">
                      <span>*</span>
                      Country
                    </p>
                    <v-text-field
                      name="login"
                      placeholder="Type your email ..."
                      type="text"
                      hide-details="auto"
                      solo
                      :error-messages="errors"
                    ></v-text-field>
                  </div>
                </ValidationProvider>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6 style="padding: 0px 30px;">
            <v-layout row wrap>
              <v-flex xs12>
                <p class="subtitle-1 font-weight-medium">PROFILE</p>
              </v-flex>
              <v-flex xs12>
                <div class="profile-box">
                  <div class="profile-image">
                    <img src="/images/empty_person.png" alt="">
                  </div>
                  <v-btn color="success" small outlined>
                    <v-icon>mdi-upload-outline</v-icon>
                    upload photo
                  </v-btn>
                </div>
              </v-flex>
              <v-flex xs12>
                <ValidationProvider slim name="email" rules="min:1|max:100" v-slot="{ errors }">
                  <div class="mb-1">
                    <p class="subtitle-2 font-weight-regular mb-2">
                      tags
                    </p>
                    <v-autocomplete
                      dense
                      solo
                      chips
                      small-chips
                      label="Select tags ..."
                      hide-details="auto"
                      multiple
                      prepend-inner-icon="mdi-plus"
                      @click:prepend-inner="showStatusDialog"
                    ></v-autocomplete>
                  </div>
                </ValidationProvider>
              </v-flex>
              <v-flex xs12>
                <ValidationProvider slim name="email" rules="min:1|max:100" v-slot="{ errors }">
                  <div class="mb-1">
                    <p class="subtitle-2 font-weight-regular mb-2">
                      Groups
                    </p>
                    <v-autocomplete
                      dense
                      solo
                      chips
                      small-chips
                      label="Select groups ..."
                      hide-details="auto"
                      multiple
                      prepend-inner-icon="mdi-plus"
                      @click:prepend-inner="showStatusDialog"
                    ></v-autocomplete>
                  </div>
                </ValidationProvider>
              </v-flex>
              <v-flex xs12>
                <ValidationProvider slim name="email" rules="min:1|max:100" v-slot="{ errors }">
                  <div class="mb-1">
                    <p class="subtitle-2 font-weight-regular mb-2">
                      Status
                    </p>
                     <v-select
                      :items="statusOptions"
                      hide-details="auto"
                      solo
                      item-text="name"
                    ></v-select>
                  </div>
                </ValidationProvider>
              </v-flex>
            </v-layout>
          </v-flex>
          <div class="form-footer d-flex align-content-end justify-end">
            <v-btn class="success" type="submit">
              <v-icon>mdi-content-save-outline</v-icon>
              SAVE
            </v-btn>
          </div>
        </v-layout>
      </v-container>
    </v-form>
  </ValidationObserver>
</template>
<script>
export default {
  data() {
    return {
      client: {
        email:'admiudn@gmail.com',
        password:'password',
        first_name:'',
        last_name:''
      },
      loading:false,
      errorMessage:'',
      viewPassword:false,
      statusOptions:[
        {id:1, name:'Active'},
        {id:0, name:'Inactive'},
      ]
    }
  },
  methods: {
    saveForm() {
      this.$refs.form.validate().then(result => {
        if (!result) return
        this.$root.dialog(
          "Confirm Action!",
          `Are you sure you want to add this record ?`,
          "add"
        ).then(() => {
          this.$refs.form.validate().then(result => {
            if (!result) return
            this.addRecord()
          })
        });
      })
    },
    addRecord() {

    },
    showStatusDialog() {

    }
  }
}
</script>