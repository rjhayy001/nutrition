<template>
  <v-container>
    <data-table
      :options="options"
      :title="title"
      :headers="headers"
      :data="data"
      :sort-desc.sync="isDescending"
      class="custom-table"
      @addRecord="addRecord"
      @deleteRecord="deleteRecord($event)"
      @reloadtable="initalize()"
      @FilterBy="filterBy($event)"
      @updatePagenum="updatePagenum($event)"
      @searchRecords="searchRecords($event)"
      @editRecord="editRecord($event)"
    >
      <template v-slot:status="{ item }">
        <v-switch
          @click="changeStatus(item)"
          v-model="item.status"
          inset
          color="success"
          dense
          hide-details=""
        ></v-switch>
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
import formCoach from "~/components/coaches/form.vue";
export default {
  components: { dataTable, formCoach },
  mixins: [tableHelper, dateHelper],
  data() {
    return {
      options: {},
      title: "Coaches",
      headers: [
        {
          text: "#",
          value: "id",
          width: "2%",
        },
        {
          text: "First name",
          value: "first_name",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: "Last name",
          value: "last_name",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: "Email",
          value: "email",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: "Status",
          value: "status",
        },
        {
          text: "Phone 1",
          value: "phone_1",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: "Phone 2",
          value: "phone_1",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: "Created at",
          value: "created_at",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: "Updated at",
          value: "updated_at",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: "Action",
          value: "action",
        },
      ],
      data: [],
      drawer: false,
      isDescending: true,
    };
  },
  mounted() {
    this.initalize();
  },
  methods: {
    initalize() {
      this.$axios.get(`coaches?${this.urlQuery()}`).then(({ data }) => {
        this.data = data.data;
        console.log(this.data, "data");
        this.options = data.options;
      });
    },
    addRecord() {
      this.goTo("settings-coaches-create");
    },
    changeStatus(payload) {
      this.$axios
        .put(`coaches/${payload.id}/updateStatus`, payload)
        .then(({ data }) => {
          this.successNotification( payload, "updated", "coach", "coaches", "first_name");
          this.initalize();
        });
    },
    editRecord(item) {
      this.goTo("settings-coaches-edit-id", { id: item.id });
    },
    deleteRecord(items) {
      this.delete().then(() => {
        let ids = this.getIds(items);
        this.$axios.delete(`coaches/${ids}`).then(({ data }) => {
          this.successNotification( items, "deleted", "coach", "coaches", "first_name");
          this.initalize();
        });
      });
    },
  },
};
</script>
