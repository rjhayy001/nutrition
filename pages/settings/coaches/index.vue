<template>
  <v-container fluid>
    <statistics-component
      :statistics="formattedStatistics"
      :title="title"
    />
    <data-table
      :options="options"
      :title="title"
      :headers="headers"
      :data="data"
      :sort-desc.sync="isDescending"
      class="custom-table"
      :currentUrl="url"
      @addRecord="addRecord"
      @showRecord="showRecord($event)"
      @deleteRecord="deleteRecord($event)"
      @reloadtable="initialize()"
      @FilterBy="filterBy($event)"
      @updatePagenum="updatePagenum($event)"
      @searchRecords="searchRecords($event)"
      @editRecord="showRecord($event)"
    >
      <!-- full_name -->
      <template v-slot:full_name="{ item }">
        <v-avatar size="36px">
          <img
            :alt="item.image"
            :src="item.logo ? item.logo : default_profile"
          />
        </v-avatar>
        <span class="pa-2"> {{ item.full_name }} </span>
      </template>
      <!-- status -->
      <template v-slot:status="{ item }">
        <v-switch
          @click.stop="changeStatus(item)"
          v-model="item.status"
          inset
          color="success"
          dense
          hide-details=""
        ></v-switch>
      </template>
      <!-- complete_phone -->
      <template v-slot:phone="{ item }">
        <template v-if="item.complete_phone == null"> ... </template>
        {{ item.complete_phone }}
      </template>
      <!-- complete_address -->
      <template v-slot:address="{ item }">
        <template v-if="item.address_1 == null && item.address_2 == null && item.zipcode == null && item.city == null && item.country == null"> ... </template>
        {{ getCompleteAddress(item) }}
      </template>
      <!-- birthday -->
      <template v-slot:birthday="{ item }">
        {{ item.birthday ? formatDate(item.birthday) : "..." }}
      </template>
      <!-- taggable -->
      <template v-slot:taggable="{ item }">
        <template v-if="!item.taggable.length"> ... </template>
        <common-dialog
          v-else
          :datas="item.taggable"
          :default_limit="default_limit"
          @delete="deleteTaggable"
        />
      </template>
      <!-- groupable -->
      <template v-slot:groupable="{ item }">
        <template v-if="!item.groupable.length"> ... </template>
        <common-dialog
          v-else
          :datas="item.groupable"
          :default_limit="default_limit"
          @delete="deleteGroupable"
        />
      </template>
      <!-- create_at -->
      <template v-slot:created_at="{ item }">
        {{ formatDate(item.created_at) }}
      </template>
      <!-- updated_at -->
      <template v-slot:updated_at="{ item }">
        {{ formatDate(item.updated_at) }}
      </template>
    </data-table>
  </v-container>
</template>
<script>
import dataTable from "@/components/ui/dataTable.vue";
import tableHelper from "@/mixins/tableHelper.vue";
import addressHelper from "@/mixins/addressHelper.vue";
import dateHelper from "@/mixins/dateHelper.vue";
import formCoach from "@/components/coaches/form.vue";
import default_profile from "@/static/images/empty_person.png";
import commonDialog from "@/components/common/commonDialog.vue";
import statisticsComponent from "@/components/common/statisticComponent.vue";
export default {
  name: "index",
  components: { dataTable, formCoach, commonDialog, statisticsComponent },
  mixins: [tableHelper, dateHelper, addressHelper],
  data() {
    return {
      default_profile,
      default_limit: 2,
      options: {},
      title: this.$t('subSidebar.coaches'),
      headers: [
        {
          text: "#",
          value: "id",
          width: "1%",
        },
        {
          text: this.$t('clients.fullName'),
          value: "full_name",
          filterable: true,
          sortType: null,
          filterValue: "",
          width: "20%",
        },
        {
          text: this.$t('clients.birthday'),
          value: "birthday",
          filterable: true,
          sortType: null,
          filterValue: "",
          width: "10%",
        },
        {
          text: this.$t('clients.email'),
          value: "email",
          filterable: true,
          sortType: null,
          filterValue: "",
          width: "10%",
        },
        {
          text: this.$t('clients.phone'),
          value: "phone",
          filterable: true,
          sortType: null,
          filterValue: "",
          width: "10%",
        },
        {
          text: this.$t('clients.address'),
          value: "address",
          filterable: true,
          sortType: null,
          filterValue: "",
          width: "15%",
        },
        {
          text: this.$t('clients.status'),
          value: "status",
          width: "1%",
        },
        {
          text: "Tags",
          value: "taggable",
          filterable: true,
          sortType: null,
          filterValue: "",
          width: "15%",
        },
        {
          text: this.$t('clients.groups'),
          value: "groupable",
          filterable: true,
          sortType: null,
          filterValue: "",
          width: "15%",
        },
        {
          text: this.$t('global.created_at'),
          value: "created_at",
          filterable: true,
          sortType: null,
          filterValue: "",
          width: "5%",
        },
        {
          text: this.$t('global.updated_at'),
          value: "updated_at",
          filterable: true,
          sortType: null,
          filterValue: "",
          width: "5%",
        },
        {
          text: "Action",
          value: "action",
        },
      ],
      statistics:{},
      data: [],
      drawer: false,
      isDescending: true,
      sortData: [],
      url: ''
    };
  },
  mounted() {
    this.initialize();
  },
  computed: {
    formattedStatistics() {
      return [
        {
          title: this.$t('coaches.totalCoaches'),
          value: this.statistics.totalCoach,
          type: 'number'
        },
        {
          title: this.$t('coaches.totalActive'),
          value: this.statistics.totalActiveCoach,
          type: 'number'
        },
        {
          title: this.$t('coaches.totalInactive'),
          value: this.statistics.totalInactive,
          type: 'number'
        },
        {
          title: this.$t('coaches.totalWithClient'),
          value: this.statistics.totalWithClient,
          type: 'number'
        },
        {
          title: this.$t('coaches.totalWithoutClient'),
          value: this.statistics.totalWithOutClient,
          type: 'number'
        },
        {
          title: this.$t('coaches.totalActive'),
          value: this.statistics.totalActiveCoach,
          type: 'number'
        },
      ]
    }
  },
  methods: {
    initialize() {
      this.getStatistics();
      this.getTableRecords()
    },
    getTableRecords() {
      this.$axios
        .get(`${this.$coaches}?${this.urlQuery()}&relations=taggable,groupable,country,city,zipcode`)
        .then(({ data }) => {
          this.data = data.data;
          this.options = data.options;
          this.url = `${this.$coaches}?${this.urlQuery()}&relations=taggable,groupable,country,city,zipcode`
        });
    },
    addRecord() {
      this.goTo("settings-coaches-create");
    },
    changeStatus(payload) {
      this.$axios
        .put(`${this.$coaches}/${payload.id}/status`, payload)
        .then(({ data }) => {
          this.successNotification(
            payload,
            "updated",
            "coach",
            "coaches",
            "first_name"
          );
          this.initialize();
        });
    },
    showRecord(item){
      this.goTo("settings-coaches-id-profile", { id: item.id });
    },
  
    deleteRecord(items) {
      this.delete().then(() => {
        let ids = this.getIds(items);
        this.$axios.delete(`${this.$coaches}/${ids}`).then(({ data }) => {
          this.successNotification(
            items,
            "deleted",
            "coach",
            "coaches",
            "first_name"
          );
          this.initialize();
        });
      });
    },
    deleteTaggable(item) {
      this.delete().then(() => {
        this.$axios
          .delete(
            `${this.$coaches}/${item.pivot.taggable_id}/taggable/${item.pivot.tag_id}`,
            item
          )
          .then(({ data }) => {
            this.successNotification(
              item,
              "deleted",
              "coach",
              "coaches",
              "name"
            );
            this.initialize();
          });
      });
    },
    deleteGroupable(item) {
      this.delete().then(() => {
        this.$axios
          .delete(
            `${this.$coaches}/${item.pivot.groupable_id}/groupable/${item.pivot.group_id}`,
            item
          )
          .then(({ data }) => {
            this.successNotification(
              item,
              "deleted",
              "coach",
              "coaches",
              "name"
            );
            this.initialize();
          });
      });
    },
    getStatistics() {
      this.$axios.get(`${this.$coaches}/statistic`)
      .then(({ data }) => {
        this.statistics = data
      });
    },
  },
};
</script>
