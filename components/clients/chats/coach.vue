<template>
  <v-card tile height="81vh" color="#f5f5f5" style="box-shadow:none;">
    <v-subheader class="title-header" dense> Coaches - 5 </v-subheader>
    <v-list style="background:transparent;" dense>
      <v-list-item v-for="(item, index) in 5" :key="index+'coache'">
        <div class="mr-3">
          <v-badge
            bordered
            bottom
            color="success"
            dot
            offset-x="10"
            offset-y="10"
          >
            <v-avatar size="30">
              <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
            </v-avatar>
          </v-badge>
        </div>
        <v-list-item-content>
          <v-list-item-title class="subtitle-2">John Doe</v-list-item-title>
          <v-list-item-subtitle> test</v-list-item-subtitle>
      </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<style scoped>
.title-header{
  background: #e3e3e3;
  color: #7c94de;
  font-weight: 500;
}
</style>
