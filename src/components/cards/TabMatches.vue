<template>
  <v-list class="matches_list">
    <v-subheader>Matches:</v-subheader>
    <v-list-item
      v-for="chat in previous"
      :key="chat.title"
      class="matches_item"
    >
      <v-list-item-avatar>
        <v-img
          :alt="`${chat.title} avatar`"
          :src="chat.avatar"
        />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="chat.title" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  data () {
    return {
      previous: [
        {
          title: 'Travis Howard',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'
        },
        {
          title: 'Travis Howard',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'
        },
        {
          title: 'Travis Howard',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.matches_list .matches_item:first-child {
  border-top: 1px solid #ddd;
}
.matches_list .matches_item {
  border-bottom: 1px solid #ddd;
}
</style>
