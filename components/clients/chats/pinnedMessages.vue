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
          <div v-for="(item, index) in 5" :key="index">
            <v-card class="my-2">
              <v-list-item>
                <v-list-item-avatar>
                  <v-img :src="'https://cdn.vuetifyjs.com/images/lists/1.jpg'" ></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-2">John Doe</v-list-item-title>
                  <v-list-item-subtitle class="pt-1">
                    Do you have Paris recommendations? Have you ever been?
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </div>
        </v-container>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
  export default {
    data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }),
  }
</script>
