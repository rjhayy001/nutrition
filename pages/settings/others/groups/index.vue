<template>
  <v-container fluid>
    <form-drawer :drawerStatus="drawer" @closeDrawer="drawer = !drawer"
      @addRecord="addRecord($event)"
      @updateRecord="updateRecord($event)"
      :selectedItem="selectedItem"
    >
    </form-drawer>
    <data-table
      :options="options"
      :title="title"
      :headers="headers"
      :data="data"
      searchPlaceholder="Name, Color, Description"
      class="custom-table"
      @addRecord="drawer = !drawer"
      @deleteRecord="deleteRecord($event)"
      @reloadtable="initalize()"
      @FilterBy="filterBy($event)"
      @updatePagenum="updatePagenum($event)"
      @searchRecords="searchRecords($event)"
      @editRecord="editRecord($event)"
    >
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
import formDrawer from "~/components/group/form.vue";
export default {
  components: { dataTable, formDrawer},
  mixins:[tableHelper, dateHelper],
  data() {
    return {
      options: {},
      title: "Groups",
      headers: [
        { text: "#", value: "id", width:'2%', filterable:true, sortType:null, filterValue:''},
        { text: "Name", value: "name", filterable:true, sortType:null, filterValue:''},
        { text: "Created at", value: "created_at", filterable:true, sortType:null, filterValue:''},
        { text: "Updated at", value: "updated_at", filterable:true, sortType:null, filterValue:''},
        { text: "Action", value: "action", filterable:true, sortType:null, filterValue:''},
      ],
      data: [],
      drawer:false,
      selectedItem:{}
    };
  },
  mounted() {
    this.initalize()
  },
  methods: {
    initalize() {

      this.$axios.get(`groups?${this.urlQuery()}`).then(({data}) => {
        this.data = data.data
        this.options = data.options
      })
    },
    addRecord(payload) {
      alert(payload)
      this.$axios.post(`groups`, payload).then(({data}) => {
        this.successNotification(data, 'added', 'name', 'color', 'description')
      })
    },
    deleteRecord(items) {
      this.$root.dialog(
        "Confirm delete Action!",
        `Are you sure you want to delete ${items.length == 1 ? 'this record' : 'these records'} ?`,
        "delete"
      ).then(() => {
        let ids = this.getIds(items)
        this.$axios.delete(`groups/${ids}`).then(({data}) => {
          this.successNotification(items, 'deleted', 'name', 'color', 'description')
          this.initalize()
        })
      });
    },
    editRecord(item) {
      this.drawer = !this.drawer
      this.selectedItem = this.cloneVariable(item)
    },
    updateRecord(payload) {
      this.$axios.put(`groups/${payload.id}`, payload).then(({data}) => {
        this.successNotification(data, 'updated', 'country', 'countries', 'short_name')
        this.initalize()
      })
    }
  },
};
</script>
