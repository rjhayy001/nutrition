<template>
  <v-app class="forgotPassword-form">
    <v-container
      fluid
      fill-height
      class="pa-0"
    >
      <v-layout justify-center>
        <v-flex
          class="right-background"
          xs12
          sm7
        >
          <div class="footer"></div>
          <div class="header-log"></div>
        </v-flex>
        <v-flex
          xs12
          sm5
          class="forgotPassword-content"
        >
          <v-card class="elevation-0">
            <v-card-text>
              <h1 class="display-1">Hello, Did you forgot your password?</h1>
              <p class="subtitle-1">Please enter the e-mail address you registered during registration.</p>
              <ValidationObserver ref="form">
                <v-form
                  class="form-box"
                  @submit.prevent="handleToken()"
                >
                  <ValidationProvider
                    slim
                    name="email"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <div class="mb-5">
                      <p class="mb-2">Email Address</p>
                      <v-text-field
                        label="Email"
                        placeholder="example123@email.com"
                        v-model="payload.email"
                        hide-details="auto"
                        :error-messages="errors"
                        outlined
                        flat
                      >
                      </v-text-field>
                    </div>
                  </ValidationProvider>
                  <div>
                    <v-btn
                      block
                      tile
                      color="primary"
                      type="submit"
                      :loading="loading"
                    >
                      Send Verification Code
                    </v-btn>
                    <div class="pt-5">
                      <span>Remembered your password?
                        <a @click="goTo('login')">Sign-in</a>
                      </span>
                    </div>
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
  auth: false,
  props: {
    source: String,
  },
  data () {
    return {
      loading: false,
      payload:
      {
        email: ''
      }
    }
  },
  methods: {
    handleToken () {
      this.$refs.form.validate().then((result) => {
        if (!result) return;
        if (result) {
          this.$axios
            .post(`forgot_password`, this.payload)
            .then(({ data }) => {
              this.fullNotification('Verification Code Sent!');
              this.goTo('reset_password')
            }).catch(error => {
              this.errorNotification(error.response.data.message);
            })

        }
      })
    },
  }
};
</script>
