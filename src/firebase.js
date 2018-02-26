import firebase from "firebase";
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyAiu7BXtsU5Yh7nHj_QucFBhWFGm1vmvqw",
  authDomain: "my-react-redux-firebase.firebaseapp.com",
  databaseURL: "https://my-react-redux-firebase.firebaseio.com",
  projectId: "my-react-redux-firebase",
  storageBucket: "my-react-redux-firebase.appspot.com"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const database = firebase.database();
export const firestore = firebase.firestore();
export default firebase;
