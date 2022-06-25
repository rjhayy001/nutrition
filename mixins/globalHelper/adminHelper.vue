<script>
	export default {
    methods: {
      $isAdmin(){
        let coach = this.$auth.user

        return coach.is_admin == 1 ? true : false
      },
      $view(){
        return localStorage.getItem('view')
      }
    }
	};
</script>
