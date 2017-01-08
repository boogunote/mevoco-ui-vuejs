// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'

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

const Foo = { template: '<div>foo</div>' }
import LoginPage from './pages/Login'

const routes = [
  { path: '/',
    component: App,
    children: [
      {
        path: 'login',
        component: LoginPage
      },
      {
        path: 'main',
        component: Foo
      }
    ]
  }
]

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

/* eslint-disable no-new */
new Vue({
  router
}).$mount('#app')
