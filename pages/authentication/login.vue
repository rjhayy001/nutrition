<template>
  <v-app class="login-form">
    <v-container fluid fill-height class="pa-0">
      <v-layout justify-center>
        <v-flex class="right-background" xs12 sm7>
          <div class="footer"></div>
          <div class="header-log"></div>
        </v-flex>
        <v-flex xs12 sm5 class="login-content">
          <v-card class="elevation-0">
            <v-card-text>
              <h1 class="display-1">Hello ! Welcome back.</h1>
              <p class="subtitle-1">Login with your admin account that you entered during registration.</p>
              <ValidationObserver ref="form">
                <v-form class="form-box" @submit.prevent="login">
                  <div>
                    <v-alert dense outlined v-if="errorMessage" tile type="error">
                      {{ errorMessage }}
                    </v-alert>
                  </div>
                  <ValidationProvider slim name="email" rules="required|min:1|max:100" v-slot="{ errors }">
                    <div class="mb-5">
                      <p class="mb-2">Email Address</p>
                      <v-text-field append-icon="mdi-account-key-outline" name="login" placeholder="Type your email ..."
                        type="text" hide-details="auto" solo :error-messages="errors" v-model="admin.email">
                      </v-text-field>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider slim name="password" rules="required|min:1|max:100" v-slot="{ errors }">
                    <div class="mb-5">
                      <p class="d-flex  justify-space-between mb-2">
                        <span>Password</span>
                        <span>
                          <p text @click="goTo('forgot_password')" color="primary"
                            style="cursor:pointer; color:#77c0d5;" dense>Forgot Password ?</p>
                        </span>
                      </p>
                      <v-text-field id="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword"
                        name="password" placeholder="Type your password ..." solo hide-details="auto"
                        :error-messages="errors" v-model="admin.password"></v-text-field>
                    </div>
                  </ValidationProvider>
                  <div>
                    <v-btn block tile color="primary" rounded type="submit" :loading="loading">
                      Login
                    </v-btn>
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
  layout: 'blank',
  props: {
    source: String,
  },
  data () {
    return {
      showPassword: false,
      admin: {
        email: 'CoachQonvex@dev.com',
        password: 'taneopassword'
      },
      loading: false,
      errorMessage: ''
    }
  },
  methods: {
    login () {
      this.loading = true
      this.$refs.form.validate().then(result => {
        if (!result) return
        this.authenticateUser()
      })
    },
    authenticateUser () {
      this.$auth.loginWith('laravelSanctum', { data: this.admin }).then(({ data }) => {
        localStorage.setItem('coach_id', data.id);
        this.getDeviceToken()
        if (data.is_admin == 1) {
          localStorage.setItem('view', 'coach')
        }
        this.$router.push({ name: 'dashboard' })
      }).catch(({ response }) => {
        this.errorMessage = response.data.message
      }).finally(res => {
        this.loading = false
      })
    },
  }
};
</script>
