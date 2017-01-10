import Vue from 'vue'
import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  vm: {},
  instanceOffering: {}
}

// getters
const getters = {
}

// actions
const actions = {
  updateDbRow ({ commit, state }, param) {
    commit(types.UPDATE_DB_ROW, param)
  },
  updateDbTable ({ commit, state }, param) {
    commit(types.UPDATE_DB_TABLE, param)
  },
  updateInstanceOffering ({ commit, state }, list) {
    commit(types.UPDATE_INSTANCE_OFFERING, list)
  }
}

// mutations
const mutations = {
  [types.UPDATE_DB_ROW] (state, { tableName, id, data }) {
    if (!state[tableName][id]) state[tableName][id] = {}
    Vue.set(state[tableName], id, {...state[tableName][id], ...data})
  },
  [types.UPDATE_DB_TABLE] (state, { tableName, list }) {
    if (!state[tableName]) state[tableName] = {}
    let newTable = {}
    list.forEach((item) => {
      newTable[item.uuid] = item
    })
    Vue.set(state, tableName, { ...state[tableName], ...newTable })
  },
  [types.UPDATE_VM] (state, list) {
    list.forEach((item) => {
      state.vm[item.uuid] = item
    })
  },
  [types.UPDATE_INSTANCE_OFFERING] (state, list) {
    list.forEach((item) => {
      state.instanceOffering[item.uuid] = item
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
