<script>
export default {
  methods: {
    $arraysplicer (item, array_given) {
      array_given.splice(array_given.indexOf(item), 1);
    },
    $arrayupdater (item, array_given) {
      array_given.unshift(item);
    },
    $isIncluded(item,array_given){
      return array_given.includes(item)
    }
  }
}
</script>
