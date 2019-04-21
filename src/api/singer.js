import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
// import axios from 'axios'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    _: 'getUCGI791376245379837',
    format: 'jsonp'
  })

  return jsonp(url, data, options)
}

export function getSingerDetail(singerid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    format: 'jsonp',
    num: 80,
    ct: 24,
    singermid: singerid,
    order: 'listen',
    begin: 0
  })

  return jsonp(url, data, options)
}
