<template>
  <v-app class="changePassword-form">
    <v-container fluid fill-height class="pa-0">
      <v-layout justify-center>
        <v-flex class="right-background" xs12 sm7>
          <div class="footer"></div>
          <div class="header-log"></div>
        </v-flex>
        <v-flex xs12 sm5 class="changePassword-content">
          <v-card class="elevation-0">
            <v-card-text>
              <h1 class="display-1">CHANGE PASSWORD</h1>
              <p class="subtitle-1">Always remember your password or take a note for it.</p>
              <ValidationObserver ref="form">
                <v-form class="form-box" @submit.prevent="changePassword()">
                  <!-- New Password -->
                  <validationProvider name="Current Password" rules="required" v-slot="{ errors }">
                    <v-text-field class="pb-2" placeholder="Current Password" v-model="payload.current_password"
                      hide-details="auto" width="300" :error-messages="errors"
                      :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showOldPassword ? 'text' : 'password'" @click:append="showOldPassword = !showOldPassword"
                      outlined flat>
                    </v-text-field>
                  </validationProvider>
                  <!-- Confirm Password -->
                  <validationProvider name="New Password" rules="required" v-slot="{ errors }">
                    <v-text-field class="pb-2" placeholder="New Password" v-model="payload.new_password"
                      hide-details="auto" width="300" :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showNewPassword ? 'text' : 'password'" @click:append="showNewPassword = !showNewPassword"
                      :error-messages="errors" outlined flat>
                    </v-text-field>
                  </validationProvider>
                  <!-- Verification Code -->
                  <validationProvider name="Confirm Password" rules="required|confirmed:New Password"
                    v-slot="{ errors }">
                    <v-text-field class="pb-2" placeholder="Confirm Password" v-model="payload.confirm_password"
                      hide-details="auto" width="300" :error-messages="errors"
                      :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      @click:append="showConfirmPassword = !showConfirmPassword" outlined flat>
                    </v-text-field>
                  </validationProvider>
                  <v-btn block tile color="primary" type="submit" :loading="loading">
                    Change Password
                  </v-btn>
                  <div class="pt-5">
                    <span>Try your new password?
                      <a @click="$auth.logout()">Sign-out</a>
                    </span>
                  </div>
                </v-form>
              </ValidationObserver>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      loading: false,
      payload:
      {
        id: this.$auth.user.id,
        current_password: '',
        new_password: '',
        confirm_password: '',
      }
    }
  },
  methods: {
    changePassword() {
      this.$refs.form.validate().then((result) => {
        if (!result) return;
        if (result) {
          this.$axios.post(`${this.$coaches}/change_password`, this.payload).then(({ data }) => {
            this.fullNotification('Success')
          }).catch(error => {
            this.errorNotification(error.response.data.message)
          })
        }
      });
    },
  }
}
</script>
<style lang="scss" scoped>
.changePassword-form {
  .theme--light.v-text-field>.v-input__control>.v-input__slot:before {
    border: none !important;
  }

  .right-background {
    .footer {
      display: block;
      position: absolute;
      box-sizing: border-box;
      height: 833px;
      background-color: #7c94de;
      z-index: 99;
      bottom: 0;
      -webkit-clip-path: ellipse(78% 100% at 22% 100%);
      clip-path: ellipse(150% 100% at -50% 100%);
      width: 70%;
    }

    .header-log {
      display: block;
      position: absolute;
      box-sizing: border-box;
      height: 1005px;
      background-color: #9aaadb;
      bottom: 0;
      -webkit-clip-path: ellipse(78% 100% at 22% 100%);
      clip-path: ellipse(150% 100% at -50% 100%);
      width: 70%;
    }
  }

  .right-background {
    background-size: cover;
    background-position: -25px;
  }

  .v-btn {
    height: 45px !important;
  }

  .sm7 {
    height: 100%;
  }

  .changePassword-content {
    background-color: white !important;
    padding: 5rem 2rem 0rem 5rem;
    margin: 2rem 0rem 0rem 3rem;
  }

  .changePassword-content h1 {
    margin-bottom: 3rem;
  }

  .subtitle-1 {
    margin-bottom: 2rem ! important;
    font-size: 20px !important;
  }
}
</style>