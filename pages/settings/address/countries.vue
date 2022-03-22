<template>
  <v-container>
    <form-drawer :drawerStatus="drawer" @closeDrawer="drawer = !drawer"
      @addRecord="addRecord($event)"
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
      @reloadtable="initalize()"
      @FilterBy="filterBy($event)"
      @updatePagenum="updatePagenum($event)"
      @searchRecords="searchRecords($event)"
      @edit="editRecord($event)"
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
import formDrawer from "~/components/countries/form.vue";
export default {
  components: { dataTable, formDrawer},
  mixins:[tableHelper, dateHelper],
  data() {
    return {
      options: {},
      title: "Countries",
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
    this.initalize()
  },
  methods: {
    initalize() {
      this.$axios.get(`countries?${this.urlQuery()}`).then(({data}) => {
        this.data = data.data
        this.options = data.options
      })
    },
    addRecord(payload) {
      this.$axios.post(`countries`, payload).then(({data}) => {
        this.successNotification(data, 'added', 'country', 'countries', 'short_name')
      })
    },
    deleteRecord(items) {
      this.$root.dialog(
        "Confirm delete Action!",
        `Are you sure you want to delete ${items.length == 1 ? 'this record' : 'these records'} ?`,
        "delete"
      ).then(() => {
        let ids = this.getIds(items)
        this.$axios.delete(`countries/${ids}`).then(({data}) => {
          this.successNotification(items, 'deleted', 'country', 'countries', 'short_name')
          this.initalize()
        })
      });
    },
    updateDefaultValue(item) {
      let payload = {is_default:item.is_default}
      this.$axios.put(`countries/${item.id}/default`, payload).then(({data}) => {
        this.successNotification(item, 'set as default', 'country', 'countries', 'short_name')
      })
    },
    
  },
};
</script>
