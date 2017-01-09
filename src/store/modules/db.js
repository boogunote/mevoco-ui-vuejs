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
  // checkout ({ commit, state }, products) {
  //   const savedCartItems = [...state.added]
  //   commit(types.CHECKOUT_REQUEST)
  //   shop.buyProducts(
  //     products,
  //     () => commit(types.CHECKOUT_SUCCESS),
  //     () => commit(types.CHECKOUT_FAILURE, { savedCartItems })
  //   )
  // }
}

// mutations
const mutations = {
  [types.UPDATE_VM] (state, list) {
    list.forEach((item) => {
      state.vm[item.uuid] = item
    })
    // state.added = savedCartItems
    // state.checkoutStatus = 'failed'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
