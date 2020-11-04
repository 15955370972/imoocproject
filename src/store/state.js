import { playMode } from 'common/js/config'

const state = {
  singer: {},//歌手列表
  playing: false,//是否播放
  fullScreen: false,//是否全屏
  playList: [],//播放列表
  sequenceList: [],//顺序列表
  mode: playMode.sequence,//播放模式
  currentIndex: -1//当前播放索引
}

export default state
