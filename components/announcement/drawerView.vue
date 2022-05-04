<template>
  <v-navigation-drawer
    temporary
    right
    fixed
    v-model="drawer"
    width="40%"
    hide-overlay  
  >
    <div class="pa-2">
      <v-flex xs12>
        <p class="title mb-0 font-weight-medium">View {{title}} Receiver</p>
      </v-flex>
      <v-data-table
        :headers="headers"
        :items="viewItem"
        class="elevation-1 custom-table"
      >
        <template v-slot:item.full_name="{ item }">
          <div class="d-flex justify-content-around">
            <v-avatar style="margin:auto 0;" size="36px">
              <img
                :alt="item.image"
                :src="item.logo ? item.logo : '/images/empty_person.png'"
              />
            </v-avatar>
            <div class="my-auto">
              <span v-if="item.full_name ==null" class="pa-2">...</span>
              <span v-else class="pa-2"> {{ item.full_name }} </span>
            </div>
          </div>
        </template>
        <template v-slot:item.email="{ item }">
          <template v-if="item.email == null">...</template>
          <template v-else>
            {{ item.email }}
          </template>
        </template>
        <template v-slot:item.created_at="{ item }">
          {{ formatDate(item.created_at) }}
        </template>
      </v-data-table>
    </div>
  </v-navigation-drawer>
</template>
<script>
import addressHelper from "@/mixins/addressHelper.vue";
import dateHelper from "@/mixins/dateHelper.vue";
export default {
    mixins: [dateHelper, addressHelper],
    data() {
    return {
      drawer: false,
      viewItem:[],
      headers: [
        { text: 'Full Name', align: 'start', value: 'full_name', width: '350px'},
        { text: 'Email', align: 'start', value: 'email', width: '150px' },
        { text: 'created_at', align: 'start', value: 'created_at', width: '200px' },
      ],
    };
  },
    props: {
    viewStatus: {
      type: Boolean,
      default: () => false,
    },
    dataItem: {
      type:Array,
      default:() => {}
    },
    title: {
      type:String,
      default:() => {}
    }
  },
  watch: {
    viewStatus(val) {
      this.drawer = val
    },
    drawer(val) {
      if (!val) {
        this.$emit("closeDrawer");
      }
    },
    dataItem(val) {
      this.viewItem = val
    }
  }
}
</script>