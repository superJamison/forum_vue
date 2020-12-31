// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import ElementUI from 'element-ui';
import axios from 'axios';
import VueAxios from "vue-axios";
import zPagenav from "vue-pagenav";
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueSession from 'vue-session'
import VueCookies from 'vue-cookies'
import VueIconFont from 'vue-icon-font'
import './assets/iconfont/iconfont.js';
import EleForm from 'vue-ele-form'
import EleFormMarkdownEditor from 'vue-ele-form-markdown-editor'
import highlight from 'highlight.js';




Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(Vuex)
Vue.use(zPagenav);
Vue.use(VueSession)
Vue.use(VueCookies);
Vue.config.productionTip = false
Vue.use(VueIconFont)
Vue.use(highlight);
// 注册 vue-ele-form
Vue.use(EleForm, {
  // 可以为编辑器配置全局属性, 每个实例都共享这个属性
  'markdown-editor': {
    // 比如设置上传 action 后, 所有的 markdown-editor 编辑器上传图片都会采用这个属性
    //action: 'https://xxx.com/upload/images'
  }
})

// 注册 markdown 组件
Vue.component('markdown-editor', EleFormMarkdownEditor)

//封装成一个指令
Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    highlight.highlightBlock(block)
  })
})


const store = new Vuex.Store({
  state: {
    isLogin: false,
    username: '',
    userId: -1,
    searchContent: "",
  },
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  axios,
  components: { App },
  template: '<App/>'
})
