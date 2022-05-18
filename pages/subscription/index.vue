<template>
  <v-container>
    <subscription-form :drawerStatus="drawer" @closeDrawer="drawer = !drawer" @addRecord="addRecord($event)"
      @updateRecord="updateRecord($event)" :selectedItem="selectedItem" />

    <data-table :options="options" :title="title" :headers="headers" :data="data" class="custom-table"
      @addRecord="addRecord" @deleteRecord="deleteRecord($event)" @reloadtable="initalize()"
      @FilterBy="filterBy($event)" @updatePagenum="updatePagenum($event)">

      <template v-slot:status="{ item }">
        <v-switch inset color="success" dense hide-details="auto" v-model="item.status"></v-switch>
      </template>

      <template v-slot:client="{ item }">
        <v-chip color="primary" @click="$router.push('/client')">
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

    </data-table>
  </v-container>
</template>
<script>
import dataTable from "~/components/ui/dataTable.vue";
import tableHelper from "~/mixins/tableHelper.vue";
import subscriptionForm from "~/components/subscription/form.vue"
import priceHelperVue from '../../mixins/priceHelper.vue';
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
          width: '2%',
        },
        {
          text: "Client",
          value: "client",
          filterable: true,
          sortType: null,
          filterValue: ''
        },
        {
          text: "Abonnement",
          value: "price",
          filterable: true,
          sortType: null,
          filterValue: ''
        },
        {
          text: "Status",
          value: "status",
          filterable: true,
          sortType: null,
          filterValue: '',
        },
        {
          text: "Début",
          value: "start_date",
          filterable: true,
          sortType: null,
          filterValue: '',
        },
        {
          text: "Fin",
          value: "end_date",
          filterable: true,
          sortType: null,
          filterValue: '',
        },
        {
          text: "Action",
          value: "action"
        },
      ],
      data: [],
      drawer: false,
      selectedItem: {},
    };
  },
  mounted() {
    this.initalize()
  },
  methods: {
    initalize() {
      this.$axios.get(`${this.$subscriptions}?${this.urlQuery()}&relations=price.plan,client`).then(({ data }) => {
        this.data = data.data
        this.options = data.options
      })
    },
    addRecord() {
      this.drawer = true
      // this.goTo('subscriptions-create')
      // this.$root.dialog(
      //   "Confirm Message!",
      //   "Are you sure you want to add this record ?",
      //   "c"
      // )
      //   .then(() => {});
    },
    deleteRecord(items) {
      this.$root.dialog(
        "Confirm Action!",
        `Are you sure you want to delete ${items.length == 1 ? 'this record' : 'these records'} ?`,
        "delete"
      ).then(() => {
        let ids = this.getIds(items)
        this.$axios.delete(`${this.$subscriptions}/${ids}`).then(({ data }) => {
          this.successNotification(items, 'deleted', 'client', 'clients')
          this.initalize()
        }).catch((error) => {
          this.errorNotification(error)
        })
      })
    },
  },
};
</script>
