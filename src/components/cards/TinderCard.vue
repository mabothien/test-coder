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
              <component :is="item.tab" :tab="tab" :like-list="likeList" :matches="matches" />
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
      this.fetchMatchesList()
    ])
  },
  methods: {
    async fetchMatchesList () {
      // Call api from graplQL
      const { data } = await this.$axios.request({
        url: 'http://localhost:4000/user',
        method: 'POST',
        data: {
          query: `
          {
            matchesUser {
              id,
              firstName,
              lastName,
              picture
            }
          }	
         `
        }
      })
      this.matches = data.data.matchesUser
    },
    async fetchLikeList () {
      const { data } = await this.$axios.request({
        url: 'http://localhost:4000/user',
        method: 'POST',
        data: {
          query: `
          {
            likeUsers{
              id,
              firstName,
              lastName,
              picture
            }
          }	
          `
        }
      })
      this.likeList = data.data.likeUsers
    },
    onTab (tab) {
      this.tab = tab
      if (this.tab === 'TabLikeList') {
        this.fetchLikeList()
      } else if (this.tab === 'TabMatches') {
        this.fetchMatchesList()
      }
    }
  }
}
</script>
