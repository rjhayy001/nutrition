<template>
  <v-navigation-drawer
    temporary
    right
    fixed
    v-model="drawer"
    width="30%"
    hide-overlay
  >
    <p
      class="
        form-title
        pa-2
        title
        font-weight-regular
        text-uppercase
        d-flex
        justify-space-between
      "
    >
      {{ payload.id ? "Edit" : "Add new"  }} Macro
      <v-btn icon small @click="drawer = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </p>
    <v-divider class="mb-2"></v-divider>
    <ValidationObserver ref="form">
      <v-form class="form-box" @submit.prevent="saveForm">
        <v-container grid-list-md>
          <v-layout row wrap class="px-1">
             <v-flex xs6>
              <ValidationProvider
                mode="passive"
                slim
                name="short name"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    Date
                  </p>
                  <!-- <v-text-field
                    type="text"
                    hide-details="auto"
                    solo
                    :error-messages="errors"
                  ></v-text-field> -->
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="payload.date"
                        readonly
                        hide-details="auto"
                        solo
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="payload.date"
                      no-title
                      color="primary"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs6>
              <ValidationProvider
                mode="passive"
                slim
                name="short name"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    Type
                  </p>
                    <v-select
                      :items="DefaultOptions"
                      solo
                      item-value="value"
                      item-text="text"
                      v-model="payload.type"
                      :error-messages="errors"
                      hide-details="auto"
                    ></v-select>
                </div>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12>
              <p class="text-capitalize font-weight-medium mt-3">macro info</p>
            </v-flex>
            <!-- <v-flex xs5>
              <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular">
                    Date
                  </p>
             <v-radio-group v-model="payload.type" row >
              <v-radio
                class="text-capitalize"
                label="portions"
                value="portions"
              />
               <v-radio
                class="text-capitalize"
                label="grams"
                value="grams"
              />
            </v-radio-group>
            </div>
            </v-flex> -->
            <v-flex xs12 sm6>
              <ValidationProvider
                mode="passive"
                slim
                name="short name"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    protein
                  </p>
                  <v-text-field
                    v-model="payload.protein"
                    placeholder="Type protein..."
                    type="number"
                    hide-details="auto"
                    solo
                    :error-messages="errors"
                  ></v-text-field>
                </div>
              </ValidationProvider>
            </v-flex>
             <v-flex xs12 sm6>
              <ValidationProvider
                mode="passive"
                slim
                name="short name"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    lipid
                  </p>
                  <v-text-field
                    v-model="payload.lipid"
                    placeholder="Type lipid..."
                    type="number"
                    hide-details="auto"
                    solo
                    :error-messages="errors"
                  ></v-text-field>
                </div>
              </ValidationProvider>
            </v-flex>
             <v-flex xs12 sm6>
              <ValidationProvider
                mode="passive"
                slim
                name="short name"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    carbohydrate
                  </p>
                  <v-text-field
                    v-model="payload.carbohydrate"
                    placeholder="Type carbohydrate..."
                    type="number"
                    hide-details="auto"
                    solo
                    :error-messages="errors"
                  ></v-text-field>
                </div>
              </ValidationProvider>
            </v-flex>
             <v-flex xs12 sm6>
              <ValidationProvider
                mode="passive"
                slim
                name="vegetable"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="mb-1">
                  <p class="subtitle-2 font-weight-regular mb-2">
                    vegetable
                  </p>
                  <v-text-field
                    v-model="payload.vegetable"
                    placeholder="Type vegetable..."
                    type="number"
                    hide-details="auto"
                    solo
                    :error-messages="errors"
                  ></v-text-field>
                </div>
              </ValidationProvider>
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
import FormDrawerHelper from "@/mixins/formDrawerHelper.vue";
export default {
  mixins: [FormDrawerHelper],
  data() {
    return {
      menu2:false,
      payload: {
        type:'portions',
        date:new Date().toISOString().substr(0, 10),
        protein: 0,
        lipid: 1,
        carbohydrate: 2,
        vegetable: 3,
      },
      DefaultOptions: [
        { value: 'portions', text: "Portions" },
        { value: 'grams', text: "Grams" },
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
      default: () => {},
    },
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    saveForm() {
      this.$refs.form.validate().then((result) => {
        if (!result) return;
        if (this.payload.id) {
          this.$emit("updateRecord", this.payload);
        } else {
          this.$emit("addRecord", this.payload);
        }
        this.reset()
      });
    },
  },
};
</script>
<style scoped>

</style>
