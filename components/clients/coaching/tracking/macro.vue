<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-capitalize">Les Macros</v-expansion-panel-header>
    <v-expansion-panel-content>
      <div>
        <statistics-component
        :statistics="formattedStatistics"
        :title="title"
      />
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import statisticsComponent from "@/components/common/statisticComponent.vue";
export default {
  components: {
    statisticsComponent
  },
  data(){
    return {
      title: "",
    }
  },
  computed: {
    formattedStatistics() {
      return [
        {
          title:'Protein',
          value: 0,
          type: 'number'
        },
        {
          title:'Lipides',
          value: 1,
          type: 'number'
        },
        {
          title:'Glucides',
          value: 2,
          type: 'number'
        },
        {
          title:'Legumes',
          value: 3,
          type: 'number'
        },
      ]
    }
  },
}
</script>
