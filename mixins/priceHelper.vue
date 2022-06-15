<script>
export default {
  filters: {
    computePlanPrice (price) {
      console.log(price, 'test')
      if (!price.price) price.price = 0;
      let newPrice = `${parseFloat(price.price).toFixed(2)} €`;

      const suffixes = ["jour", "semaine", "mois", "3 mois", "6 mois", "année"];
      const types = ["jour", "semaine", "mois"];
      let suffix = "";

      if (price.is_recurring) suffix += "chaque ";

      if (price.billing_period == 7) suffix += `${price.recycle_count} ${types[price.recycle_type - 1]}${price.recycle_count > 1 ? 's' : ''}`;
      else if (price.billing_period) suffix += suffixes[price.billing_period - 1];

      return `${newPrice} / ${suffix}` ?? '..';
    },

  },
  methods:{
    computePlanPrice2 (price) {
      console.log(price, 'test')
      if (!price.price) price.price = 0;
      let newPrice = `${parseFloat(price.price).toFixed(2)} €`;

      const suffixes = ["jour", "semaine", "mois", "3 mois", "6 mois", "année"];
      const types = ["jour", "semaine", "mois"];
      let suffix = "";

      if (price.is_recurring) suffix += "chaque ";

      if (price.billing_period == 7) suffix += `${price.recycle_count} ${types[price.recycle_type - 1]}${price.recycle_count > 1 ? 's' : ''}`;
      else if (price.billing_period) suffix += suffixes[price.billing_period - 1];

      return `${newPrice} / ${suffix}` ?? '..';
    },
  }
}
</script>
