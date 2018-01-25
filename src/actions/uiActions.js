import * as types from './actionTypes';

export function toggleNavbar(isNavbarVisible) {
  return { type: types.TOGGLE_NAVBAR, isNavbarVisible };
}

export function triggerLogin() {  
  return (dispatch, getState, firebase) => {
    return firebase.auth
      .signInWithPopup(firebase.provider)
      .then((result) => dispatch(receiveLogin(result)));
  };
}

export function receiveLogin(result) {
  return { type: types.RECEIVE_LOGIN, user: result.user };
}

export function triggerLogout() {
  return { type: types.TRIGGER_LOGOUT };
}

export function receiveLogout() {
  return { type: types.RECEIVE_LOGOUT };
}