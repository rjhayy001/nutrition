<template>
  <v-container>
    <form-drawer :drawerStatus="drawer" @closeDrawer="drawer = !drawer"
      @addRecord="addRecord($event)"
      @updateRecord="updateRecord($event)"
      :selectedItem="selectedItem"
    >
    </form-drawer>
    <data-table
      :options="options"
      :title="title"
      :headers="headers"
      :data="data"
      searchPlaceholder="Short name, Long name, Code"
      class="custom-table"
      @addRecord="drawer = !drawer"
      @deleteRecord="deleteRecord($event)"
      @reloadtable="initialize()"
      @FilterBy="filterBy($event)"
      @updatePagenum="updatePagenum($event)"
      @searchRecords="searchRecords($event)"
      @editRecord="editRecord($event)"
    >
      <template v-slot:status="{item}">
        <v-switch
          v-model="item.status"
          inset
          color="success"
          dense
          hide-details=""
          @change="updateDefaultValue(item)"
        ></v-switch>
      </template>
       <template v-slot:prices="{item}">
         <template v-if="item.prices.length">
          <template v-for="(price, index) of item.prices" >
            <v-chip small outlined label class="mr-1 mb-1" color="primary" :key="`${index}-price`">
              {{priceTitle(price)}}
            </v-chip>
          </template>
         </template>
         <template v-else>
          ...
         </template>
        <!-- {{formatDate(item.created_at)}} -->
      </template>
      <template v-slot:created_at="{item}">
        {{formatDate(item.created_at)}}
      </template>
      <template v-slot:updated_at="{item}">
        {{formatDate(item.updated_at)}}
      </template>
    </data-table>
  </v-container>
</template>
<script>
import dataTable from "~/components/ui/dataTable.vue";
import tableHelper from "~/mixins/tableHelper.vue";
import dateHelper from "~/mixins/dateHelper.vue";
import formDrawer from "~/components/plan/form.vue";
export default {
  components: { dataTable, formDrawer},
  mixins:[tableHelper, dateHelper],
  data() {
    return {
      options: {},
      title: "Plans",
      headers: [
        { text: "#", value: "id", width:'2%'},
        { text: "Name", value: "name"},
        { text: "Description", value: "description" },
        { text: "Price", value: "prices" },
        { text: "Active", value: "status" },
        { text: "Created at", value: "created_at"},
        { text: "Updated at", value: "updated_at"},
        { text: "Action", value: "action"},
      ],
      data: [],
      drawer:false,
      selectedItem:{}
    };
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.$axios.get(`${this.$plans}?${this.urlQuery()}&relations=prices`).then(({data}) => {
        this.data = data.data
        this.options = data.options
      })
    },
    addRecord(payload) {
      this.create().then(() => {
        this.$axios.post(`${this.$plans}`, payload).then(({data}) => {
          this.successNotification(data, 'added', 'country', 'plans', 'name')
          this.initialize()
        })
      })
    },
    deleteRecord(items) {
      this.delete().then(() => {
        let ids = this.getIds(items)
        this.$axios.delete(`${this.$plans}/${ids}`).then(({data}) => {
          this.successNotification(items, 'deleted', 'country', 'plans', 'name')
          this.initialize()
        })
      })
    },
    updateDefaultValue(item) {
      let payload = {is_default:item.is_default}
      this.$axios.put(`${this.$plans}/${item.id}/default`, payload).then(({data}) => {
        this.successNotification(item, 'set as default', 'country', 'plans', 'name')
      })
    },
    editRecord(item) {
      this.drawer = !this.drawer
      this.selectedItem = this.cloneVariable(item)
    },
    updateRecord(payload) {
      this.update().then(() => {
        this.$axios.put(`${this.$plans}/${payload.id}`, payload).then(({data}) => {
          this.successNotification(data, 'updated', 'country', 'plans', 'name')
          this.initialize()
        })
      })
    },
    priceTitle(price) {
      console.log(price, 'price')
      let newPrice = this.showPrice(price.price)
      let suffix = '';

      if (price.is_recurring) suffix += 'every '
      if (price.billing_period == 1) suffix += 'day'
      if (price.billing_period == 2) suffix += 'week'
      if (price.billing_period == 3) suffix += 'month'
      if (price.billing_period == 4) suffix += '3 months'
      if (price.billing_period == 5) suffix += '6 months'
      if (price.billing_period == 6) suffix += 'year'

      return `${newPrice} / ${suffix}`
    }
  },
};
</script>
