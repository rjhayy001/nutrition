<script>
	export default {
		data: vm => ({
			deleteDetails: {
				message:'',
				title:'',
			},
			createDetails: {
				message:'',
				title:'',
			},
			updateDetails: {
				message:'',
				title:'',
			},
		}),
		methods: {
			delete(id = 0){
				return new Promise((resolve, reject) => {
					 this.$root.dialog(this.$t('popups.title.delete'), this.$t('popups.message.delete'), 'delete', {})
					 .then((result) => {
						 if(result) {
							resolve(result);
						 }
					 }).catch(error => {
						 reject(error);
					 })
				})
			},
			create(doEdit = false){
				return new Promise((resolve, reject) => {
					this.$root.dialog(this.$t('popups.title.confirm'), this.$t('popups.message.create'), 'add', {})
					.then((result) => {
						if (result) {
							resolve(result)
						} 
					}).catch(error => {
						reject(error);
					})
				})
			},
			update(){
				return new Promise((resolve, reject) => {
					this.$root.dialog(this.$t('popups.title.confirm'), this.$t('popups.message.update'), 'edit', {})
					.then((result) => {
						if (result) {
							// this.$store.commit('SHOW_LOADER')
							// this.$store.commit('SET_LOGO_LOADER', true)
							resolve(result)
						}
					}).catch(error => {
						// this.$store.commit('HIDE_LOADER')
						reject(error);
					})
				})
			},
		}
	};
</script>