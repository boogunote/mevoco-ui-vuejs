// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import store from './store'
import { sync } from 'vuex-router-sync'

import en from 'src/i18n/en'
import zhCN from 'src/i18n/zh-CN'

var locales = {
  'en': en,
  'zh-CN': zhCN
}

Vue.use(VueRouter)
Vue.use(VueI18n)
// set lang
Vue.config.lang = 'zh-CN'

// set locales
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})
import App from './App'
import LoginPage from './pages/Login'
import MainPage from './pages/Main'
import VmInstancePage from './pages/VmInstance'
import HostPage from './pages/Host'

const routes = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: 'login',
        component: LoginPage
      },
      {
        path: 'main',
        component: MainPage,
        children: [
          {
            path: 'vm',
            component: VmInstancePage
          },
          {
            path: 'host',
            component: HostPage
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

sync(store, router) // done.

/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')
