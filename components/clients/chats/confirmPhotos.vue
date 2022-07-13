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
              v-for="(item, index) in photos"
              :key="index"
              class="d-flex child-flex"
              cols="3"
            >
              <!-- <v-img
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
              </v-img> -->
              <v-img
                :src="imageUrl2('documents/coach', $auth.user.id, item.file_path)" v-if="checkFile(item.file_type) == 'image'" id="imgfile"
                :lazy-src="`https://picsum.photos/10/6?image=${index * 5 + 10}`"
                aspect-ratio="1"
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
               <v-img v-else
                :src="iconSelector(item)" contain id="imgfile"
                :lazy-src="`https://picsum.photos/10/6?image=${index * 5 + 10}`"
                aspect-ratio="1"
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
import iconHelper from '@/mixins/iconHelper'

export default {
  mixins: [iconHelper],
  data(){
    return {
      base64file:[],
    }
  },
  watch: {
      photos: function(value) {
         console.log(this.photos);
      }
  },
  methods: {
    send(){
      this.$emit('send', this.photos)
      // this.$emit('close')
    },
    checkFile(file) {
        const type = file.split("/");
          return type[0];
    },
    iconSelector(item){
      const getype = item.file_type.split("/");
      let srcIcon = this.types.find(type => type.type == getype[1])
      if(item.type =='image'){
        return item.data
      }
      return srcIcon ? srcIcon.icon : this.unverifyIcon
    },

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
