<script>
import { getMessaging, onMessage, getToken } from 'firebase/messaging'
import { messaging } from '@/plugins/firebase'
export default {
  methods: {
    async getDeviceToken () {
      const token = await getToken(messaging, {
        vapidKey: 'BA05bzDvT5zoKxBTRXgMFAwa9W5dilZDmYIlQJ2_s6o35MF58cNhbWMN9gItetw909xLK8uhhZHMsUwqMqslRFE'
      })
      if (token) {
       this.saveCoachToken(token)
      }
    },
    activateNotification(){
      const messaging = getMessaging()
      onMessage(messaging, (payload) => {
        console.log(payload)
        this.initialize()
        // this.saveCoachNotification(payload)
      })
    },
    saveCoachToken(token){
      let payload = {
        coach_id : this.$auth.user.id,
        token: token
      }
      this.$axios.post(`set-token`, payload).then(({data}) => {
        console.log(data)
      })
    },
    saveCoachNotification(data){
       let payload = {
        coach_id : this.$auth.user.id,
        data: data.data
      }
       this.$axios.post(`${this.$coaches}/add-notification`, payload).then(({data}) => {
        console.log(data, 'nots')
        this.initialize()
      })
    }
  }
}
</script>
