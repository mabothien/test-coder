<template>
  <v-container class="tinder_app">
    <v-row no-gutters class="justify-center">
      <v-col
        cols="6"
      >
        <v-card
          outlined
          tile
        >
          <v-tabs-items v-model="tab" class="tinder_content">
            <v-tab-item
              v-for="item in items"
              :key="item.tab"
            >
              <component :is="item.tab" :tab="tab" :like-list="likeList" :discover-list="discoverList" :matches="matches" />
            </v-tab-item>
          </v-tabs-items>
          <v-tabs
            v-model="tab"
            grow
          >
            <v-tab
              v-for="item in items"
              :key="item.tab"
              class="tinder_tab"
              @click="onTab(item.tab)"
            >
              <v-icon :color="item.tabIconColor">
                {{ item.tabIcon }}
              </v-icon> {{ item.tabName }}
            </v-tab>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      likeList: [],
      discoverList: [],
      matches: [],
      tab: null,
      items: [
        { tab: 'TabLikeList', tabName: 'Liked', tabIconColor: 'red', tabIcon: 'mdi-emoticon-kiss-outline', content: 'Tab 1 Content' },
        { tab: 'TabDiscover', tabName: 'Discover', tabIconColor: 'green', tabIcon: 'mdi-heart', content: 'Tab 2 Content' },
        { tab: 'TabMatches', tabName: 'Matches', tabIconColor: 'blue', tabIcon: 'mdi-wechat', content: 'Tab 3 Content' }
      ]
    }
  },
  async fetch () {
    await Promise.all([
      this.fetchLikeList(),
      this.fetchDiscoverList()
    ])
  },
  methods: {
    async fetchDiscoverList () {
      const { data } = await this.$axios.request({
        url: 'https://dummyapi.io/data/v1/user?limit=5',
        headers: {
          'app-id': '61f4c60dfc618fc84a5362a3'
        }
      })
      this.discoverList = data.data
    },
    async fetchLikeList () {
      const { data } = await this.$axios.request({
        url: 'https://dummyapi.io/data/v1/user?limit=10',
        headers: {
          'app-id': '61f4c60dfc618fc84a5362a3'
        }
      })
      this.likeList = data.data
    },
    async fetchMatches () {
      const { data } = await this.$axios.request({
        url: 'https://dummyapi.io/data/v1/user?limit=10',
        headers: {
          'app-id': '61f4c60dfc618fc84a5362a3'
        }
      })
      this.matches = data.data
    },
    onTab (tab) {
      this.tab = tab
      if (this.tab === 'TabLikeList') {
        this.fetchLikeList()
      } else if (this.tab === 'TabMatches') {
        this.fetchDiscoverList()
      } else {
        this.fetchMatches()
      }
    }
  }
}
</script>
