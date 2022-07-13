<template >
  <div style="width: 400px;">
    <v-autocomplete
    :items="items"
    :search-input.sync="search"
    item-text="content"
    filled
    rounded
    hide-no-data
    hide-details="auto"
    dense
    placeholder="Search item by name or title ...">
      <template v-slot:no-data>
        <v-list-item-content>
          <v-list-item-title>
            <p class="pl-4">Search items by name or title ...</p>
          </v-list-item-title>
        </v-list-item-content>
      </template>
      <template v-slot:append>
        <div class="text-center">
          <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on">
                mdi-filter-outline
              </v-icon>
            </template>
            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <h4>Filter By:</h4>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-list>
                <v-list-item v-for="filter in filters">
                  <v-switch v-model="payload.filterBy" :label="filter" :value="filter" @click="getData()">
                  </v-switch>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </template>
      <template v-slot:item="data">
        <v-list-item-avatar>
          <v-icon v-if="data.item.logo == null">mdi-account</v-icon>
          <img v-else :src="data.item.logo">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.content" @click="showRecord(data.item.id, data.item.key)">
          </v-list-item-title>
        </v-list-item-content>
      </template>
    </v-autocomplete>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      search: null,
      filters: ['Client', 'Coach', 'Blog'],
      payload: {
        filterBy: []
      }
    }
  },
  methods: {
    getData() {
      this.$axios.post('getSearchableData', this.payload).then(({ data }) => {
        this.items = data
      })
    },
    showRecord(id, key) {
      if (key == 'client') {
        this.goTo("client-id-profile", { id });
      }else if(key == 'coach'){
        this.goTo("settings-coaches-id-profile", { id });
      }
    },
  },
  mounted() {
    this.getData()
  }
}
</script>
