import * as types from "./actionTypes"

export function login() {
  return (dispatch, getState, firebase) => {
    dispatch(requestLogin())
    return firebase.auth
      .signInWithPopup(firebase.provider)
      .then(result => dispatch(receiveLogin(result)))
      .catch(error => dispatch(loginError(error)))
  }
}

export function requestLogin(user) {
  return { type: types.REQUEST_LOGIN }
}

export function receiveLogin(user) {
  return { type: types.RECEIVE_LOGIN, user: user }
}

export function loginError(error){
  return { type: types.LOGIN_ERROR, error: error }
}

export function logout() {
  return (dispatch, getState, firebase) => {
    return firebase.auth
      .signOut()
      .then(result => dispatch(receiveLogout(result)))
  };
}

export function receiveLogout() {
  return { type: types.RECEIVE_LOGOUT }
}
