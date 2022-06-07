<template>
    <v-navigation-drawer temporary right fixed v-model="drawerStatus" width="50%">
        <p class="pa-2 title font-weight-regular text-uppercase d-flex justify-space-between">
            {{ !payload.id ? "Ajouter" : "Modifier" }} un abonnement
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
                            <p class="subtitle-2 font-weight-regular mb-2">
                                Client
                            </p>
                            <v-autocomplete clearable label="Selectionner un client" :items="clients" item-value="id" v-model="payload.client_id" :filter="filterClients" hide-details="auto" solo>
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
                        </v-flex>

                        <v-flex xs12>
                            <p class="subtitle-2 font-weight-regular mb-2">
                                Abonnement
                            </p>
                            <v-autocomplete clearable label="Selectionner un abonnement" v-model="payload.plan_id" :items="plans" item-text="name" item-value="id" hide-details="auto" solo>
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
                        </v-flex>

                        <v-flex xs12 v-if="payload.plan_id">
                            <p class="subtitle-2 font-weight-regular mb-2">
                                Prix
                            </p>
                            <v-autocomplete clearable label="Selectionner un prix" :items="selectedPlan.prices" item-text="name" item-value="id" v-model="payload.price_id" hide-details="auto" solo>
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
                        </v-flex>

                        <v-flex xs6>
                            <v-btn block class="grey white--text mt-1" type="button" @click="$emit('closeDrawer')">
                                <v-icon left>mdi-close</v-icon>
                                ANNULER
                            </v-btn>
                        </v-flex>

                        <v-flex xs6>
                            <v-btn block class="success mt-1" type="submit">
                                <v-icon left>mdi-content-save-outline</v-icon>
                                {{ payload.id ? "SAUVEGARDER" : "CRÉER" }}
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
    props: {
        drawerStatus: {
            type: Boolean,
            required: true,
            default: false
        },
        selectedItem: {
            required: false,
            default: null
        }
    },
    data: () => ({
        payload: {
            client_id: null,
            plan_id: null,
            price_id: null,
        },
        plans: [],
        clients: [],
    }),

    mounted() {
        this.fetchPlans()
        this.fetchClients()
    },

    methods: {
        
        async saveForm (data) {
            console.log(this.payload)
            const response = await this.$axios.post(`${this.$subscriptions}`, this.payload)
            console.log(response)
        },

        async fetchClients() {
            const { data: response } = await this.$axios.get(`${this.$clients}`)
            this.clients = response.data
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