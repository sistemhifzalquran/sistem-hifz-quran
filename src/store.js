import Vue from 'vue'
import Vuex from 'vuex'
const fb = require("@/firebaseConfig.js");

Vue.use(Vuex)
function initialState() {
  return {
    groupList: [],
    currentGroup: '',
    currentUser: null,
    userProfile: {}
  }
}
export default new Vuex.Store({
  state: initialState,
  mutations: {
    setCurrentGroup: (state, payload) => {
      state.currentGroup = payload;
      fb.db
        .collection("setting")
        .doc("default")
        .update({ defaultGroup: payload })
    },
    fetchCurrentGroup: (state) => {
      fb.db.collection('setting')
        .doc('default')
        .get()
        .then(function (doc) {
          state.currentGroup = doc.data().defaultGroup;
        })
        .catch(err => {
          console.log(err);
        });
    },
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    resetState(state) {
      // acquire initial state
      const s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    }
  },
  actions: {
    setCurrentGroup: (context, payload) => {
      context.commit('setCurrentGroup', payload)
    },
    fetchUserProfile({ commit, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          commit("setUserProfile", res.data());
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchCurrentGroup(context) {
      context.commit('fetchCurrentGroup')
    }
  }
})
