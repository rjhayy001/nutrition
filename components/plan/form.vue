<template>
  <v-navigation-drawer
    temporary 
    right 
    fixed 
    v-model="drawer" 
    width="40%" 
    hide-overlay
  >
    <div v-show="loading">
      <p class="form-title pa-2 title font-weight-regular text-uppercase d-flex justify-space-between">
        {{ !payload.id ? "Ajouter" : "Modifier" }} un Plan
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
                <ValidationProvider slim name="name" rules="required|min:1|max:100" v-slot="{ errors }">
                  <div class="mb-1">
                    <p class="subtitle-2 font-weight-regular mb-2">
                      <span>*</span>
                      Nom
                    </p>
                    <v-text-field v-model="payload.name" placeholder="Type name..." type="text" hide-details="auto" solo
                      :error-messages="errors"></v-text-field>
                  </div>
                </ValidationProvider>
              </v-flex>
              <v-flex xs12>
                <ValidationProvider slim name="description" rules="max:200" v-slot="{ errors }">
                  <div class="mb-1">
                    <p class="subtitle-2 font-weight-regular mb-2">
                      Description
                    </p>
                    <v-textarea v-model="payload.description" placeholder="Type description..." type="text"
                      hide-details="auto" solo rows="2" :ezrror-messages="errors"></v-textarea>
                  </div>
                </ValidationProvider>
              </v-flex>
              <v-flex xs12>
                <p class="subtitle-1 font-weight-medium my-2 text-uppercase">
                  Prix
                </p>
              </v-flex>
              <v-flex xs12>
                <v-expansion-panels v-model="panel">
                  <v-expansion-panel v-for="(price, i) in payload.prices" :key="i">
                    <v-expansion-panel-header>
                      <div class="d-flex justify-space-between">
                        {{ price | computePlanPrice }}
                        <v-btn text color="error" small @click.prevent.stop="removePrice(i)"
                          v-if="payload.prices.length != 1">
                          Remove
                        </v-btn>
                      </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div class="mb-2">
                        <p class="subtitle-2 font-weight-regular mb-2">
                          <span>*</span>
                          Montant
                        </p>
                        <v-text-field placeholder="Type price..." type="number" hide-details="auto" solo prefix="€"
                          v-model="price.price" @change="price.price = parseFloat(price.price)"></v-text-field>
                      </div>
                      <div class="d-flex mb-2 justify-space-between">
                        <v-btn :class="[price.is_recurring ? 'primary' : 'normal']" style="width: 49%"
                          @click="price.is_recurring = 1">
                          Périodique
                        </v-btn>
                        <v-btn :class="[!price.is_recurring ? 'primary' : 'normal']" style="width: 49%"
                          @click="price.is_recurring = 0">
                          En une fois
                        </v-btn>
                      </div>
                      <div class="mb-2">
                        <p class="subtitle-2 font-weight-regular mb-2">
                          <span>*</span>
                          Période de facturation
                        </p>
                        <v-select v-model="price.billing_period" :items="periodOptions" hide-details="auto" solo
                          item-text="text" item-value="id"></v-select>
                      </div>
                      <template v-if="price.billing_period == 7">
                        <div class="mb-2">
                          <p class="subtitle-2 font-weight-regular mb-2">
                            <span>*</span>
                            Cycle Count
                          </p>
                          <v-text-field placeholder="Type total cycle..." type="text" hide-details="auto" solo
                            v-model="price.recycle_count"></v-text-field>
                        </div>
                        <div class="mb-2">
                          <p class="subtitle-2 font-weight-regular mb-2">
                            <span>*</span>
                            Cycle Type
                          </p>
                          <v-select v-model="price.recycle_type" :items="recycleOptions" hide-details="auto" solo
                            item-text="text" item-value="id"></v-select>
                        </div>
                      </template>

                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-flex>
              <v-flex xs12>
                <!-- <v-btn class="primary" block @click="addNewPlanPrice">
                  Ajouter un prix
                  <v-icon>mdi-plus</v-icon>
                </v-btn> -->
                <v-btn :disabled="buttonDisable" class="success mt-1" block type="submit">
                  <v-icon>mdi-content-save-outline</v-icon>
                  {{ payload.id ? "SAUVEGARDER" : "CRÉER" }}
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </ValidationObserver>
    </div>
    <div v-show="!loading" style="position: relative; height: 90vh;">
        <loader-page></loader-page>
    </div>
  </v-navigation-drawer>
</template>
<script>
import priceHelperVue from "../../mixins/priceHelper.vue";
import loaderPage from "~/components/loader/default_loader.vue";
export default {
  components: {
    loaderPage
  },
  mixins: [
    priceHelperVue
  ],
  data() {
    return {
      panel: 0,
      drawer: false,
      loading:true,
      buttonDisable: false,
      payload: {
        name: "",
        description: "",
        prices: [
          {
            price: 0,
            is_recurring: 1,
            billing_period: 3,
            recycle_count: 1,
            recycle_type: 3,
          },
        ],
      },
      DefaultOptions: [
        { id: 1, text: "Oui" },
        { id: 0, text: "Non" },
      ],
      originalPayload: null,
      periodOptions: [
        { id: 1, text: "Par jours" },
        { id: 2, text: "Par semaine" },
        { id: 3, text: "Par mois" },
        { id: 4, text: "Tous les 3 mois" },
        { id: 5, text: "Tous les 6 mois" },
        { id: 6, text: "Tous les ans" },
        { id: 7, text: "Personalisé" },
      ],
      recycleOptions: [
        { id: 1, text: "Par jours" },
        { id: 2, text: "Par semaine" },
        { id: 3, text: "Par mois" },
      ],
    };
  },
  props: {
    drawerStatus: {
      type: Boolean,
      default: () => false,
    },
    selectedItem: {
      type: Object,
      default: () => { },
    },
  },
  methods: {
    addNewPlanPrice() {
      this.payload.prices.push({
        price: 0,
        is_recurring: 1,
        billing_period: 3,
        recycle_count: 1,
        recycle_type: 3,
      });
    },
    saveForm() {
      this.$refs.form.validate().then((result) => {
        if (!result) return;
        this.loading=false
        if (this.payload.id) {
          this.$emit("updateRecord", this.payload);
        } else {
          this.$emit("addRecord", this.payload);
        }
      });
    },
    removePrice(index) {
      if (this.payload.prices.length == 1) return;
      this.payload.prices.splice(index, 1);
    },
  },
  watch: {
    drawerStatus(val) {
      this.drawer = val;
    },
    drawer(val) {
      if (this.originalPayload) {
        this.payload = this.cloneVariable(this.originalPayload);
      }

      if (!val) {
        this.$emit("closeDrawer");
        this.loading=true
      }
    },
    selectedItem: {
      handler(val) {
        if (!val.prices.length) {
          val.prices.push({
            price: 0,
            is_recurring: 1,
            billing_period: 3,
            recycle_count: 1,
            recycle_type: 3,
          });
        }
        if (!this.originalPayload) {
          this.originalPayload = this.cloneVariable(this.payload);
        }
        this.payload = this.cloneVariable(val);
      },
      deep: true,
    },
    "payload.prices": {
      handler(val) {
        if(val[0].price>0) {
          this.buttonDisable=true
        }else{
          this.buttonDisable=false
        }
      }
    }
  },
};
</script>
