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
        sm12
        class="mb-2"
      >
        <div>
          <v-tabs
            v-model="tab"
            background-color="transparent"
            grow
          >
            <v-tab
              v-for="item in items"
              :key="item.title"
              :to="{name: item.to}"
            >
              {{ item.title }}
            </v-tab>
          </v-tabs>
        </div>
      </v-flex>
    </v-layout>
    <v-container>
      <Nuxt />
    </v-container>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      tab: null,
      items: [
        {
          title: 'Alimentation',
          to: 'client-id-coaching-formula-food'
        },
        {
          title: 'Antecedents',
          to: 'client-id-coaching-formula-medicalHistory'
        },
        {
          title: 'Objectifs',
          to: 'client-id-coaching-formula-goal'
        },
        {
          title: 'Sports',
          to: 'client-id-coaching-formula-sport'
        },
        {
          title: 'Stress',
          to: 'client-id-coaching-formula-stress'
        },
        {
          title: 'Sommeil',
          to: 'client-id-coaching-formula-sleep'
        },
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
}
</script>
<style>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
