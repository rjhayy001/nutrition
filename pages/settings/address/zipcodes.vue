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
      <template v-slot:cities="{item}">
        <template v-if="!item.cities.length">
          ...
        </template>
        <template v-else v-for="city of item.cities">
          <v-chip small outlined label color="primary" :key="city.id">{{city.name}}</v-chip>
        </template>
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
import formDrawer from "~/components/zipcode/form.vue";
export default {
  components: { dataTable, formDrawer},
  mixins:[tableHelper, dateHelper],
  data() {
    return {
      options: {},
      title: this.$t('address.zipcodes'),
      headers: [
        { text: "#", value: "id", width:'2%'},
        { text: "Code", value: "code"},
        { text: this.$t('address.city'), value: "cities" },
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
      this.$axios.get(`${this.$zipcodes}?${this.urlQuery()}&relations=cities`).then(({data}) => {
        this.data = data.data
        this.options = data.options
      })
    },
    addRecord(payload) {
      this.create().then(() => {
        this.$axios.post(`${this.$zipcodes}`, payload).then(({data}) => {
          this.successNotification(data, 'added', 'zipcode', 'zipcodes', 'code')
          this.initalize()
        })
      })
    },
    deleteRecord(items) {
      this.delete().then(() => {
        let ids = this.getIds(items)
        this.$axios.delete(`${this.$zipcodes}/${ids}`).then(({data}) => {
          this.successNotification(data, 'deleted', 'zipcode', 'zipcodes', 'code')
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
        this.$axios.put(`${this.$zipcodes}/${payload.id}`, payload).then(({data}) => {
          this.successNotification(data, 'updated', 'zipcode', 'zipcodes', 'code')
          this.initalize()
        })
      })
    }
  },
};
</script>
