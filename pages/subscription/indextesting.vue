<template>
  <v-container>
    <subscription-form :drawerStatus="drawer" @closeDrawer="drawer = !drawer" @addRecord="addRecord($event)"
      :selectedItem="selectedItem" />

    <data-table :options="options" :title="title" :headers="headers" :data="data" class="custom-table"
      @addRecord="addRecord" @deleteRecord="deleteRecord($event)" @sortTable="sortTable" @reloadtable="initalize()"
      @FilterBy="filterBy($event)" @updatePagenum="updatePagenum($event)">



      <!-- <template v-slot:status="{ item }">
        <v-chip outlined label :color="statuses[item.status].color" v-if="statuses[item.status]">
          <v-icon left>mdi-{{ statuses[item.status].icon }}</v-icon>
          {{ statuses[item.status].label }}
        </v-chip>
      </template>

      <template v-slot:client="{ item }">
        <v-chip color="primary" @click="$router.push({ path: `/client/${item.id}/profile` })">
          <v-avatar left size="md">
            <v-img :src="item.client.logo" v-if="item.client.logo != null"></v-img>
            <v-icon v-else>mdi-account-circle</v-icon>
          </v-avatar>
          {{ item.client.full_name }}
        </v-chip>
      </template>

      <template v-slot:price="{ item }">
        <v-chip color="primary" @click="$router.push('/settings/plans')" v-if="item.price">
          <v-avatar left size="md">
            <v-img :src="item.price.plan.photo" v-if="item.price.plan.photo"></v-img>
            <v-icon v-else>mdi-card-account-details-star</v-icon>
          </v-avatar>
          <span>{{ item.price.plan.name }}</span>
          <span class="text-caption ml-2">({{ item.price | computePlanPrice }})</span>
        </v-chip>

      </template>

      <template v-slot:action="{ item }">
        <div>
          <v-tooltip v-if="item.status == 1" left>
            <template v-slot:activator="{ on }">
              <v-btn icon color="error" small @click="deleteRecord(item)" v-on="on">
                <v-icon>mdi-clock-remove-outline</v-icon>
              </v-btn>
            </template>
            <span>Annuler</span>
          </v-tooltip>

          <v-tooltip v-else left>
            <template v-slot:activator="{ on }">
              <v-btn icon color="secondary" small @click="restoreRecord(item)" v-on="on">
                <v-icon>mdi-delete-restore</v-icon>
              </v-btn>
            </template>
            <span>Restaurer</span>
          </v-tooltip>
        </div>
      </template> -->

    </data-table>
  </v-container>
</template>
<script>
import dataTable from "~/components/ui/dataTable.vue";
import tableHelper from "~/mixins/tableHelper.vue";
import subscriptionForm from "~/components/subscription/form.vue"
import priceHelperVue from '~/mixins/priceHelper.vue';
export default {
  components: { dataTable, subscriptionForm },
  mixins: [tableHelper, priceHelperVue],
  data() {
    return {
      options: {},
      title: "Subscriptions",
      headers: [
        {
          text: "#",
          value: "id",
          width: "1%",
        },
        {
          text: "Full Name",
          value: "full_name",
          filterable: true,
          sortType: null,
          filterValue: "",
          width: "20%",
        },
        {
          text: "Birthday",
          value: "birthday",
          filterable: true,
          sortType: null,
          filterValue: "",
          width: "10%",
        },
        {
          text: "Email",
          value: "email",
          filterable: true,
          sortType: null,
          filterValue: "",
          width: "10%",
        },
        {
          text: "Phone",
          value: "phone",
          filterable: true,
          sortType: null,
          filterValue: "",
          width: "10%",
        },
        {
          text: "Address",
          value: "address",
          filterable: true,
          sortType: null,
          filterValue: "",
          width: "15%",
        },
        {
          text: "Status",
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
          text: "Groups",
          value: "groupable",
          filterable: true,
          sortType: null,
          filterValue: "",
          width: "15%",
        },
        {
          text: "Created at",
          value: "created_at",
          filterable: true,
          sortType: null,
          filterValue: "",
          width: "5%",
        },
        {
          text: "Updated at",
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
      // headers: [
      //   {
      //     text: "#",
      //     value: "id",
      //     width: '2%',
      //   },
      //   {
      //     text: "Client",
      //     value: "client",
      //     filterable: true,
      //     sortType: null,
      //     filterValue: ''
      //   },
      //   {
      //     text: "Abonnement",
      //     value: "price",
      //     filterable: true,
      //     sortType: null,
      //     filterValue: ''
      //   },
      //   {
      //     text: "Status",
      //     value: "status",
      //     filterable: true,
      //     sortable: true,
      //     sortType: null,
      //     filterValue: '',
      //   },
      //   {
      //     text: "D??but",
      //     value: "start_date",
      //     filterable: true,
      //     sortType: null,
      //     filterValue: '',
      //   },
      //   {
      //     text: "Fin",
      //     value: "end_date",
      //     filterable: true,
      //     sortType: null,
      //     filterValue: '',
      //   },
      //   {
      //     text: "Action",
      //     value: "action"
      //   },
      // ],
      data: [],
      drawer: false,
      selectedItem: {},
      statuses: [
        {
          label: "Annul??",
          icon: "close-circle-outline",
          color: "error"
        },
        {
          label: "En cours",
          icon: "check-circle-outline",
          color: "primary"
        },
        {
          label: "En attente d'annulation",
          icon: "timer-sand",
          color: "warning"
        },
        {
          label: "Incomplet",
          icon: "timer-sand",
          color: "warning"
        },
        {
          label: "Incomplet annul??",
          icon: "close-circle-outline",
          color: "error"
        },
        {
          label: "En essai",
          icon: "timer-sand",
          color: "info"
        },
        {
          label: 'Impay??',
          icon: 'close-circle-outline',
          color: 'error'
        },
      ]
  };
},
mounted() {
  this.initalize()
},
methods: {
  initalize() {
    this.getTableRecords();
  },
  getTableRecords() {
      this.$axios
        .get(`${this.$coaches}?${this.urlQuery()}&relations=taggable,groupable,country,city,zipcode`)
        .then(({ data }) => {
          this.data = data.data;
          this.options = data.options;
          console.log(data, 'query fdaoajf')
        });
    },
  // initalize(sortBy) {
  //   this.data = []
  //   this.$axios.get(`${this.$subscriptions}?${this.urlQuery()}&relations=price.plan,client&sort=${sortBy??null}`).then(({ data }) => {
  //     this.data = data.data
  //     console.log(this.data,"data sssssssssss")
  //     this.options = data.options
  //   })
  // },
  addRecord() {
    this.drawer = true
  },
  deleteRecord(items) {
    this.$root.dialog(
      "Annuler un abonnement",
      `??tes-vous s??r de vouloir annuler cet abonnement ?`,
      "annuler"
    ).then(() => {
      let ids = items.id
      this.$axios.delete(`${this.$subscriptions}/${ids}`).then(({ data }) => {
        this.successNotification(items, 'annul??', 'abonnement', 'abonnements')
        this.initalize()
      }).catch((error) => {
        this.errorNotification(error)
      })
    })
  },
  restoreRecord(item) {
    this.$root.dialog(
      "Restaurer un abonnement ?",
      `??tes-vous s??r de vouloir restaurer cet enregistrement ?`,
      "restaurer"
    ).then(() => {
      this.$axios.patch(`${this.$subscriptions}/${item.id}/restore`).then(({ data }) => {
        this.successNotification(item, 'r??staur??', 'abonnement', 'abonnements')
        this.initalize()
      }).catch((error) => {
        this.errorNotification(error)
      })
    })
  },
  sortTable(query) {
    let sortBy = null;
    if(query.sortType){
      sortBy = `${query.value},${query.sortType == 1 ? 'asc' : 'desc'}`
      // this.$axios
      // .get(`${this.$subscriptions}?${this.urlQuery()}&relations=price.plan,client&sort=${sortBy}`)
      // .then(({ data }) => {
      //   this.data = data.data;     
      //   this.options = data.options;
      // });
    }
    else{
      } 
      this.initalize(sortBy);
  }
},
};
</script>
