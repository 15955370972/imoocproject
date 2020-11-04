import { commonParams } from './config'
import { getUid } from 'common/js/uid'
import axios from 'axios'
import { ERR_OK } from 'api/config'

const debug = process.env.NODE_ENV !== 'production'

export async function getLyric (mid) {
  const url = debug ? '/api/lyric' : 'http://ustbhuangyi.com/music/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })
  const res = await axios.get(url, {
    params: data
  })
  return res.data
}

export async function getSongsUrl (songs) {
  const url = debug ? '/api/getPurlUrl' : 'http://ustbhuangyi.com/music/api/getPurlUrl'

  let mids = []
  let types = []

  songs.forEach((song) => {
    mids.push(song.mid)
    types.push(0)
  })

  const urlMid = genUrlMid(mids, types)

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })

  let tryTime = 3

  async function request () {
    const response = await axios.post(url, {
      comm: data,
      req_0: urlMid
    })
    const res = response.data
    if (res.code === ERR_OK) {
      let urlMid = res.req_0
      if (urlMid && urlMid.code === ERR_OK) {
        const purlMap = {}
        urlMid.data.midurlinfo.forEach((item) => {
          if (item.purl) {
            purlMap[item.songmid] = item.purl
          }
        })
        if (Object.keys(purlMap).length > 0) {
          return purlMap
        } else {
          retry()
        }
      } else {
        retry()
      }
    } else {
      retry()
    }
  }

  async function retry () {
    if (--tryTime >= 0) {
      return await request()
    } else {
      throw new Error('Can not get the songs url')
    }
  }

  return request()
}

function genUrlMid (mids, types) {
  const guid = getUid()
  return {
    module: 'vkey.GetVkeyServer',
    method: 'CgiGetVkey',
    param: {
      guid,
      songmid: mids,
      songtype: types,
      uin: '0',
      loginflag: 0,
      platform: '23'
    }
  }
}
