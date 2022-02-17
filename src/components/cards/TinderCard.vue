<template>
  <v-container class="tinder_app">
    <v-row no-gutters class="justify-center">
      <v-col cols="6">
        <v-card class="tinder_card_container" outlined tile>
          <div class="tinder_content tinder_card_wrapper">
            <TabLikeList v-if="tab === 0" :like-list="likeList" />
            <TabDiscover v-else-if="tab === 1" :random-user="randomUser" @reload="reloadDiscover()" />
            <TabMatches v-if="tab === 2" :matches="matches" />
          </div>
          <v-tabs v-model="tab" class="tinder_tabs" fixed-tabs>
            <v-tab
              v-for="item in items"
              :key="item.tab"
              class="tinder_tab"
              @click="onTab(item.tab)"
            >
              <v-icon :color="item.tabIconColor">
                {{ item.tabIcon }}
              </v-icon>
              {{ item.tabName }}
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
      randomUser: [],
      tab: 1,
      items: [
        {
          tab: 'TabLikeList',
          tabName: 'Liked',
          tabIconColor: 'red',
          tabIcon: 'mdi-emoticon-kiss-outline',
          content: 'Tab 1 Content'
        },
        {
          tab: 'TabDiscover',
          tabName: 'Discover',
          tabIconColor: 'green',
          tabIcon: 'mdi-heart',
          content: 'Tab 2 Content'
        },
        {
          tab: 'TabMatches',
          tabName: 'Matches',
          tabIconColor: 'blue',
          tabIcon: 'mdi-wechat',
          content: 'Tab 3 Content'
        }
      ]
    }
  },
  async fetch () {
    await this.fetchDiscover()
  },
  methods: {
    async reloadDiscover () {
      await this.fetchDiscover()
    },
    // Call api from graplQL
    async fetchMatchesList () {
      this.likeList = []
      this.randomUser = []
      try {
        const { data } = await this.$axios.request({
          url: 'http://localhost:4000/user',
          method: 'POST',
          data: {
            query: `
          {
            matchesUser {
              title,
              firstName,
              lastName,
              picture
            }
          }
         `
          }
        })
        this.matches = data.data.matchesUser
      } catch (error) {
        console.log(error)
      }
    },

    async fetchDiscover () {
      this.matches = []
      this.likeList = []
      try {
        const { data } = await this.$axios.request({
          url: 'http://localhost:4000/user',
          method: 'POST',
          data: {
            query: ` 
          {
            randomUser {
              id,
              title,
              firstName,
              lastName,
              picture,
              isMatch,
              isPass
            }
          }
         `
          }
        })
        this.randomUser = data.data.randomUser
      } catch (error) {
        console.log(error)
      }
    },

    async fetchLikeList () {
      this.randomUser = []
      this.matches = []
      try {
        const { data } = await this.$axios.request({
          url: 'http://localhost:4000/user',
          method: 'POST',

          data: {
            query: `
          {
            likeUsers{
              title,
              firstName,
              lastName,
              picture
            }
          }
          `
          }
        })
        this.likeList = data.data.likeUsers
      } catch (error) {
        console.log(error)
      }
    },
    onTab (tab) {
      const index = this.items.findIndex(i => i.tab === tab)
      this.tab = index
      if (this.tab === 0) {
        this.fetchLikeList()
      } else if (this.tab === 2) {
        this.fetchMatchesList()
      } else {
        this.fetchDiscover()
      }
    }
  }
}
</script>
<style lang="scss">
.tinder_card_container .tinder_content {
  height: 500px;
  flex: 0 1 auto;
  position: relative;
  max-width: 100%;
  overflow: hidden;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.tinder_card_container .tab-item-wrapper .v-card {
  box-shadow: none !important;
}
.tinder_content {
  height: 500px;
}
.tinder_tabs {
  border-top: thin solid rgba(0, 0, 0, 0.12);
}
</style>
