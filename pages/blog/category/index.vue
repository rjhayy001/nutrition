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
        <p class="title mb-0 font-weight-medium">Category</p>
      </v-flex>
      <v-data-table
        :headers="headers"
        :items="categories"
        hide-default-footer
        disable-pagination
        class="elevation-1 custom-table"
      >
        <template v-slot:item.index="{item,index}">
        {{index + 1}}
        </template>
        <template v-slot:item.name="{ item }">
          <span v-if="!$isIncluded(item.id, selectedItem)">{{item.name}}
          </span>
          <v-text-field v-else v-model="item.name"></v-text-field>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            v-if="!$isIncluded(item.id, selectedItem)"
            @click="editItem(item)"
            color="green"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            class="mr-2"
            v-else
            @click="saveItem(item)"
            color="green"
          >
            mdi-heart
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
import arrayHelper from "@/mixins/arrayHelper.vue";
  export default {
    mixins: [arrayHelper],
  data() {
    return {
      drawer:false, 
      dialog:false,
      selectedItem:[],
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
    updateData: {
      type: Array,
      default: () => false
    }
  },
  watch: {
    drawerStatus(val) {
      if(val) this.drawer = val
    },
    updateData(val) {
      if(val) this.getAllCategory()
    },
    drawer(val) {
      if (!val) {
        this.$emit("close");
      }
    },
  },
  mounted() {
    this.getAllCategory()
  },
  methods: {
    getAllCategory() {
      this.$axios.get(`${this.$category}?no-paginate=''`).then(({data}) => {
        this.categories = data.data
      })
    },
    editItem (item) {
      this.selectedItem = []
      if(!this.$isIncluded(item.id, this.selectedItem)){
        this.$arrayupdater(item.id, this.selectedItem)
      }
    },
    saveItem(item){
      this.$axios.put(`${this.$category}/${item.id}`, item).then(({ data }) => {
        this.successNotification(item,"updated","category","categories","name");
        this.$arraysplicer(item.id, this.selectedItem)
        this.getAllCategory()
      });
    },
    deleteItem(items) {
      this.delete().then(() => {
        this.$axios.delete(`${this.$category}/${items.id}`).then(({ data }) => {
          this.successNotification(
            items,
            "deleted",
            "category",
            "categories",
            "name"
          );
          this.getAllCategory();
        });
      });
    },
  }
}
</script>