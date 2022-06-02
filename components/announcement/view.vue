<template>
  <v-container class="px-3 py-2">
    <v-row>
      <v-col>
        <v-card>
          <div class="d-flex align-center py-2 data-table-cus">
            <p class="title mx-1">
              View Push
            </p>
            <v-spacer></v-spacer>
            <v-btn class="mr-1" small @click="$router.go('-1')">
              <v-icon>mdi-arrow-left</v-icon>
              BACK
            </v-btn>
          </div>
          <hr />
          <!-- <v-col class="d-flex" style="gap: 20px; padding: 10px 10px 0 10px!important">
            <v-card-title style="padding-left: 0!important;padding-right: 0!important">
              To:
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card width="90%" class="px-3 py-2" >
              <template v-for="(data, index) of receiver">
                <v-chip
                  class="mr-1 my-1 primary"
                  small
                  :key="index"
                >
                  {{data.first_name}} {{data.last_name}}({{ data.email }})
                </v-chip>
              </template>
                  v-if="index <= default_limit"
              <template v-if="receiver.length > default_limit">
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-chip class="mr-1 my-1 primary" small icon dark v-bind="attrs" v-on="on">
                      <v-icon small> mdi-plus </v-icon>
                      {{ receiver.length - default_limit }}
                    </v-chip>
                  </template>
                  <v-list class="common-list">
                    <v-list-item class="common-list-item" v-for="(data, index) of receiver.slice(default_limit,receiver.length)" :key="index">
                      <v-chip
                        close
                        class="mr-1 my-1 primary"
                        small
                        :key="index"
                        @click:close="deleteData(data)"
                      >
                        {{data.first_name}} {{data.last_name}}({{ data.email }})
                      </v-chip>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-card>
          </v-col> -->
            <v-card width="100%" class="px-3 py-2" >
              <v-card-title style="justify-content: center;">
                {{viewAnnounce.title}}
              </v-card-title>
              <v-card-subtitle class="d-flex">
                <v-card-text v-if="viewAnnounce.type==0" style="width: 100px!important; padding:10px!important; margin-top:auto; margin-bottom:auto;">
                  <span>
                    time:
                  </span>
                  <span>
                    {{viewAnnounce.time}}
                  </span>
                </v-card-text>
                <v-card-text style="width: 135px!important; padding:10px!important; margin-top:auto; margin-bottom:auto;">
                  <span>
                    Type:
                  </span>
                  <span>
                    {{viewAnnounce.type==0? "Once Only":"Recurring"}}
                  </span>
                </v-card-text>
                <v-card-text v-if="viewAnnounce.type==0" style="width: 145px!important; padding:10px!important; margin-top:auto; margin-bottom:auto;">
                  <span>
                    Date:
                  </span>
                  <span>
                    {{viewAnnounce.date}}
                  </span>
                </v-card-text>
                <v-card-text style="width: 95px!important; padding:10px!important; margin-top:auto; margin-bottom:auto;">
                  <span>
                    Status:
                  </span>
                  <span>
                    {{viewAnnounce.status==1? "on":"off"}}
                  </span>
                </v-card-text>
                <v-card-text v-if="viewAnnounce.type==1" style="width: 155px!important; padding:10px!important; margin-top:auto; margin-bottom:auto;">
                  <span>
                    Schedule Period:
                  </span>
                  <span>
                    {{viewAnnounce.schedule_period}}
                  </span>
                </v-card-text>
                <v-card-text v-if="viewAnnounce.type==1" style="width: 130px!important; padding:10px!important; margin-top:auto; margin-bottom:auto;">
                  <span>
                    Cycle Count:
                  </span>
                  <span>
                    {{viewAnnounce.cycle_count}}
                  </span>
                </v-card-text>
                <v-card-text v-if="viewAnnounce.type==1" style="width: 130px!important; padding:10px!important; margin-top:auto; margin-bottom:auto;">
                  <span>
                    Cycle Type:
                  </span>
                  <span>
                    {{viewAnnounce.cycle_type}}
                  </span>
                </v-card-text>
              </v-card-subtitle>
              <v-container>
                <v-card-text>
                  {{viewAnnounce.message}}
                </v-card-text>
              </v-container>
            </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      viewAnnounce:{},
      receiver:[],
      default_limit:50,
    };
  },
  props: {

    selectedItem: {
      type:Object,
      default:() => {}
    }
  },

  methods: {

  },
  watch: {
    selectedItem: {
      handler(val) {
        this.viewAnnounce = val
        this.receiver = val.clients.concat(val.coaches);
        this.data_count=this.receiver.length
      },
      deep: true,
    }
  },
};
</script>