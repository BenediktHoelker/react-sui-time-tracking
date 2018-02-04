import * as types from "./actionTypes"

export function handleVMenuItemClick(id) {
  return { type: types.SET_ACTIVE_MENU_ITEM_V, id }
}

export function handleHMenuItemClick(name) {
  return { type: types.SET_ACTIVE_MENU_ITEM_H, name }
}

export function toggleNavbar() {
  return { type: types.TOGGLE_NAVBAR }
}

export function triggerLogin() {
  return (dispatch, getState, firebase) => {
    return firebase.auth
      .signInWithRedirect(firebase.provider)
      .then(result => dispatch(receiveLogin(result)))
  }
}

export function receiveLogin(user) {
  return { type: types.RECEIVE_LOGIN, user: user }
}

export function triggerLogout() {
  return (dispatch, getState, firebase) => {
    return firebase.auth
      .signOut()
      .then(result => dispatch(receiveLogout(result)))
  };
}

export function receiveLogout() {
  return { type: types.RECEIVE_LOGOUT }
}

export function getUser() {
  return (dispatch, getState, firebase) => {
    return firebase.auth.getRedirectResult().then(result => {
      if (result.user) {
        return Promise.resolve(result.user)
      } else {
        return Promise.reject()
      }
    });
  };
}
