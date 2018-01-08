import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase.js';

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        user.getIdToken().then(function (accessToken) {
            ReactDOM.render(<App user={user} />, document.getElementById('root'));
            registerServiceWorker();
        });
    }
}, function (error) {
    console.log(error);
});
/* 
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker(); */
