<script>
import { getMessaging, onMessage, getToken } from 'firebase/messaging'
import { messaging } from '@/plugins/firebase'
export default {
  methods: {
    async getDeviceToken () {
      const token = await getToken(messaging, {
        vapidKey: 'BHnXE_zRn1BnMmgFgsPf23A7jhYEde31WDcaSq8pQLbRw1mR_JbvDl9Dfb2v22YCtOKsddN0fwRSut-qWcayL7Q'
      })
      if (token) {
        console.log(token, 'tolkeeee')
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
