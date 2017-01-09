import Vue from 'vue'
import Vuex from 'vuex'
import db from './modules/db'
import pages from './modules/pages'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    db,
    pages
  },
  strict: true
})
