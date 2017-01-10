import Vue from 'vue'
import Vuex from 'vuex'
import db from './modules/db'
import windows from './modules/windows'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    db,
    windows
  },
  strict: true
})
