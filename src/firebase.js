import firebase from 'firebase'
const config = {
    apiKey: 'AIzaSyAiu7BXtsU5Yh7nHj_QucFBhWFGm1vmvqw',
    authDomain: 'my-react-redux-firebase.firebaseapp.com',
    databaseURL: 'https://my-react-redux-firebase.firebaseio.com',
    storageBucket: 'my-react-redux-firebase.appspot.com'
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;

