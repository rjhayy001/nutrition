<template>
  <div>
    <template v-for="(data, index) of datas.slice(0, default_limit)">
      <v-chip
        close
        class="mr-1 my-1 primary"
        small
        :key="index"
        v-if="index <= default_limit"
        @click:close="deleteData(data)"
      >
        {{ data.name }}
      </v-chip>
    </template>
    <template v-if="datas.length > default_limit">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-chip class="mr-1 my-1 primary" small icon dark v-bind="attrs" v-on="on">
            <v-icon small> mdi-plus </v-icon>
            {{ datas.length - default_limit }}
          </v-chip>
        </template>
        <v-list class="common-list">
          <v-list-item class="common-list-item" v-for="(data, index) of datas.slice(default_limit,datas.length)" :key="index">
            <v-chip
              close
              class="mr-1 my-1 primary"
              small
              :key="index"
              @click:close="deleteData(data)"
            >
              {{ data.name }}
            </v-chip>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <template v-if="!datas.length"> ... </template>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    datas: {
      type: Array,
    },
    default_limit: {
      type: Number,
    },
  },
  methods: {
    deleteData(payload) {
      this.$emit("delete", payload);
    }
  },
};
</script>