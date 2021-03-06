import firebase from "firebase";
import "firebase/firestore";

// firebase init goes here
const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
firebase.initializeApp(config);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);
firebase.firestore().enablePersistence();
// firebase collections
const usersCollection = db.collection("users");


export {
  db,
  auth,
  currentUser,
  usersCollection,
};
