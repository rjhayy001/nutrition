<template>
  <v-container>
    <form-drawer :drawerStatus="drawer" @closeDrawer="drawer = !drawer"
      @addRecord="addRecord($event)"
      @updateRecord="updateRecord($event)"
      :selectedItem="selectedItem"
    ></form-drawer>
    <data-table
      :options="options"
      :title="title"
      :headers="headers"
      :data="data"
      searchPlaceholder="Title"
      class="custom-table"
      @addRecord="drawer = !drawer"
      @deleteRecord="deleteRecord($event)"
      @reloadtable="initialize()"
      @FilterBy="filterBy($event)"
      @updatePagenum="updatePagenum($event)"
      @searchRecords="searchRecords($event)"
      @editRecord="editRecord($event)"
    >
      <template v-slot:status="{item}">
        <v-switch
          v-model="item.status"
          inset
          color="success"
          dense
          hide-details=""
        ></v-switch>
      </template>
      <template v-slot:send_to="{ item }">
        <span><strong>{{item.clients.length}}</strong> clients</span>,
        <span><strong>{{item.coaches.length}}</strong> coaches</span>
      </template>
      <template v-slot:type="{item}">
        {{ item.type==0 ? "One Time Only" : "Recurring" }}
      </template>
      <template v-slot:created_at="{item}">
        {{formatDate(item.created_at)}}
      </template>
      <template v-slot:updated_at="{item}">
        {{formatDate(item.updated_at)}}
      </template>
    </data-table>
  </v-container>
</template>
<script>
import dataTable from "~/components/ui/dataTable.vue";
import tableHelper from "~/mixins/tableHelper.vue";
import dateHelper from "~/mixins/dateHelper.vue";
import formDrawer from "~/components/announcement/form.vue";
import commonDialog from "@/components/common/commonDialog.vue";
export default {
  components: { dataTable, formDrawer, commonDialog},
  mixins:[tableHelper, dateHelper],
  data() {
    return {
      options: {},
      default_limit: 2,
      title: "Announcement",
      headers: [
        { 
          text: "#", 
          value: "id", 
          width:'2%'
        },
        { 
          text: "title", 
          value: "title"
        },
        { 
          text: "Message", 
          value: "message" 
        },
        { 
          text: "Send to", 
          value: "send_to" 
        },
        { 
          text: "Type", 
          value: "type" 
        },
        { 
          text: "Time", 
          value: "time" 
        },
        { 
          text: "Status", 
          value: "status" 
        },
        { 
          text: "Created at", 
          value: "created_at" 
        },
        { 
          text: "Updated at", 
          value: "updated_at" 
        },
        { 
          text: "Action", 
          value: "action" 
        },
      ],
      data: [],
      receiver:[],
      drawer:false,
      selectedItem:{}
    };
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.$axios.get(`${this.$announces}?${this.urlQuery()}&relations=clients,coaches`).then(({data}) => {


        // console.log(list,"sad")

        
        this.data = data.data
        this.options = data.options
      })
    },
    addRecord(payload) {
      this.create().then(() => {
        this.$axios.post(`${this.$announces}`, payload).then(({data}) => {
          this.successNotification(data, 'added', 'announce', 'announces', 'title')
          this.initialize()
        })
      })
    },
    deleteRecord(items) {
      this.$root.dialog(
        "Confirm delete Action!",
        `Are you sure you want to delete ${items.length == 1 ? 'this record' : 'these records'} ?`,
        "delete"
      ).then(() => {
        let ids = this.getIds(items)
        this.$axios.delete(`cities/${ids}`).then(({data}) => {
          this.successNotification(data, 'deleted', 'city', 'cities', 'name')
          this.initialize()
        })
      });
    },
    editRecord(item) {
      this.drawer = !this.drawer
      this.selectedItem = this.cloneVariable(item)
    },
    updateRecord(payload) {
      this.$axios.put(`cities/${payload.id}`, payload).then(({data}) => {
        this.successNotification(data, 'updated', 'city', 'cities', 'name')
        this.initialize()
      })
    },
  },
};
</script>
