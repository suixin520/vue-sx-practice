import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getRankList() {
  const url = '/api/getRankList'

  const data = Object.assign({}, commonParams, {
    '_': 1558964731570,
    'format': 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    topid,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })

  return jsonp(url, data, options)
}
