<template>
  <div class="main-wrapper pt-6">
    <validationObserver ref="form">
      <v-form class="form-box" @submit.prevent="saveForm()">
        <div class="form-wrapper">
          <v-card height="600" width="600" flat>
            <h2 class="pb-4">CHANGE PASSWORD</h2>
            <!-- Old Password  -->
            <ValidationProvider slim name="Old password" rules="required" v-slot="{ errors }">
              <div class="mb-2 pt-2">
                <p class="mb-2 field-title">Old Password:</p>
                <v-text-field style="text-transform: capitalize;" placeholder="Enter old password" type="password"
                  hide-details="auto" v-model="payload.old_password"
                  :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showOldPassword ? 'text' : 'password'" :error-messages="errors"
                  @click:append="showOldPassword = !showOldPassword" solo />
              </div>
            </ValidationProvider>
            <!-- New Password  -->
            <ValidationProvider slim name="New password" rules="required" v-slot="{ errors }">
              <div class="mb-2">
                <p class="mb-2 field-title">New Password:</p>
                <v-text-field style="text-transform: capitalize;" placeholder="Enter new password" type="password"
                  hide-details="auto" v-model="payload.new_password"
                  :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showNewPassword ? 'text' : 'password'" :error-messages="errors"
                  @click:append="showNewPassword = !showNewPassword" solo />
              </div>
            </ValidationProvider>
            <!-- Confirm Password -->
            <ValidationProvider slim name="Confirm password" rules="required|confirmed:New password"
              v-slot="{ errors }">
              <div class="mb-2">
                <p class="mb-2 field-title">Confirm Password:</p>
                <v-text-field style="text-transform: capitalize;" placeholder="Enter confirm password"
                  hide-details="auto" v-model="payload.confirm_password"
                  :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showConfirmPassword ? 'text' : 'password'" :error-messages="errors"
                  @click:append="showConfirmPassword = !showConfirmPassword" solo />
              </div>
            </ValidationProvider>
            <div class="pt-2 d-flex flex-row-reverse">
              <v-btn class="success" type="submit">
                <v-icon class="pr-2">
                  mdi-content-save-outline
                </v-icon>
                Save
              </v-btn>
            </div>
          </v-card>
        </div>
      </v-form>
    </validationObserver>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      payload: {
        id: this.$auth.user.id,
        old_password: '',
        new_password: '',
        confirm_password: ''
      },
    }
  },
  methods: {
    saveForm() {
      this.$refs.form.validate().then((result) => {
        if (!result) return;
        if (result) {
          this.$axios.post(`${this.$coaches}/change_password`, this.payload).then(({ data }) => {
            this.fullNotification('Success')
            this.resetForm()
          }).catch(error => {
            this.errorNotification(error.response.data.message)
          })
        }
      });
    },
    resetForm() {
      this.payload.old_password = "",
        this.payload.new_password = "",
        this.payload.confirm_password = ""
    },
  },
}
</script>
<style scoped>
.field-title {
  font-size: 1.2rem;
}

.form-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 8%;
}
</style>