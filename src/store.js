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
      if (state.currentGroup != '') {
        var x = state.currentGroup;
        state.groupList.push(x);
      }
      for (var i = state.groupList.length - 1; i >= 0; i--) {
        if (state.groupList[i] === payload) {
          state.groupList.splice(i, 1);
          break;
        }
      }
      state.currentGroup = payload;
    },
    onCreatedGroupList: (state, snapshot) => {
      snapshot.docs.forEach(doc => {
        if (state.currentGroup != doc.id) { state.groupList.push(doc.id) }
      })

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
      fb.db
        .collection("setting")
        .doc("default")
        .update({ defaultGroup: payload })
        .then(function () {
          context.commit('setCurrentGroup', payload);
        })
        .catch(err => {
          console.log(err);
        });
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
    fetchCurrentGroup: (context) => {
      fb.db.collection('setting')
        .doc('default')
        .get()
        .then(function (doc) {
          context.commit("setCurrentGroup", doc.data().defaultGroup)
        }).then(function () {
          fb.db.collection('group')
            .get()
            .then((snapshot) => {
              context.commit("onCreatedGroupList", snapshot)
            })
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
})
