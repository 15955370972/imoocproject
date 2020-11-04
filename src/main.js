import Vue from 'vue'
import 'babel-polyfill'//对es6的api做转义
//babel-runtime:会对es6的语法转义

import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
//解决移动端点击事件的300ms延迟问题
fastclick.attach(document.body)

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

import 'common/stylus/index.styl'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
