<template>
  <v-app class="forgotPassword-form">
    <v-container fluid fill-height class="pa-0">
      <v-layout justify-center>
        <v-flex class="right-background" xs12 sm7>
          <div class="footer"></div>
          <div class="header-log"></div>
        </v-flex>
        <v-flex xs12 sm5 class="forgotPassword-content">
          <v-card class="elevation-0">
            <v-card-text>
              <h1 class="display-1">Reset your password</h1>
              <p class="subtitle-1">Always remember your password or take a note for it.</p>
              <ValidationObserver ref="form">
                <v-form class="form-box" @submit.prevent="resetPassword()">
                  <!-- New Password -->
                  <validationProvider name="New Password" rules="required" v-slot="{ errors }">
                    <v-text-field placeholder="New Password" v-model="payload.new_password" hide-details="auto"
                      width="300" :error-messages="errors" :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showNewPassword ? 'text' : 'password'" @click:append="showNewPassword = !showNewPassword"
                      outlined flat>
                    </v-text-field>
                  </validationProvider>
                  <!-- Confirm Password -->
                  <validationProvider name="Confirm Password" rules="required|confirmed:New Password"
                    v-slot="{ errors }">
                    <v-text-field placeholder="Confirm Password" v-model="payload.confirm_password" hide-details="auto"
                      width="300" :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      @click:append="showConfirmPassword = !showConfirmPassword" :error-messages="errors" outlined flat>
                    </v-text-field>
                  </validationProvider>
                  <!-- Verification Code -->
                  <validationProvider name="token" rules="required" v-slot="{ errors }">
                    <v-text-field placeholder="Enter Verification Code" v-model="payload.token" hide-details="auto"
                      width="300" :error-messages="errors" outlined flat>
                    </v-text-field>
                  </validationProvider>
                  <v-btn block tile color="primary" type="submit" :loading="loading">
                    Reset Password
                  </v-btn>
                  <div class="pt-5">
                    <span>Remembered your password?
                      <a @click="goTo('login')">Sign-in</a>
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
export default
  {
    layout: 'blank',
    auth: false,
    data() {
      return {
        showNewPassword: false,
        showConfirmPassword: false,
        loading: false,
        payload:
        {
          new_password: '',
          confirm_password: '',
          token: ''
        }
      }
    },
    methods: {
      resetPassword() {
        this.$refs.form.validate()
          .then((result) => {
            if (!result) return;
            if (result) {
              this.$axios
                .post(`reset_password`, this.payload)
                .then(({ data }) => {
                  this.fullNotification('Password Reset!');
                  this.goTo('login')
                })
            }
          })
      }
    }
  };
</script>