<template>
  <v-layout
    row
    wrap
  >
    <v-flex xs12>
      <v-list>
        <v-list-item-group active-class="violet--text">
          <template v-for="(item, index) in data">
            <v-list-item :key="item.id+'list'" @click="$emit('openDetails', item)">
              <template v-slot:default="{ active }">
                <v-list-item-avatar>
                  <v-img :src="imageUrl('clients', id, item.file_name)" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    class="text-capitalize"
                    v-text="item.title"
                  ></v-list-item-title>

                  <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action style="flex-direction: row;">
                  <div v-if="item.comment!=0" class="mr-4">
                    <v-icon
                    >
                      mdi-message-processing
                    </v-icon>
                  </div>
                </v-list-item-action>
              </template>
            </v-list-item>

            <v-divider
              v-if="index < items.length - 1"
              :key="index"
            ></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: ['data'],
  data () {
    return {
      id: 0,
      selected: [2],
      items: [
        {
          action: '15 min',
          headline: 'Brunch this weekend?',
          subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          title: 'Ali Connors',
        },
        {
          action: '2 hr',
          headline: 'Summer BBQ',
          subtitle: `Wish I could come, but I'm out of town this weekend.`,
          title: 'me, Scrott, Jennifer',
        },
        {
          action: '6 hr',
          headline: 'Oui oui',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
          title: 'Sandra Adams',
        },
        {
          action: '12 hr',
          headline: 'Birthday gift',
          subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
          title: 'Trevor Hansen',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          title: 'Britta Holt',
        },
      ],
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.id = this.$route.params.id
    }
  }
}
</script>

<style scoped>
.commented{
  position: absolute;
  border-top-left-radius: 17px;
  opacity: 0.8;
  display: inline-block;
  right: 0px;
  bottom: 0px;
  width: 30%;
  z-index: 3;
  padding-left: 10px;
  background: #1e1e1e;
}
</style>
