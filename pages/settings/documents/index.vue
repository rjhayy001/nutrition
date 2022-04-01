<template>
  <v-container>
    <!-- <v-navigation-drawer
      temporary
      right
      fixed
      v-model="drawer1"
      width="50%"
    >
      <p class="pa-2 title font-weight-regular text-uppercase d-flex justify-space-between">
        Add new Client
        <v-btn icon small @click="goTo('clients-create')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </p>
      <hr>
    </v-navigation-drawer> -->
    <data-table
      :options="options"
      :title="title"
      :headers="headers"
      :data="data"
      class="custom-table"
      @addRecord="addRecord"
      @deleteRecord="deleteRecord($event)"
      @reloadtable="initalize()"
      @FilterBy="filterBy($event)"
      @updatePagenum="updatePagenum($event)"
    >
      <template v-slot:status="{item}">
        <v-switch
          inset
          color="success"
          dense
          hide-details=""
        ></v-switch>
      </template>
    </data-table>
  </v-container>
</template>
<script>
import dataTable from "~/components/ui/dataTable.vue";
import tableHelper from "~/mixins/tableHelper.vue";
export default {
  components: { dataTable },
  mixins:[tableHelper],
  data() {
    return {
      options: {},
      title: "Clients",
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
          sortType:null,
          filterValue:''
        },
        { 
          text: "Last name", 
          value: "last_name",
          filterable:true,
          sortType:null,
          filterValue:''
        },
        { 
          text: "Email", 
          value: "email",
          filterable:true,
          sortType:null,
          filterValue:'',
        },
        { 
          text: "Status", 
          value: "status",
        },
        { 
          text: "Phone 1", 
          value: "phone_1",
          filterable:true,
          sortType:null,
          filterValue:''
        },
        { 
          text: "Phone 2", 
          value: "phone_1",
          filterable:true,
          sortType:null,
          filterValue:''
        },
        { 
          text: "Action", 
          value: "action" 
        },
      ],
      data: [],
      drawer1:false
    };
  },
  mounted() {
    this.initalize()
  },
  methods: {
    initalize() {
      this.$axios.get(`clients?${this.urlQuery()}`).then(({data}) => {
        this.data = data.data
        this.options = data.options
      })
    },
    addRecord() {
      this.goTo('clients-create')
      // this.$root.dialog(
      //   "Confirm Message!",
      //   "Are you sure you want to add this record ?",
      //   "c"
      // )
      //   .then(() => {});
    },
    deleteRecord(items) {
      this.delete().then(() => {
        let ids = this.getIds(items)
        this.$axios.delete(`client/${ids}`).then(({data}) => {
          this.successNotification(items, 'deleted', 'client', 'clients')
          this.initalize()
        })
      })
    },
  },
};
</script>
