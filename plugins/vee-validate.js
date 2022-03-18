import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email, integer, between, confirmed, min_value, max_value } from 'vee-validate/dist/rules';

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('min', {
  validate(value, args) {
    return value.length >= args.length;
  },
  params: ['length']
});

extend('max', {
  validate(value, args) {
    return value.length <= args.length;
  },
  params: ['length']
});

extend('email', email);
extend('required', required);
extend('confirmed', confirmed);
extend('min_value', min_value);
extend('max_value', max_value);