<template>
  <transition name="slide">
    <music-list :rank="rank" :songs="songlist" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import MusicList from '../music-list'
import {mapGetters} from 'vuex'
import {getMusicList} from 'api/rank'
import {SUCCESS} from 'api/config'
import {createSong} from 'common/js/song'
export default {
  data() {
    return {
      songlist: [],
      rank: true
    }
  },
  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      if (this.songlist.length) {
        return this.songlist[0].image
      } else {
        return this.topList.picUrl
      }
    },
    ...mapGetters([
      'topList'
    ])
  },
  created() {
    this._getMusicList()
  },
  methods: {
    _getMusicList() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.topList.id).then((res) => {
        if (res.code === SUCCESS) {
          const list = res.songlist
          list.forEach((item) => {
            if (item.data.songid && item.data.albumid) {
              this.songlist.push(createSong(item.data))
            }
          })
        }
      })
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="scss" scoped>
.slide-enter-active, .slide-leace-active {
  transition: all 0.3s ease
}
.slide-enter, .slide-leace-to {
  transform: translate3d(100%, 0, 0)
}
</style>
