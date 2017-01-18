import Vue from 'vue'
import Vuex from 'vuex'
import db from './modules/db'
import windowManager from './modules/windowManager'
import dialogManager from './modules/dialogManager'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    db,
    windowManager,
    dialogManager
  },
  strict: true
})
