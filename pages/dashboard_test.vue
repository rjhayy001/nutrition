<template>
  <div>
    <v-container
      grid-list-md
      class="main-container px-9"
    >
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          class="pb-5"
        >
          <v-toolbar flat dense>
            <v-toolbar-title >
              Bonjour <span class="text-capitalize font-weight-bold"> {{$auth.user.full_name}} </span>
            </v-toolbar-title>
          </v-toolbar>
        </v-flex>
        <v-flex
          xs4
          class="pb-5"
        >
          <v-layout row wrap>
            <v-flex xs4>
              <v-card height="100">
                adasd
              </v-card>
            </v-flex>
            <v-flex xs4>
              <v-card height="100">
                adasd
              </v-card>
            </v-flex>
            <v-flex xs4>
              <v-card height="100">
                adasd
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex
          xs8
          class="pb-5"
        >
          <v-card height="300">asdasdasd</v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>

</template>p
<script>
export default {
  auth: 'auth'
}
</script>
