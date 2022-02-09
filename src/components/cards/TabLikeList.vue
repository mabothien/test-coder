<template>
  <div class="image_list">
    <v-row>
      <v-col
        v-for="item in list"
        :key="item.id"
        class="d-flex child-flex"
        cols="6"
      >
        <v-img
          :src="item.picture"
          aspect-ratio="1"
          class="grey lighten-2"
        >
          <template>
            <div class="image_title">
              <span>{{ item.title }}. {{ item.firstName }} {{ item.lastName }}</span>
            </div>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    likeList: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      list: [],
    };
  },
  watch: {
    likeList(newValue) {
      this.list = newValue;
    },
  },
  mounted() {
    this.list = this.likeList;
  },
};
</script>
<style lang="scss">
.image_list {
  height: 550px;
  overflow: auto;
}
.image_title {
  display: block;
  width: 100%;
  background-color: #000;
  opacity: 0.5;
  padding: 10px;
  position: absolute;
  bottom: 0;
  span {
    color: #fff
  }
}
</style>
