// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import 'es6-promise/auto'
import store from './store'
import { sync } from 'vuex-router-sync'
import 'src/styles.css'

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
    redirect: '/main',
    component: App,
    children: [
      {
        path: 'login',
        component: LoginPage
      },
      {
        path: 'main',
        component: MainPage,
        redirect: '/main/vm',
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
  },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes
})

sync(store, router) // done.

// veux logger
// store.subscribe((mutation, state) => {
//   console.log(mutation.type)
//   console.log(mutation.payload)
// })

/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')
