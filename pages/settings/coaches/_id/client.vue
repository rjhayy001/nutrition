<template>
  <v-container grid-list-md fluid>
    <v-layout row wrap v-if="loads==true">
      <v-flex xs12 class="mb-4">
          <v-card-title>
            Coach Client
            <v-spacer></v-spacer>
            <div  style="width: 400px;">
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    hide-details
                    clearable
                    outlined
                    rounded
                    dense></v-text-field>
            </div>
          </v-card-title>
          <hr />
        <v-data-table
        :headers="headers"
        :items="datalist"
        :search="search"
         @click:row="showRecord"
        >
        <template v-slot:item.phone_1="{ item }">
          <template v-if="item.client.phone_1">
           {{item.client.phone_1}}
          </template>
          <template v-else>
            --
          </template>
        </template>
        <template v-slot:item.status="{ item }">
           <v-switch
              v-model="item.client.status"
              color="success"
              inset
              @click.stop="changeStatus(item.client)"
            ></v-switch>
        </template>
        <template v-slot:item.address_1="{ item }">
          <template v-if="item.client.address_1">
           {{item.client.address_1}}
          </template>
          <template v-else>
            --
          </template>
        </template>
         <template v-slot:item.action="{ item }">
          <v-tooltip left color="success">
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="mr-2" @click="showRecord(item)" v-on="on"
                >mdi-eye
              </v-icon>
            </template>
            <span >view</span>
          </v-tooltip>
        </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <v-layout v-else>
        <loading></loading>
    </v-layout>
  </v-container>
</template>
<script>
import loading from '@/components/loader/default_loader.vue'

  export default {
    components:{
      loading
    },
    data () {
      return {
        datalist:[],
        search: '',
        loads:false,
        switch1: true,
        headers: [
          { text: 'Full Name', value: 'client.full_name' },
          { text: 'Email', value: 'client.email' },
          { text: 'Phone', value: 'phone_1' },
          { text: 'Address', value: 'address_1' },
          { text: 'Status', value: 'status' },
          { text: 'Action', value: 'action' },
        ],
      }
    },
    mounted(){
        this.getClientlist();
    },
    methods: {
      getClientlist(){
        this.$axios
        .get(`coaches/getClient/`+`${this.$route.params.id}`
         )
        .then(({ data }) => {
          this.datalist = data;
          this.loads=true;
        });
      },
      changeStatus(payload){
        this.$axios
        .put(`${this.$clients}/${payload.id}/status`, payload)
        .then(({ data }) => {
          this.successNotification(
            payload,
            "updated",
            "client",
            "clients",
            "first_name"
          );
          this.initialize();
        });
      },
      showRecord(item){
        this.goTo("client-id-profile", { id: item.client_id });
      },
    }
  }
</script>