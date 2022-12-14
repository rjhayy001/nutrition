<template>
  <v-container fluid>
    <form-drawer :tagDrawer="drawer" @closeDrawer="drawer = !drawer"
      @addRecord="addRecord($event)"
      @updateRecord="updateRecord($event)"
      :selectedItem="selectedItem"
    >
    </form-drawer>
    <data-table
      :options="options"
      :title="title"
      :currentUrl="url"
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
import formDrawer from "~/components/tag/form.vue";
export default {
  components: { dataTable, formDrawer},
  mixins:[tableHelper, dateHelper],
  data() {
    return {
      options: {},
      title: "Tags",
      headers: [
        { text: "#", value: "id", width:'2%' },
        { text: "Name", value: "name", filterable:true, sortType:null, filterValue:''},
        { text: "Color", value: "color" , filterable:true, sortType:null, filterValue:''},
        { text: "Description", value: "description" , filterable:true, sortType:null, filterValue:''},
        { text: "Created at", value: "created_at", filterable:true, sortType:null, filterValue:''},
        { text: "Updated at", value: "updated_at", filterable:true, sortType:null, filterValue:''},
        { text: "Action", value: "action"},
      ],
      data: [],
      drawer:false,
      url: '',
      selectedItem:{}
    };
  },
  mounted() {
    this.initalize()
  },
  methods: {
    initalize() {
      this.$axios.get(`${this.$tags}?${this.urlQuery()}`).then(({data}) => {
        this.data = data.data
        this.options = data.options
        this.url = `${this.$tags}?${this.urlQuery()}`
      })
    },
    addRecord(payload) {
      this.create().then(() => {
        this.$axios.post(`${this.$tags}`, payload).then(({data}) => {
          this.successNotification(data, 'added', 'name', 'color', 'description')
        })
      })
    },
    deleteRecord(items) {
      this.delete().then(() => {
        let ids = this.getIds(items)
        this.$axios.delete(`${this.$tags}/${ids}`).then(({data}) => {
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
      this.update().then(() => {
        this.$axios.put(`${this.$tags}/${payload.id}`, payload).then(({data}) => {
          this.successNotification(data, 'updated', 'country', 'countries', 'short_name')
          this.initalize()
        })
      })
    },
  },
};
</script>
