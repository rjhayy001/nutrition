<template>
  <div>
    <v-toolbar
      flat
      dense
    >
      <v-toolbar-title class="font-weight-medium">
        {{ $t('clients.lastFeedback7DaysAgo') }}
      </v-toolbar-title>
    </v-toolbar>
    <v-card
      style="overflow:auto"
      height="450"
      class="pa-3"
    >

      <v-data-table
        v-if="histories.length"
        :headers="headers"
        :items="histories"
        hide-default-footer
        hide-default-header
        :items-per-page="-1"
        class="elevation-1 stripe-table"
      >
        <template v-slot:item.logs="{ item }">
          <span :class="item.logger == 'Coach' ? 'font-weight-bold': ''">
            {{item.logger}}:
          </span>
          {{item.logs}}
        </template>
        <template v-slot:item.created_at="{ item }">
          {{formatDate(item.created_at)}}
        </template>
      </v-data-table>
      <empty-data v-else />
    </v-card>
  </div>

</template>
<script>
export default {
  props: ['histories'],
  data () {
    return {
      headers: [
        { text: 'Action', value: 'logs' },
        { text: 'Date', value: 'created_at' },
      ],
    }
  }
}
</script>
