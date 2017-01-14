import Vue from 'vue'
import Vuex from 'vuex'
import db from './modules/db'
import windows from './modules/windows'
import dialogs from './modules/dialogs'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    db,
    windows,
    dialogs
  },
  strict: true
})
