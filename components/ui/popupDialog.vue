<template>
  <v-dialog
    v-model="dialog"
    width="550"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
    content-class="confirm-dialog-wrapper"
    persistent
  >
    <v-card :class="['confirm-dialog-box', type == 'add' ? 'add' : (type == 'delete' ? 'delete' : 'edit')]">
      <v-card-title class="text-uppercase">{{ title }} </v-card-title>
      <v-card-text>
        <div class="pa-5">
          <p class="body-1 mb-0" v-html="message"></p>
          <p class="subtitle-2 font-weight-light" v-if="type != 'add'">You can't undo this action</p>
        </div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn  text color="error"  @click.stop="cancel">
          cancel
        </v-btn>
        <v-btn text color="success"  @click.stop="agree">
          yes confirm!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    type: "add",
    options: {
      color: "primary",
      width: 700,
      zIndex: 200,
    },
  }),
  methods: {
    open(title = "", message = "", type = "add", options) {
      this.dialog = true;
      this.title = title;
      this.message = message;
      this.type = type;
      this.options = Object.assign(this.options, options);

      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.resolve(true);
      this.dialog = false;
    },
    cancel() {
      this.reject(false);
      this.dialog = false;
    },
  },
};
</script>
<style></style>
