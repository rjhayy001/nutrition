<template>
  <v-container fluid grid-list-md grid-list-sm class="page-statistics">
    <v-layout row wrap class="clients-statistics-wrapper">
      <v-flex xs12>
        <!-- <p class="title mb-0 font-weight-medium">{{title}} Summary</p> -->
        <p class="title mb-0 font-weight-medium">{{ $t('global.summary') }}</p>
      </v-flex>
      <v-flex xs1.5 v-for="(item, index) in statistics" :key="index">
        <v-card max-width="344">
          <v-card-text>
            <span class="display-1 text--primary">
              <span>{{item.value}}</span>
            </span><br />
            <span :class="['subtitle-1', item.class]">{{ item.title }}</span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      duration: 1000,
    }
  },
  props: {
    statistics: {
      type: Array,
      default: () => {
        return [];
      },
    },
    title: {
      type: String,
      default: () => "",
    },
  },
};
</script>