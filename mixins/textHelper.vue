<script>
export default {
    filters: {

        // User filters
        initials: item => item.first_name ? item.first_name.charAt(0): '' + item.last_name ?  item.last_name.charAt(0) : '',
        fullname: item => `${item.first_name} ${item.last_name}`,

        // text filters
        truncate: (value, length) => value.length > length ? value.substring(0, length) + '...' : value,

    }
}
</script>
