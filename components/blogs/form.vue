<template>
  <v-container fluid>
    <v-col class="text-right">
      <v-btn color="green" class="white--text"> Blogs </v-btn>
    </v-col>
    <v-col class="text-center"><span class="font-weight-medium"> Choose a Blog format </span></v-col>
    <v-container grid-list-md fluid>
    <v-row >
      <v-hover v-slot="{ hover }">
        <v-col max-width="500">
          <v-card class="pa-10 text-center" exact tile :elevation="hover ? 12 : 2" @click="create_article">
            <v-icon large color="green darken-2 pa-2"> mdi-file-document </v-icon>
              <p class="font-weight-medium pa-2"> Article </p>
              <p class="font-weight-light pa-2"> An article with images and embed videos </p>
          </v-card>
        </v-col>
      </v-hover>
      <v-hover v-slot="{ hover }">
        <v-col max-width="500">
          <v-card class="pa-10 text-center" exact tile :elevation="hover ? 12 : 2">
            <v-icon large color="green darken-2 pa-2"> mdi-sort-ascending </v-icon>
              <p class="font-weight-medium pa-2"> Sorted list </p>
              <p class="font-weight-light pa-2"> An article with images and embed videos </p>
          </v-card>
        </v-col>
      </v-hover>
      <v-hover v-slot="{ hover }">
        <v-col max-width="500">
          <v-card class="pa-10 text-center" exact tile :elevation="hover ? 12 : 2">
            <v-icon large color="green darken-2 pa-2"> mdi-format-list-checkbox </v-icon>
              <p class="font-weight-medium pa-2"> Trivia Quiz </p>
              <p class="font-weight-light pa-2"> An article with images and embed videos </p>
          </v-card>
        </v-col>
      </v-hover>
    </v-row>
    </v-container>
  </v-container>
</template>
<script>
import dataTable from "~/components/ui/dataTable.vue";
import tableHelper from "~/mixins/tableHelper.vue";
export default {
  components: { dataTable },
  mixins:[tableHelper],
  data() {
    return {
      drawer:false,
      options: {},
      title: "Blogs",
      headers: [
        {
          text: "#",
          value: "id",
          width:'2%',
        },
        {
          text: "First name",
          value: "first_name",
          filterable:true,
          sortType:null,
          filterValue:''
        },
        {
          text: "Last name",
          value: "last_name",
          filterable:true,
          sortType:null,
          filterValue:''
        },
        {
          text: "Email",
          value: "email",
          filterable:true,
          sortType:null,
          filterValue:'',
        },
        {
          text: "Status",
          value: "status",
        },
        {
          text: "Phone 1",
          value: "phone_1",
          filterable:true,
          sortType:null,
          filterValue:''
        },
        {
          text: "Phone 2",
          value: "phone_1",
          filterable:true,
          sortType:null,
          filterValue:''
        },
        {
          text: "Action",
          value: "action"
        },
      ],
      data: [],
      drawer1:false
    };
  },
  mounted() {
    this.initalize()
  },
  methods: {
    initalize() {
      this.$axios.get(`clients?${this.urlQuery()}`).then(({data}) => {
        this.data = data.data
        this.options = data.options
      })
    },
    create_article() {
      this.goTo('blog-article_form')

    },
    deleteRecord(items) {
      this.$root.dialog(
        "Confirm Action!",
        `Are you sure you want to delete ${items.length == 1 ? 'this record' : 'these records'} ?`,
        "delete"
      ).then(() => {
        let ids = this.getIds(items)
        this.$axios.delete(`client/${ids}`).then(({data}) => {
          this.successNotification(items, 'deleted', 'client', 'clients')
          this.initalize()
        })
      });
    },
  },
};
</script>
