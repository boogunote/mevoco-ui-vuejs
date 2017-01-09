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
  updateInstanceOffering ({ commit, state }, list) {
    commit(types.UPDATE_INSTANCE_OFFERING, list)
  }
}

// mutations
const mutations = {
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
