<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 class="pb-0">
        <div class="toolbar-container">
          <v-toolbar flat dense >
            <v-toolbar-title class="title-header">Objectives</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="success" small>
              <v-icon left>mdi-plus</v-icon>
              add
            </v-btn>
            <pinned-messages/>
          </v-toolbar>
        </div>
      </v-flex>
      <v-flex xs12 class="pb-0">
        <v-btn large outlined tile color="primary">02.22.22 / 09.22.22</v-btn>
        <v-layout row wrap>
            <v-flex xs4 class="pb-0" v-for="(item, index) in 3" :key="index">
              <v-card class="mt-4 scrollable-element">
                <v-subheader class="title-header pos-sticky" dense>
                  NOM LISTE OBJECTIF {{item}}
                </v-subheader>
                <div class="ml-4">
                  <v-checkbox
                    dense
                    class="my-0 list-box"
                    v-for="(check, check_index) in 10" :key="check_index+'check'"
                    label=" LOREM IPSUM GENERATOR "
                    hide-details="auto"
                    value="John"
                    style="font-size:13px !important;"
                  >
                    <template v-slot:label>
                      <span class="text-capitalize" style="font-size:14px !important">lorem ipsum generator {{check}}</span>
                    </template>
                  </v-checkbox>
                  <v-checkbox label="test"></v-checkbox>
                </div>
              </v-card>
            </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import pinnedMessages from '@/components/clients/chats/pinnedMessages.vue'
    export default {
    components: {
      pinnedMessages,
    },
    data(){
      return {

      }
    },
  }
</script>

<style scoped>
.title-header{
  background: #e3e3e3;
  color: #7c94de;
  font-weight: 500;
}
.list-box > .v-label {
  font-weight: 500;
  font-size:10px !important;
}
.scrollable-element {
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: auto;
    height:380px;
    border-bottom: #dfdfdf;
}

.scrollable-element::-webkit-scrollbar {
  background-color: #dfdfdf;
  width: 8px;
  border-radius: 50px;
}

.scrollable-element::-webkit-scrollbar-thumb {
  background-color: #858383;
  border-radius: 50px;
}

.pos-sticky{
  position: sticky !important;
  top: 0 !important;
  z-index: 10!important;
}
</style>
