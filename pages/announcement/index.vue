<template>
  <v-container>
    <statistics-component
      :statistics="formattedStatistics"
      :title="title"
    />
    <view-item
      :viewStatus="view" 
      :dataItem="dataItem"
      :title="AnnounceTitle"
      @closeDrawer="view = !view"
    />
    <form-drawer 
      :drawerStatus="drawer" 
      :selectedItem="selectedItem"
      @closeDrawer="drawer = !drawer"
      @addRecord="addRecord($event)"
      @saveRecord="saveRecord($event)"
      @updateRecord="updateRecord($event)"
    ></form-drawer>
    <data-table
      :options="options"
      :title="title"
      :headers="headers"
      :data="data"
      searchPlaceholder="Title"
      class="custom-table"
      @addRecord="drawer = !drawer"
      @showRecord="showRecord($event)"
      @deleteRecord="deleteRecord($event)"
      @reloadtable="initialize()"
      @FilterBy="filterBy($event)"
      @updatePagenum="updatePagenum($event)"
      @searchRecords="searchRecords($event)"
      @editRecord="editRecord($event)"
    >
      <template v-slot:status="{item}">
        <template v-if="item.type == 1">
          <v-switch
            @click.stop="changeStatus(item)"
            v-model="item.status"
            inset
            color="success"
            dense
            hide-details=""
          ></v-switch>
        </template>
        <template v-else>
          <v-switch
            v-if="item.type==1"
            @click="changeStatus(item)"
            v-model="item.status"
            inset
            color="success"
            dense
            hide-details=""
          ></v-switch>
          <template v-else>
            Not Available
          </template>
        </template>
      </template>
      <template v-slot:message="{ item }">
        <div class="announce-message">
          {{item.message}}
        </div>
      </template>
      <template v-slot:is_sent="{ item }">
        <span>{{item.is_sent ? "sent" : "not sent"}}</span>
      </template>
      <template v-slot:send_to="{ item }">
        <span v-if="item.coaches.length!=0" @click.stop="coach(item)"><strong>{{item.coaches.length}}</strong> coaches</span>
        <span v-if="item.coaches.length!=0 && item.clients.length!=0">,</span>
        <span v-if="item.clients.length!=0" @click.stop="client(item)"><strong>{{item.clients.length}}</strong> clients</span>
      </template>
      <template v-slot:type="{item}">
        {{ item.type==0 ? "One Time Only" : "Recurring" }}
      </template>
      <template v-slot:schedule_period="{item}">
        <template v-if="item.type==0">...</template>
        <template v-else>
          {{ schedulePeriod(item) }}
        </template>
      </template>
      <template v-slot:cycle_count="{item}">
        <template v-if="item.type==0 || item.schedule_period!=7">...</template>
        <template v-else>
          {{ item.cycle_count }}
        </template>
      </template>
      <template v-slot:cycle_type="{item}">
        <template v-if="item.type==0 || item.schedule_period!=7">...</template>
        <template v-else>
          {{ cycleType(item) }}
        </template>
      </template>
      <template v-slot:time="{item}">
        <template v-if="item.type==1">...</template>
        <template v-else>
          {{ item.time }}
        </template>
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
import formDrawer from "~/components/announcement/form.vue";
import commonDialog from "@/components/common/commonDialog.vue";
import viewItem from "@/components/announcement/drawerView.vue";
import statisticsComponent from "@/components/common/statisticComponent.vue";
export default {
  components: { dataTable, formDrawer, commonDialog, viewItem, statisticsComponent},
  mixins:[tableHelper, dateHelper],
  data() {
    return {
      options: {},
      default_limit: 2,
      title: "Announcement",
      AnnounceTitle:'',
      headers: [
        { 
          text: "#", 
          value: "id", 
          width:'2%'
        },
        { 
          text: "title", 
          value: "title"
        },
        { 
          text: "Message", 
          value: "message" 
        },
        { 
          text: "Receiver", 
          value: "send_to" 
        },
        { 
          text: "Check", 
          value: "is_sent" 
        },
        { 
          text: "Type", 
          value: "type" 
        },
        { 
          text: "Time", 
          value: "time" 
        },
        { 
          text: "Date", 
          value: "date" 
        },
        { 
          text: "Status", 
          value: "status" 
        },
        { 
          text: "Schedule Period", 
          value: "schedule_period" 
        },
        { 
          text: "Cycle Count", 
          value: "cycle_count" 
        },
        { 
          text: "Cycle Type", 
          value: "cycle_type" 
        },
        { 
          text: "Created at", 
          value: "created_at" 
        },
        { 
          text: "Updated at", 
          value: "updated_at" 
        },
        { 
          text: "Action", 
          value: "action" 
        },
      ],
      periodOptions: [
        { id: 1, text: "Daily" },
        { id: 2, text: "Weekly" },
        { id: 3, text: "Monthly" },
        { id: 4, text: "Every 3 months" },
        { id: 5, text: "Every 6 months" },
        { id: 6, text: "Every Year" },
        { id: 7, text: "Custom" },
      ],
      cycleOptions: [
        { id: 1, text: "Daily" },
        { id: 2, text: "Weekly" },
        { id: 3, text: "Monthly" },
      ],
      data: [],
      receiver:[],
      drawer:false,
      view:false,
      selectedItem:{},
      dataItem:[],
      statistics:{},
    };
  },
  mounted() {
    this.initialize()
  },
  computed: {
    formattedStatistics() {
      return [
        {
          title:'Total Announce',
          value: this.statistics.totalAnnounce,
          type: 'number'
        },
        {
          title:'Total Sent',
          value: this.statistics.totalSent,
          type: 'number'
        },
        {
          title:'Total Once Save',
          value: this.statistics.totalSaveOnce,
          type: 'number'
        },
        {
          title:'Total Once Sent',
          value: this.statistics.totalOnceSent,
          type: 'number'
        },
        {
          title:'Total Recurring Save',
          value: this.statistics.totalSaveRecurring,
          type: 'number'
        },
        {
          title:'Total Recurring Sent',
          value: this.statistics.totalRecurringSent,
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
    getTableRecords(){
      this.$axios.get(`${this.$announces}?${this.urlQuery()}&relations=clients,coaches`).then(({data}) => {
        this.data = data.data
        this.options = data.options
        console.log(this.data,"data")
      })
    },
    addRecord(payload) {
      this.create().then(() => {
        this.$axios.post(`${this.$announces}`, payload).then(({data}) => {
          this.successNotification(payload, "sent","announce","announces","title")
          this.initialize()
        })
      })
    },
    saveRecord(payload) {
      this.create().then(() => {
        this.$axios.post(`${this.$announces}/save`, payload).then(({data}) => {
          this.successNotification(payload, "save","announce","announces","title")
          this.initialize()
        })
      })
    },
    deleteRecord(items) {
      this.delete().then(() => {
        let ids = this.getIds(items)
        this.$axios.delete(`${this.$announces}/${ids}`).then(({data}) => {
          this.successNotification(items, 'deleted', 'announce', 'announces', 'title')
          this.initialize()
        })
      });
    },
    editRecord(item) {
      this.drawer = !this.drawer
      this.selectedItem = this.cloneVariable(item)
    },
    updateRecord(payload) {
      this.update().then(() => {
        this.$axios.put(`${this.$announces}/${payload.id}`, payload).then(({data}) => {
          this.successNotification(data, 'updated', 'announce', 'announces', 'title')
          this.$store.commit('resetForm', true)
          this.initialize()
        });
      })
    },
    changeStatus(payload) {
      this.$axios
        .put(`${this.$announces}/${payload.id}/status`, payload)
        .then(({ data }) => {
          this.successNotification(
            payload,
            "updated",
            "announce",
            "announces",
            "title"
          );
          this.initialize();
        });
    },
    getStatistics() {
      this.$axios.get(`${this.$announces}/statistic`)
      .then(({ data }) => {
        this.statistics = data
      });
    },
    cycleType(item) {
      let data = this.cycleOptions.find(cycle => cycle.id === item.cycle_type)
      return data.text
    },
    schedulePeriod(item){
      let data = this.periodOptions.find(period => period.id === item.schedule_period)
      return data.text
    },
    coach(item) {
      this.dataItem = item.coaches
      this.view=true
      this.AnnounceTitle="Coach"
    },
    client(item) {
      this.dataItem = item.clients
      this.view=true
      this.AnnounceTitle="Client"
    },
    showRecord(item){
      this.goTo("announcement-id", { id: item.id });
    },
  },
};
</script>
