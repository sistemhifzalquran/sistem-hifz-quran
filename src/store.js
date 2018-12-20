import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    currentGroup: 'kamil',

  },
  mutations: {
    setCurrentGroup: (state, payload) => {
      state.currentGroup = payload;
    }
  },
  actions: {
    setCurrentGroup: (context, payload) => {
      context.commit('setCurrentGroup', payload)
    }
  }
})
