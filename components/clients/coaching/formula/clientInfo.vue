<template>
  <v-container
    grid-list-md
    fluid
  >
    <v-layout
      row
      wrap
    >
      <v-flex
        sm3
        class="mb-2"
      >
        <div class="client-name text-center pt-5">
          John Doe
        </div>
      </v-flex>
      <v-flex
        sm2
        class="mb-2"
      >
        <v-card class="custom-card">
          homme celibataire pas d'enfants
        </v-card>
      </v-flex>
      <v-flex
        sm1
        class="mb-2"
      >
        <v-card class="custom-card text-center">
          <div style="font-size: smaller;">age</div>
          <div
            class="font-weight-bold"
            style="font-size: x-large;"
          >51</div>
          <div style="font-size: smaller; font-weight: 200;">12/21/71</div>
        </v-card>
      </v-flex>
      <v-flex
        sm3
        class="mb-2"
      >
        <v-card class="custom-card text-center">
          <div style="font-size: smaller;">poids (kg)</div>
          <v-layout
            row
            wrap
          >
            <v-flex
              sm4
              class="mb-2 pa-0"
            >
              <div
                class="font-weight-bold"
                style="font-size: x-large;"
              >
                110
              </div>
              <div style="font-size: smaller; font-weight: 200;">
                Debut
              </div>
            </v-flex>
            <v-flex
              sm4
              class="mb-2 pa-0"
            >
              <div
                class="font-weight-bold"
                style="font-size: x-large;"
              >
                92
              </div>
              <div style="font-size: smaller; font-weight: 200;">
                Actuelan
              </div>
            </v-flex>
            <v-flex
              sm4
              class="mb-2 pa-0"
            >
              <div
                class="font-weight-bold"
                style="font-size: x-large;"
              >
                72
              </div>
              <div style="font-size: smaller; font-weight: 200;">
                Objectif
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex
        sm1
        class="mb-2"
      >
        <v-card class="custom-card text-center">
          <div style="font-size: smaller;">talle</div>
          <div
            class="font-weight-bold"
            style="font-size: x-large;"
          >51</div>
          <div style="font-size: smaller; font-weight: 200;">cm</div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style scoped>
.custom-card {
  text-transform: capitalize;
  font-weight: 500;
  padding: 10px;
  width: 100%;
  height: 90px;
}
.client-name{
  font-weight: 600;
  font-size: 21px;
  letter-spacing: 3px;
  color: #8b8b8b;
}
</style>
