<template>
  <div class="singer-detail">
    hello
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {SUCCESS} from 'api/config'
import {createSong, isValidMusic, processSongsUrl} from 'common/js/song'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    this._getDetail()
    console.log(this.singer)
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === SUCCESS) {
          processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
            this.songs = songs
            console.log(this.songs)
          })
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        if (isValidMusic(musicData)) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
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
