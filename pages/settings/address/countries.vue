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
      :currentUrl="url"
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
import formDrawer from "~/components/country/form.vue";
export default {
  components: { dataTable, formDrawer},
  mixins:[tableHelper, dateHelper],
  data() {
    return {
      options: {},
      title: this.$t('address.country'),
      headers: [
        { text: "#", value: "id", width:'2%'},
        { text: this.$t('address.shortName'), value: "short_name", filterable: true, sortType: null, filterValue: ""},
        { text: this.$t('address.longName'), value: "long_name", filterable: true, sortType: null, filterValue: ""},
        { text: "Code", value: "country_numcode", filterable: true, sortType: null, filterValue: ""},
        { text: this.$t('address.default'), value: "is_default" },
        { text: this.$t('global.createdAt'), value: "created_at", filterable: true, sortType: null, filterValue: ""},
        { text: this.$t('global.updatedAt'), value: "updated_at", filterable: true, sortType: null, filterValue: ""},
        { text: "Action", value: "action"},
      ],
      data: [],
      drawer:false,
      selectedItem:{},
      url: ''
    };
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.$axios.get(`${this.$countries}?${this.urlQuery()}`).then(({data}) => {
        this.data = data.data
        this.options = data.options
        this.url = `${this.$countries}?${this.urlQuery()}`
      })
    },
    addRecord(payload) {
      this.create().then(() => {
        this.$axios.post(`${this.$countries}`, payload).then(({data}) => {
          this.successNotification(data, 'added', 'country', 'countries', 'short_name')
          this.$store.commit('resetForm', true)
        })
      })
    },
    deleteRecord(items) {
      this.delete().then(() => {
        let ids = this.getIds(items)
        this.$axios.delete(`${this.$countries}/${ids}`).then(({data}) => {
          this.successNotification(items, 'deleted', 'country', 'countries', 'short_name')
          this.initialize()
        })
      })
    },
    updateDefaultValue(item) {
      let payload = {is_default:item.is_default}
      this.$axios.put(`${this.$countries}/${item.id}/default`, payload).then(({data}) => {
        this.successNotification(item, 'set as default', 'country', 'countries', 'short_name')
      })
    },
    editRecord(item) {
      this.drawer = !this.drawer
      this.selectedItem = this.cloneVariable(item)
    },
    updateRecord(payload) {
      this.update().then(() => {
        this.$axios.put(`${this.$countries}/${payload.id}`, payload).then(({data}) => {
          this.successNotification(data, 'updated', 'country', 'countries', 'short_name')
          this.$store.commit('resetForm', true)
          this.initialize()
        })
      })
    },
  },
};
</script>
