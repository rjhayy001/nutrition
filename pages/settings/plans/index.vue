<template>
  <v-container>
    <form-drawer 
      :drawerStatus="drawer"
      :selectedItem="selectedItem"
      @closeDrawer="drawer = false"
      @addRecord="addRecord($event)"
      @updateRecord="updateRecord($event)" 
    >
    </form-drawer>
    <data-table :options="options" :title="title" :headers="headers" :data="data"
      searchPlaceholder="Short name, Long name, Code" class="custom-table" @addRecord="drawer = !drawer"
      @deleteRecord="deleteRecord($event)" @reloadtable="initialize()" @FilterBy="filterBy($event)"
      @updatePagenum="updatePagenum($event)" :currentUrl="url" @searchRecords="searchRecords($event)" @editRecord="editRecord($event)">

      <template v-slot:description="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              {{ item.description | truncate(30) }}
            </div>
          </template>
          {{ item.description }}
        </v-tooltip>
      </template>

      <template v-slot:status="{ item }">
        <v-switch v-model="item.status" inset color="success" dense hide-details="auto" @change="updateDefaultValue(item)">
        </v-switch>
      </template>

      <template v-slot:prices="{ item }">
        <template v-if="item.prices.length">
          <plan-prices :prices="item.prices" />
        </template>
        <template v-else>
          ...
        </template>
      </template>


      <template v-slot:created_at="{ item }">
        {{ formatDate(item.created_at) }}
      </template>
      <template v-slot:updated_at="{ item }">
        {{ formatDate(item.updated_at) }}
      </template>
    </data-table>
  </v-container>
</template>
<script>
import dataTable from "~/components/ui/dataTable.vue";
import tableHelper from "~/mixins/tableHelper.vue";
import dateHelper from "~/mixins/dateHelper.vue";
import formDrawer from "~/components/plan/form.vue";
import priceHelperVue from "../../../mixins/priceHelper.vue";
import planPrices from '~/components/plan/planPrices.vue';
import textHelper from "~/mixins/textHelper.vue";
export default {
  components: { dataTable, formDrawer, planPrices },
  mixins: [tableHelper, dateHelper, priceHelperVue, textHelper],
  data() {
    return {
      options: {},
      title: "Plans",
      headers: [
        { text: "#", value: "id", width: "2%" },
        { text: "Nom", value: "name", filterable: true, sortType: null, filterValue: "" },
        { text: "Description", value: "description", filterable: true, sortType: null, filterValue: "" },
        { text: "Prix", value: "prices", filterable: true, sortType: null, filterValue: "" },
        { text: "Actif", value: "status" },
        { text: "Cr???? le", value: "created_at", filterable: true, sortType: null, filterValue: "" },
        { text: "Mis ?? jour le", value: "updated_at", filterable: true, sortType: null, filterValue: "" },
        { text: "Actions", value: "action" },
      ],
      data: [],
      drawer: false,
      selectedItem: {},
      url: ''
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.$axios
        .get(`${this.$plans}?${this.urlQuery()}&relations=prices`)
        .then(({ data }) => {
          this.data = data.data;
          this.options = data.options;
          this.url = `${this.$plans}?${this.urlQuery()}&relations=prices`
        });
    },
    addRecord(payload) {
      this.create().then(() => {
        this.$axios.post(`${this.$plans}`, payload).then(({ data }) => {
          // this.successNotification(data, "added", "plan", "plans", "name");
          this.initialize();
        });
          this.drawer=false
      });
    },
    deleteRecord(items) {
      this.delete().then(() => {
        let ids = this.getIds(items);
        this.$axios.delete(`${this.$plans}/${ids}`).then(({ data }) => {
          this.successNotification(
            items,
            "deleted",
            "plan",
            "plans",
            "name"
          );
          this.initialize();
        });
      });
    },
    updateDefaultValue(item) {
      let payload = { is_default: item.is_default };
      this.$axios
        .put(`${this.$plans}/${item.id}/default`, payload)
        .then(({ data }) => {
          this.successNotification(
            item,
            "set as default",
            "plan",
            "plans",
            "name"
          );
        });
    },
    editRecord(item) {
      this.drawer = !this.drawer;
      this.selectedItem = this.cloneVariable(item);
    },
    updateRecord(payload) {
      this.update().then(() => {
        this.$axios
          .put(`${this.$plans}/${payload.id}`, payload)
          .then(({ data }) => {
            this.successNotification(
              data,
              "updated",
              "plan",
              "plans",
              "name"
            );
            this.initialize();
          });
      });
    },
  },
};
</script>
