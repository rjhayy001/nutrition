import Vue from 'vue'
Vue.mixin({
  methods: {
    getIds(items) {
      return items.map((item) => {
        return item.id;
      })
      .join(",");
    },
    successNotification(items=[], action='', suffixSingular='', suffixPlural='', key='') {
      if (items.length > 1) {
        this.$awn.success(`Successfully ${action} <strong>${items.length}</strong> ${suffixPlural}`)
      } else {
        let selectedItem = items.constructor === Array ? items[0] : items
        this.$awn.success(`Successfully ${action} ${suffixSingular} <strong>${selectedItem[key]}</strong>.`)
      }
    },
    fullNotification(message) {
      this.$awn.success(`${message}`)
    },
    goTo(name, params={}) {
      this.$router.push({name:name, params:params})
    },
    cloneVariable(value) {
      if(typeof value != 'object') return
      return JSON.parse(JSON.stringify(value))
    },
    showPrice(price='') {
      if (!price) price = 0
      return `${price.toFixed(2)} €`
    }
  },
})
