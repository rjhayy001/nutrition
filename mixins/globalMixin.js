import Vue from 'vue'
Vue.mixin({
  methods: {
    getIds(items) {
      return items.map((item) => {
        return item.id;
      })
      .join(",");
    },
    successNotification(items=[], action='', suffixSingular='', suffixPlural='') {
      if (items.length > 1) {
        this.$awn.success(`Successfully ${action} <strong>${items.length}</strong> ${suffixPlural}`)
      } else {
        this.$awn.success(`Successfully ${action} ${suffixSingular} <strong>${items[0].first_name}</strong>.`)
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
