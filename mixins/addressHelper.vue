<script>
export default {
  methods: {
    getCompleteAddress(item) {
      let zipcode = item.zipcode ? item.zipcode.code : "";
      let city = item.city ? item.city.name : "";
      let country = item.country ? item.country.short_name : "";
      let complete_address = "";

      // address
      if (item.address_1 && item.address_2) complete_address += `${item.address_1} / ${item.address_2} `
      else if (item.address_1) complete_address += `${item.address_1} `
      else if (item.address_2) complete_address += `${item.address_2} `

      if(city) complete_address += `${city} `
      if(zipcode) complete_address += `${zipcode} `
      if(country) complete_address += `${country} `

      return complete_address
    },
  }
}
</script>