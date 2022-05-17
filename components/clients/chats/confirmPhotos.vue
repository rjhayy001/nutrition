<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      @click:outside="$emit('close')"
      width="500"
    >
      <v-card
        height="300"
        style="overflow-y:auto;"
      >
        <v-container>
          <v-row>
            <v-col
              v-for="n in photos"
              :key="n"
              class="d-flex child-flex"
              cols="4"
            >
              <v-img
                :src="n"
                :lazy-src="`https://picsum.photos/10/6?image=15`"
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
            <v-col cols="12" style="position:absolute; bottom:0;">
              <div class="float-right">
                <v-btn @click="$emit('close')">cancel</v-btn>
                <v-btn @click="send" color="primary">send</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return {

    }
  },
  methods: {
    send(){
      this.$emit('send')
      // this.$emit('close')
    }
  },
  props:{
    dialog:{
      required:true,
      type: Boolean
    },
    photos:{
      required:true,
      type: Array
    },
  }
}
</script>
