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
      :currentUrl="url"
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
          text: this.$t('blogs.title'),
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
          text: this.$t('blogs.summary'),
          value: "summary",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: this.$t('blogs.keywords'),
          value: "keyword",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: this.$t('blogs.showRightColumn'),
          value: "show_right_column",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: this.$t('blogs.showToRegisteredUsers'),
          value: "show_to_registered_users",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: this.$t('blogs.optionalUrl'),
          value: "optional_url",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: this.$t('blogs.content'),
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
          text: this.$t('blogs.blogType'),
          value: "blog_type",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: this.$t('blogs.category'),
          value: "category",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: this.$t('global.created_at'),
          value: "created_at",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: this.$t('global.updated_at'),
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
      url: ''
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
        this.url = `${this.$blogs}?${this.urlQuery()}`
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
  },
};
</script>
