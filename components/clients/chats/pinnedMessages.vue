<template>
  <div class="text-center">
    <v-menu offset-y tile>
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          class="mx-2"
          v-bind="attrs"
          v-on="on"
        >
          mdi-pin-outline
        </v-icon>
      </template>
      <v-card width="350px">
        <div class="toolbar-container">
          <v-toolbar flat dense color="#f5f5f5">
            <v-toolbar-title class="text-capitalize subtitle-2">pinned messages</v-toolbar-title>
          </v-toolbar>
        </div>
        <v-container>
          <div v-for="item in pinned"  :key="item.id">
            <v-card class="my-2" v-if="item.is_pinned == 1">
              <v-list-item>
                <v-list-item-avatar>
                <v-img v-if="item.logo != ''" :src="item.logo?item.logo:default_profile" ></v-img>
                <v-img v-else src='https://cdn.vuetifyjs.com/images/lists/1.jpg' ></v-img>
                  <!-- <v-img :src="'https://cdn.vuetifyjs.com/images/lists/1.jpg'" ></v-img> -->
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-2">{{item.fullname}}</v-list-item-title>
                  <!-- <v-list-item-subtitle class="pt-1">
                   {{item.message}}
                  </v-list-item-subtitle> -->
                  <v-list-item-subtitle v-if="item.type == 'text'" class="pt-1" style="font-size:13px;">
                 {{item.message}}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else class="pt-1" style="font-size:13px;">
                <div class="imagemesssage d-flex">
                  <div v-for="(image, key) in decodeMessage(item.message)" :key="image.id">
                      <img :src="image" style="height:100px; width:100px;"/>
                  </div>
                </div>
                </v-list-item-subtitle>
                </v-list-item-content>
                
                  <v-icon class="ml-2" @click="deletePin(item.id)">mdi-close</v-icon>
              </v-list-item>
            </v-card>
          </div>
        </v-container>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
  // export default {
  //   props: ["pinned"],
  //   data: () => ({
  //     items: [
  //       { title: 'Click Me' },
  //       { title: 'Click Me' },
  //       { title: 'Click Me' },
  //       { title: 'Click Me 2' },
  //     ],
  //   return {
  //     pinMessagelist: this.pinned,
    
  //   };
    
  //   }),
  //   // mounted(){
  //   //   this.getPinnedMessage();
  //   // },
  //   // methods: {
  //   //    getPinnedMessage(){
  //   //     const thiss = this;
  //   //     this.$axios
  //   //     .get(`${this.$clients}/getPinnedMessage`
  //   //      )
  //   //     .then(({ data }) => {
  //   //       this.pinMessagelist = data;
  //   //     });
  //   //   },
  //   // }
  // }
  import default_profile from "@/static/images/empty_person.png";

  export default {

  props: {
    pinned: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  // watch: {
  //     // whenever question changes, this function will run
  //     pinned(newQuestion, oldQuestion) {
  //     alert('test');
  //      this.pinMessagelist = newQuestion;
  //     }
  //   },
  data() {
    return {
      pinMessagelist:[],
      default_profile,
    };
  },
   methods: {
       deletePin(id){
        // console.log(id);
        // return;
        const thiss = this;
        this.$axios
        .put(`${this.$clients}/pinMessage/`+id+'?to=0'
         )
        .then(({ data }) => {
          
          this.$emit('getPinnedMessage')
        });
      },
      decodeMessage(message) {
       return JSON.parse(message);
      },
    }
};
</script>
<style scoped>
.imagemesssage{
  gap: 10px;
}
</style>
