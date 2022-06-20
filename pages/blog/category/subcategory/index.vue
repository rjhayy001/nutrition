<template>
  <v-navigation-drawer
    temporary
    right
    fixed
    v-model="drawer"
    width="40%"
    hide-overlay
  >
    <div class="pa-2">
      <v-flex xs12>
        <p class="title mb-0 font-weight-medium">View Sub-Category</p>
      </v-flex>
      <v-data-table
        :headers="headers"
        :items="categories"
        class="elevation-1 custom-table"
      >
        <template v-slot:item.index="{item,index}">
         {{index + 1}}
        </template>
        <template v-slot:item.name="{ item }">
          {{item.name}}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
            color="green"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
            color="red"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </div>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {
      drawer:false, 
      categories: [],
      selectedCategory: null,
      headers: [
        {
          text: 'Num',
          value: 'index',
        },
        { 
          text: 'Categoty Name', 
          align: 'start', 
          value: 'category.name', 
          width: '200px'
        },
        { 
          text: 'Sub-Categoty Name', 
          align: 'start', 
          value: 'name', 
          width: '200px'
        },

        {
          text: "Action",
          value: "actions",
          width: '50px'
        },
      ],
    }
  },
  props: {
    drawerStatus: {
      type:Boolean,
      default: () => false
    },
    // dataSubCategory: {
    //   type:Array,
    //   default: () => false
    // }
  },
  watch: {
    drawerStatus(val) {
      if(val) this.drawer = val
    },
    drawer(val) {
      if (!val) {
        this.$emit("close");
      }
    },
  },
  mounted() {
    this.getAllSubcategory()
  },
  methods: {
    getAllSubcategory() {
      this.$axios.get(`${this.$subcategory}?category_id=` + this.selectedCategory).then(({ data }) => {
        this.categories = data.data;
      });
    }
  }
}
</script>