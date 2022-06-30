<template>
  <v-container>
    <data-table
      :options="options"
      :title="title"
      :headers="headers"
      :data="data"
      class="custom-table"
      @addRecord="addRecord"
      :currentUrl="url"
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
      title: this.$t('global.payment')+'s',
      headers: [
        {
          text: "#",
          value: "id",
          width:'2%',
        },
        {
          text: this.$t('clients.firstName'),
          value: "first_name",
          filterable:true,
          sortType:null,
          filterValue:''
        },
        { 
          text: this.$t('clients.lastName'), 
          value: "last_name",
          filterable:true,
          sortType:null,
          filterValue:''
        },
        { 
          text: this.$t('clients.email'), 
          value: "email",
          filterable:true,
          sortType:null,
          filterValue:'',
        },
        { 
          text: this.$t('clients.status'), 
          value: "status",
        },
        { 
          text: this.$t('clients.phone')+' 1', 
          value: "phone_1",
          filterable:true,
          sortType:null,
          filterValue:''
        },
        { 
          text: this.$t('clients.firstName')+' 2', 
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
      drawer1:false,
      url: ''
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
        this.url = `clients?${this.urlQuery()}`
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
      this.$root.dialog(
        "Confirm Action!",
        `Are you sure you want to delete ${items.length == 1 ? 'this record' : 'these records'} ?`,
        "delete"
      ).then(() => {
        let ids = this.getIds(items)
        this.$axios.delete(`client/${ids}`).then(({data}) => {
          this.successNotification(items, 'deleted', 'client', 'clients')
          this.initalize()
        })
      });
    },
  },
};
</script>
