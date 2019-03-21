import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    _: 1553181898843,
    format: jsonp
  })

  return jsonp(url, data, options)
}
