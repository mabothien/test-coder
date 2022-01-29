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
        <v-tabs-items class="tinder_content" v-model="tab">
          <v-tab-item
            v-for="item in items"
            :key="item.tab"
          >
            <template>
              <component :is="item.tab" />
            </template>
          </v-tab-item>
        </v-tabs-items>
           <v-tabs
            v-model="tab"
            grow
          >
            <v-tab
              class="tinder_tab"
              v-for="item in items"
              :key="item.tab"
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
      tab: null,
      items: [
        { tab: 'TabLikeList', tabName: 'Liked', tabIconColor:"red", tabIcon: 'mdi-heart', content: 'Tab 1 Content' },
        { tab: 'TabDiscover', tabName: 'Discover', tabIconColor:"green", tabIcon: 'mdi-emoticon-kiss-outline', content: 'Tab 2 Content' },
        { tab: 'TabMatches', tabName: 'Matches', tabIconColor:"blue", tabIcon: 'mdi-wechat', content: 'Tab 3 Content' }
      ]
    }
  }
}
</script>
