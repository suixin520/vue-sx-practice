<template>
  <div class="rank" ref="rank">
    <scroll :data="topList" class="toplist" ref="topList">
      <ul>
        <li @click="selectItem(list)" class="item" v-for="(list, i) in topList" :key="i">
          <div class="icon">
            <img width="100" height="100" v-lazy="list.picUrl">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, j) in list.songList" :key="j">
              <span>{{j + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <div class="loading-container" v-show="!topList">
      <loading></loading>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {getRankList} from 'api/rank'
import {SUCCESS} from 'api/config'
import Scroll from 'base/scroll'
import Loading from 'base/loading'
import {playlistMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'

export default {
  mixins: [playlistMixin],
  data() {
    return {
      topList: []
    }
  },
  created() {
    this._getRankList()
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length ? '60px' : ''
      this.$refs.rank.style.bottom = bottom
      this.$refs.topList.refresh()
    },
    selectItem(list) {
      this.$router.push({
        path: `rank/${list.id}`
      })
      this.setTopList(list)
    },
    _getRankList() {
      getRankList().then((res) => {
        if (res.code === SUCCESS) {
          this.topList = res.data.topList
        }
      })
    },
    ...mapMutations({
      setTopList: 'SET_TOPLIST'
    })
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";
@import "~common/scss/mixin";

  .rank {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .toplist {
      height: 100%;
      overflow: hidden;
      .item {
        display: flex;
        margin: 0 20px;
        padding-top: 20px;
        height: 100px;
        &:last-child {
          padding-bottom: 20px;
        }
        .icon {
          flex: 0 0 100px;
          width: 100px;
          height: 100px;
        }
        .songlist {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 20px;
          height: 100px;
          overflow: hidden;
          background: $color-highlight-background;
          color: $color-text-d;
          font-size: $font-size-small;
          .song {
            @include no-wrap();
            line-height: 26px;
          }
        }
      }
      .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
