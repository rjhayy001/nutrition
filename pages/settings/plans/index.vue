<template>
  <v-container>
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
      searchPlaceholder="Short name, Long name, Code"
      class="custom-table"
      @addRecord="drawer = !drawer"
      @deleteRecord="deleteRecord($event)"
      @reloadtable="initialize()"
      @FilterBy="filterBy($event)"
      @updatePagenum="updatePagenum($event)"
      @searchRecords="searchRecords($event)"
      @editRecord="editRecord($event)"
    >
      <template v-slot:is_default="{item}">
        <v-switch
          v-model="item.is_default"
          inset
          color="success"
          dense
          hide-details=""
          @change="updateDefaultValue(item)"
        ></v-switch>
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
import formDrawer from "~/components/plan/form.vue";
export default {
  components: { dataTable, formDrawer},
  mixins:[tableHelper, dateHelper],
  data() {
    return {
      options: {},
      title: "Plans",
      headers: [
        { text: "#", value: "id", width:'2%'},
        { text: "Short name", value: "short_name"},
        { text: "Long name", value: "long_name" },
        { text: "Code", value: "country_numcode" },
        { text: "Default", value: "is_default" },
        { text: "Created at", value: "created_at"},
        { text: "Updated at", value: "updated_at"},
        { text: "Action", value: "action"},
      ],
      data: [],
      drawer:false,
      selectedItem:{}
    };
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.$axios.get(`${this.$plans}?${this.urlQuery()}`).then(({data}) => {
        this.data = data.data
        this.options = data.options
      })
    },
    addRecord(payload) {
      this.create().then(() => {
        this.$axios.post(`${this.$plans}`, payload).then(({data}) => {
          this.successNotification(data, 'added', 'country', 'plans', 'name')
        })
      })
    },
    deleteRecord(items) {
      this.delete().then(() => {
        let ids = this.getIds(items)
        this.$axios.delete(`${this.$plans}/${ids}`).then(({data}) => {
          this.successNotification(items, 'deleted', 'country', 'plans', 'short_name')
          this.initialize()
        })
      })
    },
    updateDefaultValue(item) {
      let payload = {is_default:item.is_default}
      this.$axios.put(`${this.$plans}/${item.id}/default`, payload).then(({data}) => {
        this.successNotification(item, 'set as default', 'country', 'plans', 'short_name')
      })
    },
    editRecord(item) {
      this.drawer = !this.drawer
      this.selectedItem = this.cloneVariable(item)
    },
    updateRecord(payload) {
      this.update().then(() => {
        this.$axios.put(`${this.$plans}/${payload.id}`, payload).then(({data}) => {
          this.successNotification(data, 'updated', 'country', 'plans', 'short_name')
          this.initialize()
        })
      })
    }
  },
};
</script>
