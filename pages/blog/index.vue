<template>
  <v-container fluid>
    <data-table
      :options="options"
      :title="title"
      :headers="headers"
      :data="data"
      :sort-desc.sync="isDescending"
      class="custom-table"
      @addRecord="addRecord"
      @sortTable="sortTable"
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
import formBlog from "~/components/blogs/form.vue";
export default {
  components: { dataTable, formBlog },
  mixins: [tableHelper, dateHelper],
  data() {
    return {
      options: {},
      title: "Blogs",
      headers: [
        {
          text: "#",
          value: "id",
          width: "2%",
        },
        {
          text: "Title",
          value: "title",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: "Slug",
          value: "slug",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: "Summary",
          value: "summary",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: "Keywords",
          value: "keyword",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: "Show right column",
          value: "show_right_column",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: "Show to registered users",
          value: "show_to_registered_users",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: "Optional Url",
          value: "optional_url",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: "Content",
          value: "content",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: "Image",
          value: "image",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: "Blog type",
          value: "blog_type",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: "Category",
          value: "category",
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

      this.$axios.get(`${this.$blogs}?${this.urlQuery()}`).then(({data}) => {
        this.data = data.data
        this.options = data.options
      })
    },
    addRecord(payload) {
      this.goTo("blog-create");
    },
    deleteRecord(items) {
      this.delete().then(() => {
        let ids = this.getIds(items)
        this.$axios.delete(`${this.$blogs}/${ids}`).then(({data}) => {
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
        this.$axios.put(`${this.$blogs}/${payload.id}`, payload).then(({data}) => {
          this.successNotification(data, 'updated', 'country', 'countries', 'short_name')
          this.initalize()
        })
      })
    },
    sortTable(query) {
      let sortBy = null;
      if(query.sortType){
        sortBy = `${query.value},${query.sortType == 1 ? 'asc' : 'desc'}`
        this.$axios
        .get(`${this.$blogs}?${this.urlQuery()}&sort=${sortBy}`)
        .then(({ data }) => {
          this.data = data.data;     
          this.options = data.options;
        });
      }
      else{
        this.initalize();
      } 
    },
  },
};
</script>
