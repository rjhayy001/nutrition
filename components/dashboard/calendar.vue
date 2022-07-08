<template>
  <div>
    <div class="mt-5 ml-5">
      <v-row>
        <v-flex
          class="px-5"
          xs4
        >
          <v-card
            class=""
            height="80"
          >
            <div class="text-center">
              <h2 class="font-weight-bold pt-1">4</h2>
              <div class="overline card-sub">appels count today</div>
            </div>
          </v-card>
        </v-flex>
        <v-flex
          class="px-5"
          xs4
        >
          <v-card
            class=""
            height="80"
          >
            <div class="text-center">
              <h2 class="font-weight-bold pt-1">4</h2>
              <div class="overline card-sub">feedback en attente</div>
            </div>
          </v-card>
        </v-flex>
        <v-flex
          class="px-5"
          xs4
        >
          <v-card
            class=""
            height="80"
          >
            <div class="text-center">
              <h2 class="font-weight-bold pt-1">4</h2>
              <div class="overline card-sub">prise de contact</div>
            </div>
          </v-card>
        </v-flex>
      </v-row>
    </div>
    <div class="mt-8 ml-4">
      <v-card
        height="590"
        class="text-center pt-8"
      >
        <v-date-picker
        class="datePicker"
          small
          v-model="picker"
          color="primary"
          elevation="8"
        ></v-date-picker>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      picker: ''
    }
  }
}
</script>
<style>
  .datePicker input{
    height:10px;
    width: 10px;
  }
</style>
<style scoped>
.v-select {
  width: 400px;
}
.card-sub {
  line-height: 15px;
  opacity: 0.4;
  position:absolute;
  bottom: 7px;
}
</style>
