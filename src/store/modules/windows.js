import Vue from 'vue'
import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
}

// getters
const getters = {
}

// actions
const actions = {
  createWindow ({ commit, state }, id) {
    commit(types.CREATE_WINDOW, id)
  },
  updateWindow ({ commit, state }, param, test) {
    commit(types.UPDATE_WINDOW, param)
  }
}

// mutations
const mutations = {
  [types.CREATE_WINDOW] (state, id) {
    Vue.set(state, id, {
      id: id,
      uuidList: []
    })
  },
  [types.UPDATE_WINDOW] (state, newState) {
    Vue.set(state, newState.id, {
      ...state[newState.id],
      ...newState
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
