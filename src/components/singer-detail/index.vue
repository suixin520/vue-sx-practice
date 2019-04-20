<template>
  <div class="singer-detail">
    hello
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    console.log(this.singer)
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";
.singer-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: #fff;
  background: $color-background;
}
</style>
