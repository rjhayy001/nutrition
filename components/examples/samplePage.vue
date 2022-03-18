<template>
  <v-container>
    <data-table
      :options="options"
      :title="title"
      :headers="headers"
      :data="data"
      class="custom-table"
      @addRecord="addRecord"
      @deleteRecord="deleteRecord($event)"
    >
    </data-table>
  </v-container>
</template>
<script>
import dataTable from "~/components/ui/dataTable.vue";
export default {
  components: { dataTable },
  data() {
    return {
      options: {},
      title: "New Clients",
      headers: [
        {
          text: "#",
          value: "id",
          width:'2%',
        },
        {
          text: "First name",
          value: "first_name",
          filterable:true,
          sortType:null
        },
        { 
          text: "Last name", 
          value: "last_name",
          filterable:true,
          sortType:null
        },
        { 
          text: "Email", 
          value: "email",
          filterable:true,
          sortType:null
        },
        { 
          text: "Status", 
          value: "status",
        },
        { 
          text: "Phone 1", 
          value: "phone_1",
          filterable:true,
          sortType:null
        },
        { 
          text: "Phone 2", 
          value: "phone_1",
          filterable:true,
          sortType:null
        },
        { 
          text: "Action", 
          value: "action" 
        },
      ],
      data: [],
    };
  },
  mounted() {
    this.getRecords()
  },
  methods: {
    getRecords() {
      this.$axios.get('clients').then(({data}) => {
        this.data = data
      })
    },
    addRecord() {
      // this.$root.dialog(
      //   "Confirm Message!",
      //   "Are you sure you want to add this record ?",
      //   "c"
      // )
      //   .then(() => {});
    },
    deleteRecord(item) {
       this.$root.dialog(
        "Confirm Action!",
        "Are you sure you want to delete this record ?",
        "add"
      )
        .then(() => {});
    }
  },
};
</script>
