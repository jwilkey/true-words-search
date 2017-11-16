import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
  crossReferences: {}
}

export const getters = {
  crossReferences: state => state.crossReferences
}

export const actions = {
  setCrossReferences ({ commit }, crossReferences) {
    commit('SET_CROSS_REFERENCES', crossReferences)
  }
}

export const mutations = {
  SET_CROSS_REFERENCES (state, crossReferences) {
    state.crossReferences = crossReferences
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
