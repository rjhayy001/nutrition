<template>
    <v-dialog max-width="500" v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" slot="activator" outlined block v-on="on" v-bind="attrs">
                {{ prices.length }}
                <v-icon right>
                    mdi-eye
                </v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="headline">Prix</v-card-title>
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <tbody>
                            <tr v-for="(price, index) in prices" :key="index">
                                <td>
                                    {{ price | computePlanPrice }}
                                </td>
                            </tr>
                        </tbody>

                    </template>
                </v-simple-table>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.native="dialog = false" outlined>
                    Fermer
                    <v-icon right>
                        mdi-close
                    </v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import priceHelperVue from "~/mixins/priceHelper.vue";
export default {
    mixins: [priceHelperVue],
    props: {
        prices: {
            type: Array,
            required: true,
            default: () => [],
        }
    },
    data() {
        return {
            dialog: false
        }
    },
    methods: {
        openDialog() {
            this.dialog = true
        }
    },
}
</script>