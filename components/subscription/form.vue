<template>
    <v-navigation-drawer 
        temporary 
        right 
        fixed 
        v-model="drawer" 
        width="50%"
    >
        <p class="pa-2 title font-weight-regular text-uppercase d-flex justify-space-between">
            {{ !payload.id ? this.$t('subscription.addSubscription') : this.$t('subscription.updateSubscription') }} 
            <v-btn icon small @click="$emit('closeDrawer')">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </p>
        <v-divider class="mb-2"></v-divider>
        <ValidationObserver ref="form">
            <v-form class="form-box" @submit.prevent="saveForm">
                <v-container grid-list-md>
                    <v-layout row wrap class="px-1">
                        <v-flex xs12>
                            <ValidationProvider
                                slim
                                name="Client"
                                rules="required"
                                v-slot="{ errors }"
                            >
                                <p class="subtitle-2 font-weight-regular mb-2">
                                    Client
                                </p>
                                <v-autocomplete 
                                    clearable 
                                    :label="$t('subscription.selectClient')" 
                                    :items="clients" 
                                    item-value="id" 
                                    v-model="payload.client_id" 
                                    :filter="filterClients" 
                                    hide-details="auto" 
                                    solo
                                    :error-messages="errors"
                                >
                                    <template v-slot:item="{ item, on, attrs }">
                                        <v-list-item v-on="on" v-bind="attrs">
                                            <v-list-item-avatar color="primary">
                                                <v-img :src="item.logo" v-if="item.logo != null"></v-img>
                                                <span class="white--text" v-else>{{ item | initials }}</span>
                                            </v-list-item-avatar>
                                            <v-list-item-title>
                                                {{ item.full_name }}
                                            </v-list-item-title>
                                        </v-list-item>
                                    </template>
                                    <template v-slot:selection="{ item }">
                                        <v-flex class="d-flex align-center">
                                            <v-avatar color="primary" size="30">
                                                <v-img :src="item.logo" v-if="item.logo != null"></v-img>
                                                <span class="white--text text-caption" v-else>{{ item | initials }}</span>
                                            </v-avatar>
                                            <span class="pl-2">
                                                {{ item.full_name }}
                                            </span>
                                        </v-flex>
                                    </template>
                                </v-autocomplete>
                            </ValidationProvider>
                        </v-flex>

                        <v-flex xs12>
                            <ValidationProvider
                                slim
                                :name="this.$t('global.coach')"
                                rules="required"
                                v-slot="{ errors }"
                            >
                                <p class="subtitle-2 font-weight-regular mb-2">
                                    {{ $t('global.coach') }}
                                </p>
                                <v-autocomplete 
                                    clearable 
                                    :label="$t('subscription.selectCoach')" 
                                    :items="coaches" 
                                    item-value="id" 
                                    v-model="payload.coach_id" 
                                    :filter="filterClients" 
                                    hide-details="auto" 
                                    solo
                                    :error-messages="errors"
                                >
                                    <template v-slot:item="{ item, on, attrs }">
                                        <v-list-item v-on="on" v-bind="attrs">
                                            <v-list-item-avatar color="primary">
                                                <v-img :src="item.logo" v-if="item.logo != null"></v-img>
                                                <span class="white--text" v-else>{{ item | initials }}</span>
                                            </v-list-item-avatar>
                                            <v-list-item-title>
                                                {{ item.full_name }}
                                            </v-list-item-title>
                                        </v-list-item>
                                    </template>
                                    <template v-slot:selection="{ item }">
                                        <v-flex class="d-flex align-center">
                                            <v-avatar color="primary" size="30">
                                                <v-img :src="item.logo" v-if="item.logo != null"></v-img>
                                                <span class="white--text text-caption" v-else>{{ item | initials }}</span>
                                            </v-avatar>
                                            <span class="pl-2">
                                                {{ item.full_name }}
                                            </span>
                                        </v-flex>
                                    </template>
                                </v-autocomplete>
                            </ValidationProvider>
                        </v-flex>

                        <v-flex xs12>
                            <ValidationProvider
                                slim
                                :name="this.$t('global.subscription')"
                                rules="required"
                                v-slot="{ errors }"
                            >
                                <p class="subtitle-2 font-weight-regular mb-2">
                                    {{ $t('global.subscription') }}
                                </p>
                                <v-autocomplete 
                                    clearable 
                                    :label="$t('subscription.selectSubscription')" 
                                    v-model="payload.plan_id" 
                                    :items="plans" 
                                    item-text="name" 
                                    item-value="id" 
                                    hide-details="auto" 
                                    solo
                                    :error-messages="errors"
                                >
                                    <template v-slot:item="{ item, on, attrs }">
                                        <v-list-item v-on="on" v-bind="attrs">
                                            <v-list-item-icon>
                                                <v-icon size="30">mdi-card-account-details-star</v-icon>
                                            </v-list-item-icon>

                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    {{ item.name }}
                                                </v-list-item-title>
                                                <v-list-item-subtitle>
                                                    {{ item.description }}
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </template>
                                    <template v-slot:selection="{ item }">
                                        <v-flex class="d-flex align-center">
                                            <v-icon>mdi-card-account-details-star</v-icon>
                                            <span class="pl-2">
                                                {{ item.name }}
                                            </span>
                                        </v-flex>
                                    </template>
                                </v-autocomplete>
                            </ValidationProvider>
                        </v-flex>

                        <v-flex xs12 v-if="payload.plan_id">
                            <ValidationProvider
                                slim
                                :name="this.$t('subscription.price')"
                                rules="required"
                                v-slot="{ errors }"
                            >
                                <p class="subtitle-2 font-weight-regular mb-2">
                                    {{ $t('subscription.price') }}
                                </p>
                                <v-autocomplete 
                                    clearable 
                                    :label="$t('subscription.selectPrice')" 
                                    :items="selectedPlan.prices" 
                                    item-text="name" 
                                    item-value="id" 
                                    v-model="payload.price_id" 
                                    hide-details="auto" 
                                    solo
                                    :error-messages="errors"
                                >
                                    <template v-slot:item="{ item, on, attrs }">
                                        <v-list-item v-on="on" v-bind="attrs">
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    {{ item | computePlanPrice }}
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </template>
                                    <template v-slot:selection="{ item }">
                                        {{ item | computePlanPrice }}
                                    </template>
                                </v-autocomplete>
                            </ValidationProvider>
                        </v-flex>

                        <v-flex xs6>
                            <v-btn block class="grey white--text mt-1" type="button" @click="$emit('closeDrawer')">
                                <v-icon left>mdi-close</v-icon>
                                {{ $t('global.cancel') }}
                            </v-btn>
                        </v-flex>

                        <v-flex xs6>
                            <v-btn block class="success mt-1" type="submit">
                                <v-icon left>mdi-content-save-outline</v-icon>
                                {{ payload.id ? this.$t('global.update') : this.$t('global.create') }}
                            </v-btn>
                        </v-flex>


                    </v-layout>
                </v-container>
            </v-form>
        </ValidationObserver>
    </v-navigation-drawer>
</template>

<script>
import priceHelper from "../../mixins/priceHelper.vue"
import textHelper from '~/mixins/textHelper.vue'
export default {
    mixins: [
        priceHelper,
        textHelper
    ],
    data() {
        return {
            payload: {
                client_id: null,
                coach_id: null,
                plan_id: null,
                price_id:1,
            },
            plans: [],
            clients: [],
            coaches: [],
            drawer:false,
            originalPayload: null,
        }
    },
    props: {
        drawerStatus: {
            type: Boolean,
            default: () => false,
        },

        selectedItem: {
            type:Object,
            default:() => {}
        }
    },

    mounted() {
        this.fetchPlans()
        this.fetchClients()
        this.fetchCoaches()
    },
    watch: {
        drawerStatus(val) {
            this.drawer = val;
        },
        drawer(val) {
            console.log(val)
            if (!val) {
                this.$emit("closeDrawer");
            }
        },
        "payload.plan_id": {
            handler(val) {
                let dataplan=this.plans.find(plan => plan.id === this.payload.plan_id);
                if(dataplan.prices.length!=0){
                    let dataprice = dataplan.prices
                    this.payload.price_id = dataprice[0].id;
                }
            },
        },
    },

    methods: {
        async saveForm () {
            this.$refs.form.validate().then((result) => {
                if (!result) return;
                this.$emit('addRecord', this.payload)
            });
        },

        async fetchClients() {
            const { data: response } = await this.$axios.get(`${this.$clients}?no-paginate=true`)
            this.clients = response.data
        },

        async fetchCoaches() {
            const { data: response } = await this.$axios.get(`${this.$coaches}?no-paginate=true`)
            this.coaches = response.data
        },

        async fetchPlans() {
            const { data: response } = await this.$axios.get(`${this.$plans}?relations=prices`)

            this.plans = response.data
        },

        filterClients: (item, queryText, itemText) => item.first_name.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1 || item.last_name.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1
    },

    computed: {
        selectedPlan() {
            return this.plans.find(plan =>  plan.id == this.payload.plan_id)
        }
    },
}
</script>