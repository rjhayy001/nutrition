<template>
  <fragment>

    <sub-sidebar :submenus="active_subscription ? submenus : unsubscribed"></sub-sidebar>
    <v-container>
      <Nuxt />
    </v-container>
  </fragment>
</template>
<script>
import { Fragment } from 'vue-frag'
import subSidebar from '~/components/layout/subSidebar.vue'
export default {
  components: { subSidebar, Fragment },
  data () {
    return {
      clients:{},
      active_subscription:{},
      submenus: [
        {
          title: 'Profile',
          icon: 'mdi-account-multiple-outline',
          to: 'client-id-profile',
          total_records: '5'
        },
        {
          title: 'Coaching',
          icon: 'mdi-heart-outline',
          to: 'client-id-subscription',
          showSubmenu: false,
          submenus: [
            {
              title: 'Global',
              to: 'client-id-coaching-global',
            },
            {
              title: 'Formulaire',
              to: 'client-id-coaching-formula-food',
            },
            {
              title: 'Measures',
              to: 'client-id-coaching-measure',
            },
            {
              title: 'Tracking',
              to: 'client-id-coaching-tracking',
            },
            {
              title: 'Photos',
              to: 'client-id-coaching-photos',
            },
            // {
            //   title: 'Objective',
            //   to: 'client-id-coaching-objective',
            // },
            {
              title: 'Feedback',
              to: 'client-id-coaching-feedback',
            },
          ]
        },
        {
          title: 'Chat',
          icon: 'mdi-chat-plus-outline',
          to: 'client-id-chat',
        },
        {
          title: 'Documents',
          icon: 'mdi-file-document-multiple-outline',
          to: 'client-id-document',
        },
        {
          title: 'Abonnement',
          icon: 'mdi-account-reactivate-outline',
          to: 'client-id-subscription',
        },
      ],
      unsubscribed: [
        {
          title: 'Profile',
          icon: 'mdi-account-multiple-outline',
          to: 'client-id-profile',
          total_records: '5'
        },
      ]
    }
  },
  created () {
    this.findRecord();
    // console.log(`${this.$clients}`);
    // console.log('test');
    // console.log(`${this.$route.params.id}`);
  },
  methods: {
    findRecord () {
      this.$axios
        .get(
          `${this.$clients}/${this.$route.params.id}/edit?relations=country,city,zipcode,taggable,groupable`
        )
        .then(({ data }) => {
          console.log(data, 'test')
          this.clients = data
          this.active_subscription = data.active_subscription ? data.active_subscription[0] : {}
        });
    },
  }
}
</script>
