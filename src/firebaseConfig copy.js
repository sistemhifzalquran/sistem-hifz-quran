import firebase from "firebase";
import "firebase/firestore";

// firebase init goes here
const config = {
  apiKey: "AIzaSyBrLl_JlTHjKvCOhFJOTpOZzrtJdkPD22Q",
  authDomain: "sistem-hifz-quran.firebaseapp.com",
  databaseURL: "https://sistem-hifz-quran.firebaseio.com",
  projectId: "sistem-hifz-quran",
  storageBucket: "sistem-hifz-quran.appspot.com",
  messagingSenderId: "258732248861"
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);

// firebase collections
const usersCollection = db.collection("users");


export {
  db,
  auth,
  currentUser,
  usersCollection,
};
