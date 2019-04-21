import {getSongsUrl} from 'api/song'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `http://dl.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=66`
    url: `http://dl.stream.qqmusic.qq.com/C400003xl9d83fVzUJ.m4a?guid=${musicData.songid}&vkey=612848CA7993E11C6AFA8ED5D0B7C919FD97CB8415D521EE42C7EA6220A55E45C7DA9EF45BCBBDCE315913BC444E985F622FEB6A9215796A&uin=0&fromtag=66`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((i) => {
    ret.push(i.name)
  })
  return ret.join('/')
}

export function isValidMusic(musicData) {
  return musicData.songid && musicData.albummid && (!musicData.pay || musicData.pay.payalbumprice === 0)
}

export function processSongsUrl(songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }
  return getSongsUrl(songs).then((purlMap) => {
    songs = songs.filter((song) => {
      const purl = purlMap[song.mid]
      if (purl) {
        song.url = purl.indexOf('http') === -1 ? `http://dl.stream.qqmusic.qq.com/${purl}` : purl
        return true
      }
      return false
    })
    return songs
  })
}
