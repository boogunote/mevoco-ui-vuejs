import Vue from 'vue'
import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  vm: {}
}

// getters
const getters = {
}

// actions
const actions = {
  updateVmPageList ({ commit, state }, list) {
    commit(types.UPDATE_VM, list)
    let uuidList = []
    list.forEach((item) => {
      uuidList.push(item.uuid)
    })
    commit(types.UPDATE_VM_PAGE_LIST, uuidList)
  }
}

// mutations
const mutations = {
  [types.UPDATE_VM_PAGE_LIST] (state, uuidList) {
    Vue.set(state.vm, 'uuidList', uuidList)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
