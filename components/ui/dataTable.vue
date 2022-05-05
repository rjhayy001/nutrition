<template>
  <fragment>
    <div class="d-flex align-center py-2 data-table-cus">
      <p class="title mr-1">{{ title }}</p>
      <v-btn icon class="mr-1" small @click="reloadTable">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <div class="mr-1" style="width: 400px">
        <v-text-field
          auto-select-first
          v-model="searchKeyword"
          filled
          rounded
          hide-details=""
          :placeholder="`Search by ${searchPlaceholder} ...`"
          dense
          append-icon="mdi-magnify"
          @keydown.enter="searchRecords(searchKeyword)"
        ></v-text-field>
      </div>
      <v-btn class="mr-1 success" small @click="addNewRecord">
        <v-icon>mdi-plus</v-icon>
        ADD
      </v-btn>
      <v-btn class="mr-1 error" small @click="deleteRecord(selectedItems)">
        <v-icon>mdi-delete-outline</v-icon>
        DELETE
      </v-btn>
      <v-btn
        class="mr-1 primary"
        small
        @click="toggleFilter"
        v-if="headHasFilterable"
      >
        <v-icon>mdi-filter-outline</v-icon>
        Filter
      </v-btn>
    </div>
    <hr />
    <div>
      <v-data-table
        :headers="headers"
        :items="data"
        :items-per-page="items_per_page"
        class="elevation-0 custom-table my-sticky-header-column-table"
        :show-select="showSelect"
        :hide-default-footer="hideFooter"
        :hide-default-header="true"
        :fixed-header="true"
        item-key="id"
        disable-sort
        height="800"
        v-model="selectedItems"
      >
        <template v-slot:header="{ props }">
          <thead class="v-data-table-header">
            <tr>
              <th role="columnheader" scope="col" v-for="head in props.headers" style="width:200px">
                <span
                  class="d-flex justify-space-between block"
                  v-if="head.value != 'data-table-select'"
                >
                  {{ head.text }}
                  <div v-if="head.filterable">
                    <v-btn
                      x-small
                      icon
                      class="filter-action"
                      @click="sortTable(head)"
                    >
                      <v-icon>
                        {{
                          head.sortType == null
                            ? "mdi-sort"
                            : head.sortType == 1
                            ? "mdi-sort-ascending"
                            : "mdi-sort-descending"
                        }}</v-icon
                      >
                    </v-btn>
                  </div>
                </span>
                <div
                  v-else
                  class="v-data-table__checkbox v-simple-checkbox"
                  @click="toggleMultipleItems"
                >
                  <div class="v-input--selection-controls__input">
                    <i
                      aria-hidden="true"
                      :class="[
                        'v-icon notranslate mdi theme--light',
                        isAllSelected
                          ? 'mdi-checkbox-marked'
                          : 'mdi-checkbox-blank-outline',
                      ]"
                    ></i>
                    <div class="v-input--selection-controls__ripple"></div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
        </template>
        <template
          v-for="(head, index) of headers"
          v-slot:[`item.${head.value}`]="props"
        >
          <td :props="props">
            <slot :name="head.value" :item="props.item">
              {{ props.item[head.value] || "..." }}
            </slot>
          </td>
        </template>
        <template v-slot:item.action="{ item }">
          <div>
            <v-btn
              icon
              color="primary"
              class="mr-1"
              small
              @click="editRecord(item)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              icon
              color="error"
              class="mr-1"
              small
              @click="deleteRecord(item)"
            >
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </div>
        </template>
        <template v-slot:body="" v-if="loaded == 0">
          <tr v-for="n in 15" :key="n">
            <td v-for="i in headers.length + 1" :key="i">
              <v-skeleton-loader
                ref="skeleton"
                type="list-item-two-line"
                class="mx-auto skel-loader"
              ></v-skeleton-loader>
            </td>
          </tr>
        </template>
        <template v-slot:body.prepend="{ item }" v-if="loaded == 2">
          <v-scroll-y-transition>
            <tr
              class="filter-row"
              v-show="showFilter || (isFiltered && !filterStatusChanged)"
              transition="fade-transition"
            >
              <td class="py-2"></td>
              <template v-for="(head, index) of headers">
                <td
                  v-if="index == 0 || !head.filterable"
                  :key="`filter-${index}`"
                ></td>
                <td v-else class="py-2" :key="index">
                  <v-text-field
                    solo
                    hide-details=""
                    :placeholder="`Filter by ${head.text}`"
                    dense
                    v-model="head.filterValue"
                    @keydown.enter="filterBy(head)"
                  ></v-text-field>
                </td>
              </template>
            </tr>
          </v-scroll-y-transition>
        </template>
      </v-data-table>
    </div>
    <div class="text-center" v-if="loaded == 2">
      <v-pagination
        v-model="options.page"
        :length="options.length"
        circle
        :total-visible="10"
        class="custom-pagination"
        @input="changePagenumber"
      ></v-pagination>
    </div>
  </fragment>
</template>
<script>
import { Fragment } from "vue-frag";

export default {
  components: {
    Fragment
  },
  data() {
    return {
      page: 10,
      showFilter: false,
      isAllSelected: false,
      selectedItems: [],
      loaded: 0,
      isFiltered: false,
      filterStatusChanged: false,
      items_per_page: 50,
      searchKeyword: "",
    };
  },
  props: {
    hideFooter: {
      type: Boolean,
      default: () => true,
    },
    showSelect: {
      type: Boolean,
      default: () => true,
    },
    title: {
      type: String,
      default: () => "",
    },
    headers: {
      type: Array,
      default: () => {
        return [];
      },
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
    searchPlaceholder: {
      type: String,
      default: () => "name, age",
    },
  },
  mounted() {
    this.setFilterbyParamValue();
    this.searchFieldValue();
  },
  methods: {
    setFilterbyParamValue() {
      if (!this.$route.query.filters) return;
      let currentFilters = this.$route.query.filters.split(",");

      this.headers.forEach((head, index) => {
        currentFilters.forEach((filter) => {
          let currentFilter = filter.split("=");
          if (head.value == currentFilter[0]) {
            this.headers[index].filterValue = currentFilter[1];
            this.isFiltered = true;
            this.showFilter = true;
            return;
          }
        });
      });
    },
    searchFieldValue() {
      if (!this.$route.query.find) return;
      this.searchKeyword = this.$route.query.find;
    },
    reloadTable() {
      this.searchKeyword = "";
      this.goTo(this.$route.name);
      setTimeout(() => {
        this.$emit("reloadtable");
      }, 100);
    },
    addNewRecord() {
      this.$emit("addRecord");
    },
    deleteRecord(item) {
      if (item.length > 0 || item.id) {
        this.$emit("deleteRecord", item.length > 0 ? item : [item]);
      }
    },
    editRecord(item) {
      this.$emit("editRecord", item);
    },
    sortTable(head) {
      if (head.sortType == null) head.sortType = 1;
      else if (head.sortType == 1) head.sortType = 2;
      else head.sortType = null;
      console.log(head, "head");
      this.$emit("sortTable", head);
    },
    toggleMultipleItems() {
      this.isAllSelected = !this.isAllSelected;
      if (this.isAllSelected) {
        this.selectedItems = this.data;
      } else {
        this.selectedItems = [];
      }
    },
    toggleFilter() {
      this.filterStatusChanged = true;
      this.showFilter = !this.showFilter;
    },
    filterBy(head) {
      this.$emit("FilterBy", head);
    },
    changePagenumber($event) {
      this.$emit("updatePagenum", $event);
    },
    searchRecords(keyword) {
      this.$emit("searchRecords", keyword);
    },
  },
  computed: {
    headHasFilterable() {
      return this.headers.some((item) => item.filterable);
    },
  },
  watch: {
    selectedItems(val) {
      console.log(val, "res");
    },
    data: {
      handler(val) {
        if (val.length > -1 && this.loaded == 0) {
          setTimeout(() => {
            this.loaded = 2;
          }, 1500);
        }
        this.selectedItems = [];
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
