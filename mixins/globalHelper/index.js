import Vue from 'vue'
import dialogHelper from '@/mixins/globalHelper/dialogHelper.vue';
import adminHelper from '@/mixins/globalHelper/adminHelper.vue';
import dateHelper from '@/mixins/dateHelper.vue';

Vue.mixin(dialogHelper);
Vue.mixin(adminHelper);
Vue.mixin(dateHelper);

