import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    format: 'json'
  })

  return jsonp(url, data, options)
}

export function search(query, page, zhida) {
  const url = '/api/search'

  const data = Object.assign({}, commonParams, {
    format: 'json',
    w: query,
    zhidaqu: 1,
    catZhida: zhida,
    t: 0,
    flag: 1,
    id: 'utf-8',
    sem: 1,
    aggr: 0,
    n: 20,
    p: page,
    remoteplace: 'txt.mqq.all'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
