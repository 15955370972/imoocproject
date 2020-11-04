import originJsonp from 'jsonp'
import { promisic } from './promisic'

function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}

export default async function jsonp(url, data, option) {
  url += (url.includes('?') ? '&' : '?') + param(data)

  const res = await promisic(originJsonp)(
    url,
    option
  )
  return res;
}
