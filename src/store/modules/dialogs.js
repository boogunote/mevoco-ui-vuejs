import Vue from 'vue'
import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  windowIdList: [],
  windows: {}
}

// getters
const getters = {
}

// actions
const actions = {
  openDialog ({ commit, state }, param) {
    commit(types.OPEN_DIALOG, param)
  },
  updateDialog ({ commit, state }, param) {
    commit(types.UPDATE_DIALOG, param)
  },
  closeDialog ({ commit, state }, id) {
    commit(types.CLOSE_DIALOG, id)
  }
}

// mutations
const mutations = {
  [types.OPEN_DIALOG] (state, param) {
    Vue.set(state.windows, param.id, param)
    state.windowIdList.push(param.id)
  },
  [types.UPDATE_DIALOG] (state, newState) {
    Object.keys(newState).forEach(function (propName) {
      if (propName !== 'id') Vue.set(state.widnows[newState.id], propName, newState[propName])
    })
    // Vue.set(state, newState.id, {
    //   ...state[newState.id],
    //   ...newState
    // })
  },
  [types.CLOSE_DIALOG] (state, id) {
    // Vue.set(state, id, undefined)
    state.windowIdList = state.windowIdList.filter((uuid) => uuid !== id)
    delete state.windows[id]
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
