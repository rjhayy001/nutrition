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
    goTo(name, query={}) {
      this.$router.push({name:name, query:query})
    }
  },
})
