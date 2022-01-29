<template>
  <v-list class="matches_list">
    <v-subheader>Matches:</v-subheader>
    <v-list-item
      v-for="item in list"
      :key="item.id"
      class="matches_item"
    >
      <v-list-item-avatar>
        <v-img
          :alt="`${item.firstName} avatar`"
          :src="item.picture"
        />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="item.firstName + item.lastName" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  props: {
    discoverList: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      shouldFetch: false,
      list: []
    }
  },
  mounted () {
    this.list = this.discoverList
    console.log('like', this.list)
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
