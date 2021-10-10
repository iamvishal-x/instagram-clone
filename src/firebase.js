// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// v9 compat packages are API compatible with v8 code
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBTyiCoi33c-u3RmWBrjwV59wLXxJ05xqQ",
  authDomain: "instagramclone09.firebaseapp.com",
  projectId: "instagramclone09",
  storageBucket: "instagramclone09.appspot.com",
  messagingSenderId: "442335841452",
  appId: "1:442335841452:web:b25fcf0df7a4e567c6a309",
  measurementId: "G-56ZW1XFMNQ",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
