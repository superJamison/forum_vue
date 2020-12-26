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

Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(Vuex)
Vue.use(zPagenav);
Vue.use(VueSession)
Vue.use(VueCookies);
Vue.config.productionTip = false
Vue.use(VueIconFont)


const store = new Vuex.Store({
  state: {
    isLogin: false,
    username: '',
    userId: -1
  },
  mutations: {

  }
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
