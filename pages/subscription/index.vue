<template>
  <v-container>
    <subscription-form
      :drawerStatus="drawer"
      @addRecord="addSubscription($event)"
      @closeDrawer="drawer = false"
      :reload="reload"
      @reloadFalse="reload = false"
    />
    <v-dialog v-model="dialog" max-width="500px" style="z-index=100">
      <v-card>
        <v-card-title class="font-weight-light">
          Alert subscription
        </v-card-title>
        <v-card-text>
          <div class="my-5">
            <p class="font-weight-light" style="color:#000;font-size: 17px;">
              This client has a subscription.
            </p>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            color="red"
            text
            @click="close"
          >
            Close
          </v-btn>
          <!-- <v-btn
            color="green"
            text
            @click="confirmSubscribe()"
          >
            Yes
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>

      <!-- :hide="['add']" -->
    <data-table
      :options="options"
      :currentUrl="url"
      :title="title"
      :headers="headers"
      :data="data"
      :sort-desc.sync="isDescending"
      class="custom-table"
      @addRecord="drawer = true"
      @deleteRecord="deleteRecord($event)"
      @reloadtable="initialize()"
      @FilterBy="filterBy($event)"
      @updatePagenum="updatePagenum($event)"
    >


      <template v-slot:status="{ item }">
        <v-chip outlined label :color="statuses[item.status].color" v-if="statuses[item.status]">
          <v-icon left>mdi-{{ statuses[item.status].icon }}</v-icon>
          {{ statuses[item.status].label }}
        </v-chip>
      </template>

      <template v-slot:client="{ item }">
        <v-chip color="primary" @click="$router.push({ path: `/client/${item.client.id}/coaching/global` })">
          <v-avatar left size="md">
            <v-img :src="item.client.logo" v-if="item.client.logo != null"></v-img>
            <v-icon v-else>mdi-account-circle</v-icon>
          </v-avatar>
          {{ item.client.full_name }}
        </v-chip>
      </template>

      <template v-slot:coach="{ item }">
        <v-chip color="primary" @click="$router.push({ path: `/settings/coaches/${item.coach.id}/profile` })">
          <v-avatar left size="md">
            <v-img :src="item.coach.logo" v-if="item.coach.logo != null"></v-img>
            <v-icon v-else>mdi-account-circle</v-icon>
          </v-avatar>
          {{ item.coach.full_name }}
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
          <v-tooltip  left v-if="item.plan_id == 1 && item.status == 1">
            <template v-slot:activator="{ on }">
              <v-btn icon color="green" small @click.stop="updatePlan(item)" v-on="on">
                <v-icon>mdi-arrow-up-bold-circle-outline</v-icon>
              </v-btn>
            </template>
            <span>Upgrade</span>
          </v-tooltip>
        </div>
      </template>

    </data-table>
  </v-container>
</template>
<script>
import dataTable from "~/components/ui/dataTable.vue";
import tableHelper from "~/mixins/tableHelper.vue";
import subscriptionForm from "~/components/subscription/form.vue"
import priceHelperVue from '~/mixins/priceHelper.vue';
export default {
  name: "index",
  components: { dataTable, subscriptionForm },
  mixins: [tableHelper, priceHelperVue],
  data() {
    return {
      options: {},
      title: this.$t('global.subscription')+'s',
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
          text: this.$t('global.coach'),
          value: "coach",
          filterable: true,
          sortType: null,
          filterValue: ''
        },
        {
          text: this.$t('global.subscription'),
          value: "price",
          filterable: true,
          sortType: null,
          filterValue: ''
        },
        {
          text: this.$t('global.status'),
          value: "status",
          filterable: true,
          sortable: true,
          sortType: null,
          filterValue: '',
        },
        {
          text: this.$t('global.start'),
          value: "start_date",
          filterable: true,
          sortType: null,
          filterValue: '',
        },
        {
          text: this.$t('global.end'),
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
      dialog: false,
      selectedItem: {},
      isDescending: true,
      reload: false,
      datapayload: [],
      url: '',
      statuses: [
        {
          label: this.$t('subscription.cancelled'),
          icon: "close-circle-outline",
          color: "error"
        },
        {
          label: this.$t('subscription.inProgress'),
          icon: "check-circle-outline",
          color: "primary"
        },
        {
          label: this.$t('subscription.pendingCancellation'),
          icon: "timer-sand",
          color: "warning"
        },
        {
          label: this.$t('subscription.incomplete'),
          icon: "timer-sand",
          color: "warning"
        },
        {
          label: this.$t('subscription.incompleteCancelled'),
          icon: "close-circle-outline",
          color: "error"
        },
        {
          label: this.$t('subscription.onTrial'),
          icon: "timer-sand",
          color: "info"
        },
        {
          label: this.$t('subscription.unpaid'),
          icon: 'close-circle-outline',
          color: 'error'
        },
      ]
  };
},
mounted() {
  this.initialize()
},
methods: {
  initialize() {
    this.$axios.get(`${this.$subscriptions}?${this.urlQuery()}&relations=price.plan,client,coach`).then(({ data }) => {
      this.data = data.data
      this.options = data.options
      this.url = `${this.$subscriptions}?${this.urlQuery()}&relations=price.plan,client,coach`
    })
  },
  
  addSubscription(payload) {
    this.$axios.post(`${this.$subscriptions}`, payload).then(({ data }) => {
      if(data=='client_exist'){
        this.dialog=true
      }else{
        this.drawer=false
        this.successNotification(payload,"create","subscription","subscriptions","full_name");
        this.initialize()
      }
    });
  },
  close() {
    this.dialog = false
    this.drawer=true
  },
  updatePlan(payload) {
    console.log(payload,"update")
      this.$axios
        .put(`${this.$subscriptions}/${payload.id}/updatePlan`, payload)
        .then(({ data }) => {
          this.upgradeSubscription(payload)
        });
  },

  upgradeSubscription(payload) {
    console.log(payload,"upgrade")
    let data = {
      client_id : payload.client_id,
      plan_id : 2,
      price_id : payload.price_id,
      coach_id : payload.coach_id,
    }
    console.log(payload,"create subs")
    this.$axios.post(`${this.$subscriptions}/upgradePlan`, data).then(({ data }) => {
      this.successNotification(payload.client,"create","subscription","subscriptions","full_name");
      this.initialize()
    });
  },
  deleteRecord(items) {
    this.$root.dialog(
      "Annuler un abonnement",
      `Êtes-vous sûr de vouloir annuler cet abonnement ?`,
      "annuler"
    ).then(() => {
      let ids = items.id
      this.$axios.delete(`${this.$subscriptions}/${ids}`).then(({ data }) => {
        this.reload=true
        this.successNotification(items.client, 'annulé', 'abonnement', 'abonnements', 'full_name')
        this.initialize()
      }).catch((error) => {
        this.errorNotification(error)
      })
    })
  },
  restoreRecord(item) {
    this.$root.dialog(
      "Restaurer un abonnement ?",
      `Êtes-vous sûr de vouloir restaurer cet enregistrement ?`,
      "restaurer"
    ).then(() => {
      this.$axios.patch(`${this.$subscriptions}/${item.id}/restore`).then(({ data }) => {
        this.reload=true
        this.successNotification(item.client, 'réstauré', 'abonnement', 'abonnements', 'full_name')
        console.log(item.client,"itemsssss")
        this.initialize()
      }).catch((error) => {
        this.errorNotification(error)
      })
    })
  },
},
};
</script>
