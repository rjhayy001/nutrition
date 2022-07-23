import Vue from 'vue'
import dialogHelper from '@/mixins/globalHelper/dialogHelper.vue';
import adminHelper from '@/mixins/globalHelper/adminHelper.vue';
import dateHelper from '@/mixins/dateHelper.vue';
import arrayHelper from '@/mixins/arrayHelper.vue';
import firebaseHelper from '@/mixins/firebaseHelper.vue';
import './components.js'

Vue.mixin(dialogHelper);
Vue.mixin(adminHelper);
Vue.mixin(dateHelper);
Vue.mixin(firebaseHelper);
Vue.mixin(arrayHelper);

