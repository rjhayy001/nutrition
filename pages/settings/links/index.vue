<template>
  <v-container>
    <form-drawer :drawerStatus="drawer1" @closeDrawer="drawer1 = !drawer1"
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
      searchPlaceholder="Name, Description, Links"
      class="custom-table"
      @addRecord="drawer1 = !drawer1"
      :currentUrl="url"
      @deleteRecord="deleteRecord($event)"
      @reloadtable="initialize()"
      @FilterBy="filterBy($event)"
      @updatePagenum="updatePagenum($event)"
      @searchRecords="searchRecords($event)"
      @editRecord="editRecord($event)"
    >
      <template v-slot:status="{item}">
        <v-switch
          inset
          color="success"
          v-model="item.status"
          dense
          @change="updateStatusValue(item)"
          hide-details=""
        ></v-switch>
      </template>
       <template v-slot:created_at="{item}">
        {{formatDate(item.created_at)}}
      </template>
      <template v-slot:link="{item}">
        <a :href="item.link" target="_blank">{{item.link}}</a>
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
import formDrawer from "~/components/settings/links/form.vue";
export default {
  components: { dataTable, formDrawer },
  mixins:[tableHelper, dateHelper],
  data() {
    return {
      options: {},
      title: "Links",
      headers: [
        { text: "#", value: "id", width:'2%'},
        { text: "title", value: "title", filterable:true, sortType:null, filterValue:''},
        { text: "Description", value: "description", filterable:true, sortType:null, filterValue:'' },
        { text: "Link", value: "link", filterable:true, sortType:null, filterValue:'' },
        { text: "Status", value: "status" },
        { text: "Created at", value: "created_at", filterable:true, sortType:null, filterValue:'' },
        { text: "Updated at", value: "updated_at", filterable:true, sortType:null, filterValue:'' },
        { text: "Action", value: "action"},
      ],
      data: [],
      drawer1:false,
      selectedItem:{},
      url: ''
    };
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.$axios.get(`${this.$links}?${this.urlQuery()}`).then(({data}) => {
        this.data = data.data
        this.options = data.options
        this.url = `${this.$links}?${this.urlQuery()}`
      })
    },
    addRecord(payload) {
       this.create().then(() => {
        this.$axios.post(`${this.$links}`, payload).then(({data}) => {
          this.successNotification(data, 'added', 'link', 'links', 'title')
          this.initialize()
        })
      })
    },
    editRecord(item) {
      this.drawer1 = !this.drawer1
      this.selectedItem = this.cloneVariable(item)
    },
    deleteRecord(items) {
      this.delete().then(() => {
        let ids = this.getIds(items)
        this.$axios.delete(`${this.$links}/${ids}`).then(({data}) => {
          this.successNotification(items, 'deleted', 'link', 'links', 'title')
          this.initialize()
        })
      })
    },
    updateStatusValue(item) {
      let payload = {status:item.status}
      this.$axios.put(`links/${item.id}/status`, payload).then(({data}) => {
        this.successNotification(item, 'change status', 'link', 'links', 'title')
      })
    },
    updateRecord(payload) {
      this.update().then(() => {
        this.$axios.put(`${this.$links}/${payload.id}`, payload).then(({data}) => {
          this.successNotification(payload, 'updated', 'link', 'links', 'title')
          this.initialize()
        })
      })
    },
  },
};
</script>
