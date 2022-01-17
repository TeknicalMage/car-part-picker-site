import firebase from "firebase/app";
import "firebase/auth"
import getStorage from "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCyFrembMWoDROxlif6g-8XfXNicHf_1U0",
  authDomain: "carpartpicker-39d1c.firebaseapp.com",
  databaseURL: "https://carpartpicker-39d1c-default-rtdb.firebaseio.com",
  projectId: "carpartpicker-39d1c",
  storageBucket: "carpartpicker-39d1c.appspot.com",
  messagingSenderId: "398437917333",
  appId: "1:398437917333:web:c06e3cfe2aa4bc6582319c",
  measurementId: "G-5635Y6JQ7W"
  })

export const auth = app.auth()
const storage = firebase.storage()
var storageRef = storage.ref();
export default {app, storage, storageRef};