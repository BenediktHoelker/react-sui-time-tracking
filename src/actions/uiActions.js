import * as types from './actionTypes';

export function toggleNavbar(isNavbarVisible) {
  return {type: types.TOGGLE_NAVBAR, isNavbarVisible};
}

export function triggerLogin() {
  return (dispatch, getState, firebase) => {
    return firebase
      .auth
      .signInWithRedirect(firebase.provider)
      .then((result) => dispatch(receiveLogin(result)));
  };
}

export function receiveLogin(result) {
  return {type: types.RECEIVE_LOGIN, user: result.user};
}

export function triggerLogout() {
  return (dispatch, getState, firebase) => {
    return firebase
      .auth
      .signOut()
      .then((result) => dispatch(receiveLogout(result)));
  };
}

export function receiveLogout() {
  return {type: types.RECEIVE_LOGOUT};
}

export function getUser() {
  return (dispatch, getState, firebase) => {
    return firebase
      .auth
      .getRedirectResult()
      .then((result) => {
        if(result.user){
          dispatch(receiveLogin(result))
          return Promise.resolve(result)
        } else {
          return Promise.reject()
        }
      })
  }
}

export function requestProjects(projects) {
  return {type: types.REQUEST_PROJECTS};
}

export function loadProjects() {
  return (dispatch, getState, firebase) => {

    dispatch(requestProjects());

    const samplesRef = firebase
      .database
      .ref('samples')

    samplesRef.on('value', (snapshot) => {
      let samples = snapshot.val()
      let companies = samples.map(sample => ({key: sample.company, value: sample.company, text: sample.company}))
      dispatch(receiveProjects(companies))
    })
  }
}

export function receiveProjects(projects) {
  return {type: types.RECEIVE_PROJECTS, projects: projects};
}