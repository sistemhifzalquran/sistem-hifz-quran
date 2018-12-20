import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    groupList:[{name:"2018"},{name:"form 1 2018"},{name:"2017"},{name:"2019"}],
    currentGroup: '2018',

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
