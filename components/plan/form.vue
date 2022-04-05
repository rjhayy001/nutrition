<template>
  <v-navigation-drawer
    temporary
    right
    fixed
    v-model="drawer"
    width="40%"
    hide-overlay
    stateless
  >
    <p
      class="form-title pa-2 title font-weight-regular text-uppercase d-flex justify-space-between"
    >
      {{ !payload.id ? "Add new" : "Edit" }} Plan
      <v-btn icon small @click="drawer = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </p>
    <v-divider class="mb-2"></v-divider>
    <ValidationObserver ref="form">
      <v-form class="form-box" @submit.prevent="saveForm">
        <v-container grid-list-md>
          <v-layout row wrap class="px-1">
            <v-flex xs12>
              <p class="subtitle-1 font-weight-medium mb-2 text-uppercase">
                INFORMATIONS
              </p>
            </v-flex>
            <v-flex xs12>
              <ValidationProvider
                slim
                name="name"
                rules="required|min:1|max:100"
                v-slot="{ errors }"
              >
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    <span>*</span>
                    Name
                  </p>
                  <v-text-field
                    v-model="payload.name"
                    placeholder="Type name..."
                    type="text"
                    hide-details="auto"
                    solo
                    :error-messages="errors"
                  ></v-text-field>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <ValidationProvider
                slim
                name="description"
                rules="max:200"
                v-slot="{ errors }"
              >
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    Description
                  </p>
                  <v-textarea
                    v-model="payload.description"
                    placeholder="Type description..."
                    type="text"
                    hide-details="auto"
                    solo
                    rows="2"
                  ></v-textarea>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <p class="subtitle-1 font-weight-medium my-2 text-uppercase">
                Prices
              </p>
            </v-flex>
            <v-flex xs12>
              <v-expansion-panels v-model="panel">
                <v-expansion-panel
                  v-for="(price, i) in payload.prices"
                  :key="i"
                >
                  <v-expansion-panel-header>
                    <div class="d-flex justify-space-between">
                      {{ getPriceTitle(price) }}
                      <v-btn text color="error" small @click.prevent.stop="removePrice(i)" v-if="payload.prices.length != 1">
                        REmove
                      </v-btn>
                    </div>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="mb-2">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span>*</span>
                        Price
                      </p>
                      <v-text-field
                        placeholder="Type price..."
                        type="text"
                        hide-details="auto"
                        solo
                        prefix="€"
                        v-model="price.price"
                      ></v-text-field>
                    </div>
                    <div class="d-flex mb-2 justify-space-between">
                      <v-btn
                        :class="[price.is_recurring ? 'primary' : 'normal']"
                        style="width: 49%"
                        @click="price.is_recurring = 1"
                      >
                        RECURRING
                      </v-btn>
                      <v-btn
                        :class="[!price.is_recurring ? 'primary' : 'normal']"
                        style="width: 49%"
                        @click="price.is_recurring = 0"
                      >
                        ONE TIME ONLY
                      </v-btn>
                    </div>
                    <div class="mb-2">
                      <p class="subtitle-2 font-weight-regular mb-2">
                        <span>*</span>
                        Billing Period
                      </p>
                      <v-select
                        v-model="price.billing_period"
                        :items="periodOptions"
                        hide-details="auto"
                        solo
                        item-text="text"
                        item-value="id"
                      ></v-select>
                    </div>
                    <template v-if="price.billing_period == 7">
                      <div class="mb-2">
                        <p class="subtitle-2 font-weight-regular mb-2">
                          <span>*</span>
                          Cycle Count
                        </p>
                        <v-text-field
                          placeholder="Type total cycle..."
                          type="text"
                          hide-details="auto"
                          solo
                          v-model="price.recycle_count"
                        ></v-text-field>
                      </div>
                      <div class="mb-2">
                        <p class="subtitle-2 font-weight-regular mb-2">
                          <span>*</span>
                          Cycle Type
                        </p>
                        <v-select
                          v-model="price.recycle_type"
                          :items="recycleOptions"
                          hide-details="auto"
                          solo
                          item-text="text"
                          item-value="id"
                        ></v-select>
                      </div>
                    </template>
                    <div>
                      <v-btn class="primary" block @click="addNewPlanPrice">
                        ADD NEW PRICE
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-flex>
            <v-flex xs12>
              <v-btn class="success mt-1" block type="submit">
                <v-icon>mdi-content-save-outline</v-icon>
                {{ payload.id ? "UPDATE" : "SAVE" }}
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </ValidationObserver>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {
      panel: 0,
      drawer: false,
      payload: {
        name: "",
        description: "",
        prices: [
          {
            price: 0,
            is_recurring: 1,
            billing_period: 3,
            recycle_count: 2,
            recycle_type: 3,
          },
        ],
      },
      DefaultOptions: [
        { id: 1, text: "Yes" },
        { id: 0, text: "No" },
      ],
      originalPayload: null,
      periodOptions: [
        { id: 1, text: "Daily" },
        { id: 2, text: "Weekly" },
        { id: 3, text: "Monthly" },
        { id: 4, text: "Every 3 months" },
        { id: 5, text: "Every 6 months" },
        { id: 6, text: "Every Year" },
        { id: 7, text: "Custom" },
      ],
      recycleOptions:[
        { id: 1, text: "Daily" },
        { id: 2, text: "Weekly" },
        { id: 3, text: "Monthly" },
      ]
    };
  },
  props: {
    drawerStatus: {
      type: Boolean,
      default: () => false,
    },
    selectedItem: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    addNewPlanPrice() {
      this.payload.prices.push({
        price: 0,
        is_recurring: 1,
        billing_period: 3,
        recycle_count: 2,
        recycle_type: 3,
      });
    },
    saveForm() {
      this.$refs.form.validate().then((result) => {
        if (!result) return;
        if (this.payload.id) {
          this.$emit("updateRecord", this.payload);
        } else {
          this.$emit("addRecord", this.payload);
        }
      });
    },
    getPriceTitle(price) {
      return `€ ${price.price ? price.price : "0.00"} EURO / Month`;
    },
    removePrice(index) {
      if(this.payload.prices.length == 1) return
      this.payload.prices.splice(index, 1)
    }
  },
  watch: {
    drawerStatus(val) {
      if (val) this.drawer = val;
    },
    drawer(val) {
      if (this.originalPayload) {
        this.payload = this.cloneVariable(this.originalPayload);
      }

      if (!val) {
        this.$emit("closeDrawer");
      }
    },
    selectedItem: {
      handler(val) {
        if (!val.prices.length) {
          val.prices.push({
            price: 0,
            is_recurring: 1,
            billing_period: 3,
            recycle_count: 2,
            recycle_type: 3,
          })
        }
        if (!this.originalPayload) {
          this.originalPayload = this.cloneVariable(this.payload);
        }
        this.payload = this.cloneVariable(val);
      },
      deep: true,
    },
  },
};
</script>
