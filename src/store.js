import Vue from 'vue'
import Vuex from 'vuex'
const fb = require("@/firebaseConfig.js");

Vue.use(Vuex)
function initialState() {
  return {
    groupList: [],
    newsList: [],
    studentList: [],
    studentDataList: [],
    currentGroup: '',
    currentUser: null,
    userProfile: {},
    noStudent: false,
    targetTasmiq: [],
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
    onCreatedNewsList: (state, snapshot) => {
      state.newsList = snapshot;
    },
    onCreatedStudentList: (state, snapshot) => {
      state.studentList = snapshot;
    },
    onCreatedTargetTasmiq: (state, snapshot) => {
      state.targetTasmiq = snapshot;
    },
    onCreatedStudentDataList: (state, doc) => {
      var x = '';
      if (doc.data().mark <= 40) {
        x = 'error'
      } else if (doc.data().mark <= 60) {
        x = 'warning'
      } else if (doc.data().mark <= 80) {
        x = 'info'
      } else if (doc.data().mark > 80) {
        x = 'success'
      }
      state.studentDataList.push({
        status: x,
        mark: doc.data().mark,
        ic: doc.data().ic,
        name: doc.data().name,
        key: doc.id
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
    pickNewCurrentGroup: (context, payload) => {
      fb.db
        .collection("setting")
        .doc("default")
        .update({ defaultGroup: payload })
        .then(function () {
          context.commit('setCurrentGroup', payload);
        }).then(
          () => {
            fb.db
              .collection('group')
              .doc(context.state.currentGroup)
              .get()
              .then(function (snapshot) {
                context.state.noStudent = true;
                context.state.studentDataList = [];
                context.commit("onCreatedNewsList", snapshot.data().timeline)
                context.commit("onCreatedStudentList", snapshot.data().students)
                context.commit("onCreatedTargetTasmiq", snapshot.data().targetTasmiq)
                snapshot.data().students.forEach(id => {
                  if (id != "") {
                    context.state.noStudent = false;
                    fb.db
                      .collection("users")
                      .doc(id)
                      .get()
                      .then(doc => {
                        context.commit("onCreatedStudentDataList", doc)
                      });
                  }
                })
              });
          }
        )
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
    onCreatedData: (context) => {
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
            });
          fb.db
            .collection('group')
            .doc(context.state.currentGroup)
            .get()
            .then(function (snapshot) {

              context.commit("onCreatedNewsList", snapshot.data().timeline)
              context.commit("onCreatedStudentList", snapshot.data().students)
              context.commit("onCreatedTargetTasmiq", snapshot.data().targetTasmiq)
              context.state.noStudent = true;
              snapshot.data().students.forEach(id => {
                if (id != "") {
                  context.state.noStudent = false;
                  fb.db
                    .collection("users")
                    .doc(id)
                    .get()
                    .then(doc => {
                      context.commit("onCreatedStudentDataList", doc)
                    });
                }
              }

              )

            });
        })
        .catch(err => {
          console.log(err);
        }
        );

    },
  }
})
