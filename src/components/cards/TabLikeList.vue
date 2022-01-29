<template>
  <div class="image_list">
    <v-row>
      <v-col
        v-for="n in 14"
        :key="n"
        class="d-flex child-flex"
        cols="6"
      >
        <v-img
          :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
          aspect-ratio="1"
          class="grey lighten-2"
        >
          <template>
            <div class="image_title">
              <span>Jame</span>
            </div>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.image_list {
  height: 550px;
  overflow: auto;
}
.image_title {
  position: absolute;
  bottom: 5px;
  span {
    color: #fff
  }
}
</style>
