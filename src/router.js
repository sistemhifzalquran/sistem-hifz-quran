import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import Admin from './components/Admin.vue'
import { usersCollection } from './firebaseConfig';

Vue.use(Router)

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (to.name == 'Login' && currentUser) {
    usersCollection
      .doc(currentUser.uid)
      .get()
      .then(function (doc) {
        if (doc.data().admin == true) {
          console.log("go to admin");
          return router.push({ name: "Admin" });
        } else {
          console.log("go to gogogogo");
          return router.push({ name: "Dashboard" });
        }
      })
  } else if (to.name == 'Admin' && currentUser) {
    usersCollection
      .doc(currentUser.uid)
      .get()
      .then(function (doc) {
        if (doc.data().admin == true) {
          return next()
        } else {
          return router.push({ name: "Dashboard" });
        }
      })
  } else if (to.name == 'Dashboard' && currentUser) {
    usersCollection
      .doc(currentUser.uid)
      .get()
      .then(function (doc) {
        if (doc.data().admin == true) {
          return router.push({ name: "Admin" });
        } else {
          return next()
        }
      })
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;