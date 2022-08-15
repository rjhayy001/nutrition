<template>
  <v-container grid-list-md fluid>
    <v-layout row wrap v-if="loads==true">
      <v-flex xs12 class="mb-4">
          <v-card-title>
            {{this.$t('coaches.coach_schedule')}}
            <v-spacer></v-spacer>
            <div  style="width: 400px;">
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    :label="this.$t('coaches.search')"
                    hide-details
                    clearable
                    outlined
                    rounded
                    dense></v-text-field>
            </div>
            <!-- <v-tooltip bottom color="success">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="mx-2" v-on="on" @click="timePicker = true">mdi-plus</v-icon>
                </template>
                    <span >create</span>
            </v-tooltip> -->
            <v-btn
            color="success"
            class="ml-2 white--text"
            @click="timePicker = true">
            {{this.$t('coaches.add')}}
            <v-icon right   dark>
              mdi-plus
            </v-icon>
          </v-btn>
            <v-btn
            color="error"
            class="ml-2  white--text"
            @click="deleteSelected">
            {{this.$t('coaches.delete')}}
            <v-icon right   dark>
              mdi-delete
            </v-icon>
          </v-btn>
          </v-card-title>
          <hr />
        <v-data-table
        :headers="headers"
        :items="scheduleList"
        :search="search"
        v-model="selected"
        show-select
        >

        <template v-slot:item.day="{ item }">
          <template>
          {{getDay(item.date)}}
          </template>
        </template>
        <template v-slot:item.selected_time="{ item }">
          <template>
           <p id="all_time" @click="viewAlltime(item)">View all  <v-icon class="mr-2"  size="15" color="#fff"
                >mdi-eye
              </v-icon></p>
          </template>
        </template>
        <template v-slot:item.status="{ item }">
          <template v-if="checkStatus(item)" >
          <p id="avail">Available</p>
          </template>
          <template v-else color="error">
          <p id="n_avail">Not Available</p>
          </template>
        </template>

         <template v-slot:item.action="{ item }">
          <v-tooltip left color="success">
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="mr-2" @click="editItem(item)" v-on="on"
                >mdi-pencil
              </v-icon>
            </template>
            <span >edit</span>
          </v-tooltip>
          |
           <v-tooltip left color="success">
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="ml-2" @click="deleteItem(item)" v-on="on"
                >mdi-delete
              </v-icon>
            </template>
            <span >delete</span>
          </v-tooltip>
        </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <v-layout v-else>
        <loading></loading>
    </v-layout>

     <v-dialog v-model="timePicker" max-width="500px">
        <v-card>
          <v-card-title class="font-weight-light" id="calendar_wrapper">
            Set appointment time
          </v-card-title>
          <hr/>
          <v-card-text>
            <div class="my-5">
            <v-row>
              <v-col cols="12" sm="12"  id="date-wrapper">
                <v-date-picker
                  v-model="dates"
                  class="date-picker"
                  multiple
                  elevation="5"
                  :min="dateNow"
                  :allowed-dates="getDisableDates"
                  no-title
                ></v-date-picker>
              </v-col>
            </v-row>
            </div>
            <div>
            <v-row>
              <v-col cols="12" sm="12">
               <div class="d-flex">
                <p class="tittle font-weight-medium" style="font-size: 15px; color:#000">Select Time</p>
                <v-icon class="mx-2">mdi-clock-time-four-outline</v-icon>
                <!-- <v-icon class="mx-2" @click="modal2 = true">mdi-clock-time-four-outline</v-icon>  -->
                </div>
                <v-spacer/>
                <div id="timeHolder" >
                    <p v-for="(item, index) in timelist" :key="index" @click="Addtime(item, index)" :id="`time_${index}`" :class="CheckTime(item)?'active':''">{{item}}</p>
                </div>
              </v-col>
            </v-row>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end" id="__actions">
            <v-btn
              color="white"
              text
              @click="CancelNew"
            >
              {{this.$t('coaches.cancel')}}
            </v-btn>
            <v-btn color="white" text @click="saveSched">
              {{this.$t('coaches.save')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog id="dialog-wrapper" v-model="modal2"
          ref="dialog"
          :return-value.sync="time"
          persistent
          width="450px"
        >
          <v-card>
          <v-card-title class="font-weight-light" id="calendar_wrapper">
            Appointment Time
          </v-card-title>
          <hr/>
          <v-card-text>
            <div>
            <v-row>
              <v-col cols="12" sm="12">
                <v-spacer/>
                <div id="timeHolder" class="mt-8" >
                    <p v-for="(item, index) in appTime" :key="index" >{{item}}</p>
                </div>
              </v-col>
            </v-row>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end" id="__actions">
            <v-btn color="white" text @click.stop="modal2 = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="deletedialog"
          max-width="500px"
        >
          <v-card>
            <v-card-title class="font-weight-light">
              Delete Confirmation
            </v-card-title>
            <v-card-text>
              <div class="my-5">
                <p class="font-weight-light" style="color:#000;font-size: 17px;">
                  {{message}}
                </p>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                color="green"
                text
                @click="deletedialog = false"
              >
                Close
              </v-btn>
              <v-btn
                color="red"
                text
                @click="deleteConfirmation()"
              >
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
  </v-container>
</template>
<script src="https://unpkg.com/vue@2.6.12/dist/vue.min.js"></script>
<link href="https://unpkg.com/v-calendar@2.3.0/lib/v-calendar.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/v-calendar@2.3.0/lib/v-calendar.umd.min.js"></script>
<script>
import loading from '@/components/loader/default_loader.vue'
import moment from 'moment'

  export default {
    components:{
      loading
    },
    data () {
      return {
        edit : false,
        datalist:[],
        search: '',
        loads:false,
        switch1: true,
        dateNow:'',
        headers: [
          { text: this.$t('coaches.date'), value: 'date' },
          { text: this.$t('coaches.day'), value: 'day' },
          { text: this.$t('coaches.time'), value: 'selected_time' },
          { text: this.$t('coaches.status'), value: 'status' },
          { text: this.$t('coaches.actions'), value: 'action' },
        ],
        time: null,
        modal2: false,
        timePicker: false,
        deletedialog: false,
        disableDates: [],
        menu: false,
        dates: [],
        selected: [],
        scheduleList:[],
        seletedTime: [],
        appointedTime: [],
        appTime: [],
        editId: '',
        deletetId: '',
        message: '',
        deleteseleted: false,
        timelist:['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00',
        '15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'],
      }
    },
    mounted(){
        // this.getClientlist();
        this.dateNow = moment().format('YYYY-MM-DD')
        this.getSchedule();
    },
    methods: {
       getSchedule(){
        this.$axios
        .get(`coachshedule/`+`${this.$route.params.id}`)
        .then(({ data }) => {
          console.log(data);
         this.scheduleList = data.data;
         this.disableDates = data.disableData;
         this.loads=true;
        });
      },
      getDay(date){
        var weekDayName =  moment(date).format('dddd');
        return weekDayName;
      },
      viewAlltime(time){
        this.modal2 = true;
        this.appTime = JSON.parse(time.selected_time);
      },

      Addtime(time, index){
        const tags = document.getElementById('time_'+index);
        if(this.appointedTime != null){
          if(this.appointedTime.includes(time)){
              this.ErrorCoachSchedNotification('This time is already setted for client appointment you can\'t remove it.')
              return;
          }
        }
        if(this.seletedTime.includes(time)){
          tags.classList.remove('active')
          let key = this.seletedTime.indexOf(time);
          this.seletedTime.splice(key, 1);
        }else{
          tags.classList.add('active')
          this.seletedTime.push(time)
        }
      },
       getDisableDates (val) {
        if(this.edit == false){
            if (this.disableDates.indexOf(val) !== -1) {
              return false
            } else {
              return true
            }
        }
        else{
            if (this.disableDates.indexOf(val) !== -1) {
              return true
            } else {
              return false
            }
        }

      },
      saveSched(){
        this.seletedTime.sort();

        if(this.dates.length <= 0 || this.seletedTime.length <= 0){
          return this.ErrorCoachSchedNotification('Invalid time and date')
        }
         if(this.edit == false){
           this.dates.sort();
            this.$axios
            .post(`coachshedule`,{
                coach_id : `${this.$route.params.id}`,
                dates : this.dates,
                times:this.seletedTime
                }
            )
            .then(({ data }) => {
              this.getSchedule();
              this.timePicker = false;
              this.successCoachSchedNotification('added', 'new appoinment schedule')
            });
        }
        else{
          this.$axios
            .post(`coachshedule/updatelist`,{
                id : this.editId,
                times:this.seletedTime
                }
            )
            .then(({ data }) => {
              this.getSchedule();
              this.timePicker = false;
              this.successCoachSchedNotification('update', 'list')
            });
        }
      },
      deleteItem(item){
        this.deletetId = item.id;
        this.deletedialog = true;
        if(item.appointed_time_number > 0){
          this.message = 'All client appointment in this date will be deleted, Do you want to proceed?'
        }
        else{
          this.message = 'Do you want to delete?'
        }

      },
      deleteConfirmation(){
        if(this.deleteseleted == false){
          this.$axios
          .delete(`coachshedule/`+this.deletetId
          )
          .then(({ data }) => {
            this.deletedialog = false;
            this.getSchedule();
            this.successCoachSchedNotification('deleted', 'list')
          });
        }
        else{
          this.deleteAll()
        }

      },
      deleteSelected(){
        if(this.selected.length <= 0){
          this.ErrorCoachSchedNotification('No selected')
          return;
        }
        else{
          this.message = 'All client appointment in this selected list will be deleted, Do you want to proceed?'
          this.deleteseleted = true;
          this.deletedialog = true;
        }
      },
      deleteAll(){
        this.$axios
        .post(`coachshedule/deleteList`,{
            datas : this.selected,
            }
        )
        .then(({ data }) => {
          this.deleteseleted = false;
          this.deletedialog = false;
          this.successCoachSchedNotification('deleted', 'selected list')
          this.getSchedule();
        });
      },
      editItem(item){
        this.edit = true;
        this.editId =  item.id;
        this.disableDates = item.date;
        this.dates = item.date;
        this.seletedTime = JSON.parse(item.selected_time);
        this.appointedTime = JSON.parse(item.appointed_time);
        this.timePicker = true;
        // this.$axios
        // .post(`coachshedule/deleteList`,{
        //     datas : this.selected,
        //     }
        // )
        // .then(({ data }) => {
        //   console.log(data);
        //   this.getSchedule();
        // });
      },
      CancelNew(){
        this.timePicker = false,
        this.deletedialog = false,
        this.getSchedule();
        this.edit = false
        this.seletedTime = [];
        this.dates = [];
      },
      CheckTime(data){
       if(this.seletedTime.includes(data)){
          return true;
        }
      },
      checkStatus(data){
        var ctr = JSON.parse(data.selected_time)
        if(ctr.length == data.appointed_time_number){
          return false;
        }
        else{
          return true;
        }
      }
    }
  }
</script>
<style>
.v-picker__actions{
  background: #7c94de;
  margin-top: 17px;
}
#__actions{
  background: #7c94de;
  margin-top: 17px;
}
#calendar_wrapper{
  background: #7c94de;
  color: #fff;
}
#timeHolder{
    display: flex;
    grid-gap: 10px;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 10px;
    justify-content: center;
}
#timeHolder p{
    width: fit-content;
    border: solid 1px #c0b6b6;
    border-radius: 8px;
    padding: 1px 25px;
    font-size: 13px;
    color: #000;
    font-weight: 500;
    width: 92px;
    text-align: center;
    cursor:pointer;
}
#timeHolder p._time:hover{
    background-color: #7c94de;
    color: #fff;
    border-color: #7c94de;
}
#timeHolder p.active{
    background-color: #7c94de;
    color: #fff;
    border-color: #7c94de;
}
#date-wrapper{
  display: flex;
  justify-content: center;
}
#all_time{
    border: solid 1px;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    padding: 5px 10px;
    border-radius: 4px;
    display: flex;
    grid-gap: 10px;
    gap: 10px;
    background-color: #92a6e2;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
}
#avail{
  color: white;
  width: fit-content;
  padding: 3px 12px;
  border-radius: 12px;
  background-color: #2cbc76;
}
#n_avail{
  color: white;
  width: fit-content;
  padding: 3px 12px;
  border-radius: 12px;
  background-color: #dd2c00 ;
}
</style>
