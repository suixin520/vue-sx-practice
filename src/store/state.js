import {playMode} from 'common/js/config'
import {loadSearch, loadPlay} from 'common/js/cache'

const state = {
  singer: {},

  playing: false, // 播放状态：播放/暂停
  fullScreen: false, // 伸展/收起
  playlist: [], // 当前播放列表
  sequencelist: [], // 歌曲顺序列表
  mode: playMode.sequence, // 播放模式：顺序/循环/随机
  currentIndex: -1, // 当前播放位置

  disc: {},
  topList: {},

  searchHistory: loadSearch(), // 搜索历史

  playHistory: loadPlay() // 播放历史
}

export default state
