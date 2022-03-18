import Vue from "vue"
import VueAWN from "vue-awesome-notifications"
let options = {
  labels: {
    success:'Success!',
    warning:'Warning!',
    alert:'Failed!',
  },
  position:'top-right',
  durations: {
    global: 2000
  }
}

Vue.use(VueAWN, options)