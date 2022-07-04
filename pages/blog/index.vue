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
      @addRecord="addRecord"
      @deleteRecord="deleteRecord($event)"
      @reloadtable="initialize()"
      :currentUrl="url"
      @FilterBy="filterBy($event)"
      @updatePagenum="updatePagenum($event)"
      @searchRecords="searchRecords($event)"
      @editRecord="editRecord($event)"
    >
      <template v-slot:coach_id="{ item }">
        {{item.coach.full_name}}
      </template>
      <template v-slot:category="{ item }">
        {{item.category.name}}
      </template>
      <template v-slot:summary="{ item }">
        <div class="ellipse five-lines">
        {{item.summary}}
        </div>
      </template>
      <template v-slot:image="{ item }">
        <div class="profile-box" >
          <div class="ma-2">
            <v-img  class="headerimage" height="100px" width="200px" :src="item.image"></v-img>
          </div>
        </div>
      </template>
      <template v-slot:content="{ item }">
        <div class="blog-main_content ellipse three-lines" v-html="item.content"></div>
      </template>
      <template v-slot:published_date="{ item }">
        {{ formatDate(item.created_at) }}
      </template>
    </data-table>
  </v-container>
</template>
<script>
import dataTable from "~/components/ui/dataTable.vue";
import tableHelper from "~/mixins/tableHelper.vue";
import dateHelper from "~/mixins/dateHelper.vue";
import formBlog from "~/components/blog/form.vue";
import statisticsComponent from "@/components/common/statisticComponent.vue";
export default {
  components: { dataTable, formBlog, statisticsComponent },
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
          text: "Author",
          value: "coach_id",
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
          text: "Preview",
          value: "preview",
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
          text: "Category",
          value: "category",
          filterable: true,
          sortType: null,
          filterValue: "",
        },
        {
          text: "Published Date",
          value: "published_date",
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
      statistics:{},
      url: ''
    };
  },
    computed: {
    formattedStatistics() {
      return [
        {
          title:'Total Blogs',
          value: this.statistics.totalBlog,
          type: 'number'
        },
        {
          title:'Total Training',
          value: this.statistics.totalTraining,
          type: 'number'
        },
        {
          title:'Total Lifestyle',
          value: this.statistics.totalLifestyle,
          type: 'number'
        },
        {
          title:'Total Nutrition',
          value: this.statistics.totalNutrition,
          type: 'number'
        },
        {
          title:'Total Favorite',
          value: this.statistics.totalFavorite,
          type: 'number'
        },
      ]
    }
  },
  mounted() {
    this.initialize();
    this.getStatistics();
  },
  methods: {
    initialize() {
      this.$axios.get(`${this.$blogs}?${this.urlQuery()}&relations=coach,category`).then(({data}) => {
        this.data = data.data
        this.options = data.options
        this.url = `${this.$blogs}?${this.urlQuery()}`
      })
    },
    addRecord() {
      this.goTo("blog-form");
    },
    deleteRecord(items) {
      this.delete().then(() => {
        let ids = this.getIds(items)
        this.$axios.delete(`${this.$blogs}/${ids}`).then(({data}) => {
          this.successNotification(items, 'deleted', 'blog', 'blogs', 'title')
          this.initialize()
        })
      });
    },
    editRecord(item) {
      this.goTo("blog-edit-id", { id: item.id });
    },

    
    updateRecord(payload) {
      this.update().then(() => {
        this.$axios.put(`${this.$blogs}/${payload.id}`, payload).then(({data}) => {
          this.successNotification(data, 'updated', 'blog', 'blogs', 'title')
          this.initialize()
        })
      })
    },
    getStatistics() {
      this.$axios.get(`${this.$blogs}/statistic`)
      .then(({ data }) => {
        this.statistics = data
      });
    },
    showRecord(item) {
      this.goTo("settings-coaches-id-profile", { id: item.id });
    },
  },
};
</script>
