<template>
  <div>
    <v-container class="px-8">
      <!--  Header for Dashboard -->
      <v-row>
        <v-flex xs12>
          <div>
            <v-toolbar flat>
              <v-toolbar-title style="font-size: 30px;">
                Bonjour <span class="font-weight-bold">{{user}}!</span>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-select
                :items="items"
                label="Solo field"
                dense
                hide-details="auto"
                v-model="item"
                class="pt-7"
                solo
              ></v-select>
            </v-toolbar>
          </div>
        </v-flex>
      </v-row>
      <!--  Body for Dashboard -->
      <v-row>
        <v-flex xs3>
          <div class="mt-5 ml-5">
            <v-row>
              <v-flex class="mx-5">
                <v-card
                  class=""
                  height="70"
                >
                  <div class="text-center">
                    <h1 class="font-weight-bold">4</h1>
                    <div class="">appels</div>
                  </div>
                </v-card>
              </v-flex>
              <v-flex class="mx-5">
                <v-card
                  class=""
                  height="70"
                >
                  a
                </v-card>
              </v-flex>
              <v-flex class="mx-5">
                <v-card
                  class=""
                  height="70"
                >
                  a
                </v-card>
              </v-flex>
            </v-row>
          </div>
          <div class="mt-8 ml-4">
            <v-card height="600" class="text-center pt-8">
              <v-date-picker v-model="picker" color="primary"  elevation="8"></v-date-picker>
            </v-card>
          </div>
        </v-flex>
        <v-flex xs9 class="px-4">
          <v-card
            class="mt-2"
            height="690"
          >
            a
          </v-card>
        </v-flex>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: ['Myriam', 'Bar', 'Fizz', 'Buzz'],
    user: 'Myriam',
    item: 'Myriam',
    picker:''
  }),
}
</script>
<style scoped>
  .v-select{
      width: 400px;
}
</style>

