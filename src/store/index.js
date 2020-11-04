import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
//有损性能，不建议线上模式使用

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,//不是有mutation函数引起的状态变化都会抛出错误
  plugins: debug ? [createLogger()] : []//控制台中打印出vuex前后数据状态变化
})
