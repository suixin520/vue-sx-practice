<template>
  <div class="singer">
    歌手页面
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
export default {
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";
.singer {
  position: fixex;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
