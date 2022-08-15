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
      @reloadtable="initalize()"
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
      <template v-slot:country="{item}">
        <v-chip small outlined label color="primary">{{item.name}}</v-chip>
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
import formDrawer from "~/components/city/form.vue";
export default {
  components: { dataTable, formDrawer},
  mixins:[tableHelper, dateHelper],
  data() {
    return {
      options: {},
      title: this.$t('address.city'),
      headers: [
        { text: "#", value: "id", width:'2%'},
        { text: this.$t('address.name'), value: "name"},
        { text: this.$t('address.country'), value: "country" },
        { text: this.$t('address.zipcodes'), value: "zipcodes" },
        { text: this.$t('global.createdAt'), value: "created_at"},
        { text: this.$t('global.updatedAt'), value: "updated_at"},
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
      this.$axios.get(`${this.$cities}?${this.urlQuery()}&relations=country`).then(({data}) => {
        this.data = data.data
        this.options = data.options
      })
    },
    addRecord(payload) {
      this.create().then(() => {
        this.$axios.post(`${this.$cities}`, payload).then(({data}) => {
          this.successNotification(data, 'added', 'city', 'cities', 'name')
          this.initalize()
        })
      })
    },
    deleteRecord(items) {
      this.delete().then(() => {
        let ids = this.getIds(items)
        this.$axios.delete(`${this.$cities}/${ids}`).then(({data}) => {
          this.successNotification(data, 'deleted', 'city', 'cities', 'name')
          this.initalize()
        })
      })
    },
    editRecord(item) {
      this.drawer = !this.drawer
      this.selectedItem = this.cloneVariable(item)
    },
    updateRecord(payload) {
      this.update().then(() => {
        this.$axios.put(`${this.$cities}/${payload.id}`, payload).then(({data}) => {
          this.successNotification(data, 'updated', 'city', 'cities', 'name')
          this.initalize()
        })
      })
    }
  },
};
</script>
