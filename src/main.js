// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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
        path: 'foo',
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
